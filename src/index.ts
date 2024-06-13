import * as t from "@babel/types";
import { NodePath } from "@babel/traverse";
import { Visitor } from "@babel/core";

interface ProcessFunction {
  (
    path: NodePath<t.Function>,
    node: t.Function,
    t: typeof import("@babel/types")
  ): void;
}

const addAssignmentStatements = (
  t: typeof import("@babel/types"),
  declarations: t.VariableDeclarator[],
  declaredIdentifiers: Set<string>,
  assignmentStatements: t.ExpressionStatement[]
): void => {
  declarations.forEach((declaration) => {
    if (t.isIdentifier(declaration.id)) {
      declaredIdentifiers.add(declaration.id.name);
      assignmentStatements.push(
        t.expressionStatement(
          t.assignmentExpression(
            "=",
            t.memberExpression(t.thisExpression(), declaration.id),
            declaration.id
          )
        )
      );
    } else if (t.isArrayPattern(declaration.id)) {
      // Extract the variables declared in the ArrayPattern
      declaration.id.elements.forEach((element) => {
        if (t.isIdentifier(element)) {
          declaredIdentifiers.add(element.name);
          assignmentStatements.push(
            t.expressionStatement(
              t.assignmentExpression(
                "=",
                t.memberExpression(t.thisExpression(), element),
                element
              )
            )
          );
        }
      });
    } else if (t.isObjectPattern(declaration.id)) {
      // Extract the variables declared in the ObjectPattern
      declaration.id.properties.forEach((property) => {
        if (t.isObjectProperty(property) && t.isIdentifier(property.value)) {
          declaredIdentifiers.add(property.value.name);
          assignmentStatements.push(
            t.expressionStatement(
              t.assignmentExpression(
                "=",
                t.memberExpression(t.thisExpression(), property.value),
                property.value
              )
            )
          );
        }
      });
    }
  });
};

const processFunction: ProcessFunction = (path, node, t) => {
  let containsJSX = false;

  path.traverse({
    ReturnStatement(returnPath) {
      if (
        returnPath.node.argument &&
        (returnPath.node.argument.type === "JSXElement" ||
          returnPath.node.argument.type === "JSXFragment")
      ) {
        containsJSX = true;
      }
    },
  });

  let containSkipComment = false;
  const comments = path.node.innerComments;
  if (comments && comments.length > 0) {
    comments.forEach((comment) => {
      if (comment.value.includes("Transformed from function to class")) {
        containSkipComment = true;
      }
    });
  }

  if (containsJSX && !containSkipComment && node.type !== "ClassMethod") {
    path.addComment("inner", " Transformed from function to class ", false);

    const bodyStatements = (node as t.FunctionDeclaration).body.body;

    const constructorStatements: t.Statement[] = [];
    let renderReturnStatement: t.ReturnStatement | undefined;

    bodyStatements.forEach((statement) => {
      if (t.isReturnStatement(statement)) {
        renderReturnStatement = statement;
      } else {
        constructorStatements.push(statement);
      }
    });

    const declaredIdentifiers = new Set<string>();
    const assignmentStatements: t.ExpressionStatement[] = [];

    constructorStatements.forEach((statement) => {
      if (t.isVariableDeclaration(statement)) {
        addAssignmentStatements(
          t,
          statement.declarations,
          declaredIdentifiers,
          assignmentStatements
        );
      } else if (t.isFunctionDeclaration(statement)) {
        declaredIdentifiers.add(`${statement.id?.name}`);
        assignmentStatements.push(
          t.expressionStatement(
            t.assignmentExpression(
              "=",
              t.memberExpression(t.thisExpression(), statement.id as any),
              statement.id as any
            )
          )
        );
      }
    });

    const constructorMethod = t.classMethod(
      "method",
      t.identifier("init"),
      [],
      t.blockStatement([
        t.expressionStatement(t.callExpression(t.super(), [])),
        ...constructorStatements,
        ...assignmentStatements,
      ])
    );

    const renderMethod = t.classMethod(
      "method",
      t.identifier("html"),
      [],
      t.blockStatement([renderReturnStatement as any])
    );

    const argIdentifiers =
      node.params.length < 1
        ? []
        : t.isObjectPattern(node.params[0])
        ? (node.params[0] as t.ObjectPattern).properties
        : [node.params[0]];

    const replaceIdentifiers = {
      Identifier(p: NodePath<t.Identifier>) {
        const hasThisId = assignmentStatements.find((assignment) => {
          const exp = assignment.expression as any;
          return (
            t.isMemberExpression(exp.left) &&
            t.isIdentifier(exp.left.property) &&
            exp.left.property.name === p.node.name
          );
        });
        const hasPropId = argIdentifiers.find((ident) =>
          t.isObjectProperty(ident)
            ? t.isIdentifier(ident.value) && ident.value.name === p.node.name
            : t.isIdentifier(ident) && ident.name === p.node.name
        );
        if (
          !t.isThisExpression((p.parent as any).object) &&
          !t.isThisExpression((p.parent as any).object?.object)
        ) {
          if (hasThisId) {
            p.replaceWith(
              t.memberExpression(t.thisExpression(), t.identifier(p.node.name))
            );
          } else if (hasPropId) {
            if (t.isObjectProperty(hasPropId)) {
              p.replaceWith(
                t.memberExpression(
                  t.memberExpression(t.thisExpression(), t.identifier("props")),
                  t.identifier(p.node.name)
                )
              );
            } else {
              p.replaceWith(
                t.memberExpression(
                  t.thisExpression(),
                  t.identifier(p.node.name)
                )
              );
            }
          }
        }
      },
    };

    path.scope.traverse(renderReturnStatement!, replaceIdentifiers);

    const classBody = [constructorMethod, renderMethod];
    const classDecl = t.classDeclaration(
      //@ts-ignore
      node.id ? t.identifier(node.id.name) : null,
      t.identifier("Reblend"),
      t.classBody(classBody),
      []
    );

    const classExpr = t.classExpression(
      //@ts-ignore
      node.id ? t.identifier(node.id.name) : null,
      t.identifier("Reblend"),
      t.classBody(classBody),
      []
    );

    //@ts-ignore
    node.id?.name && path.scope.removeBinding(node.id?.name);

    //@ts-ignore
    if (t.isExpression(path)) {
      const fne = t.arrowFunctionExpression(
        [],
        t.blockStatement([t.returnStatement(classExpr)])
      );
      t.addComment(fne, "inner", " Transformed from function to class ", false);
      path.replaceWith(t.callExpression(fne, []));
    } else {
      path.replaceWith(classDecl);
    }
  }
};

export default function ({
  types: t,
}: {
  types: typeof import("@babel/types");
}): { visitor: Visitor } {
  return {
    visitor: {
      Program(path: NodePath<t.Program>) {
        const reblendImport = t.importDeclaration(
          [t.importDefaultSpecifier(t.identifier("Reblend"))],
          t.stringLiteral("reblendjs")
        );

        let hasReblendImport = false;

        path.traverse({
          ImportDeclaration(importPath) {
            if (importPath.node.source.value === "reblendjs") {
              hasReblendImport = true;
            }
          },
        });

        if (!hasReblendImport) {
          path.node.body.unshift(reblendImport);
        }
      },

      Function(path: NodePath<t.Function>) {
        const { node } = path;
        processFunction(path, node, t);
      },
    },
  };
}
