const processFunction = (path, node, t) => {
  // Check if the function contains a JSXElement or JSXFragment return statement
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

  // Check if the function has already been transformed to a class
  let containSkipComment = false;
  const comments = path.node.innerComments;
  if (comments && comments.length > 0) {
    comments.forEach((comment) => {
      if (comment.value.includes("Transformed from function to class")) {
        containSkipComment = true;
      }
    });
  }

  if (containsJSX && !containSkipComment) {
    path.addComment("inner", " Transformed from function to class ", false);

    // Extract the body statements from the function
    const bodyStatements = node.body.body;

    // Separate the constructor statements and the render return statement
    const constructorStatements = [];
    let renderReturnStatement;

    bodyStatements.forEach((statement) => {
      if (t.isReturnStatement(statement)) {
        renderReturnStatement = statement;
      } else {
        constructorStatements.push(statement);
      }
    });

    // Collect all variable identifiers from the constructor statements
    const declaredIdentifiers = new Set();
    const assignmentStatements = [];

    constructorStatements.forEach((statement) => {
      if (t.isVariableDeclaration(statement)) {
        statement.declarations.forEach((declaration) => {
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
          }
        });
      } else if (t.isFunctionDeclaration(statement)) {
        declaredIdentifiers.add(statement.id.name);
        assignmentStatements.push(
          t.expressionStatement(
            t.assignmentExpression(
              "=",
              t.memberExpression(t.thisExpression(), statement.id),
              statement.id
            )
          )
        );
      }
    });

    // Create the class constructor method
    const constructorMethod = t.classMethod(
      "constructor",
      t.identifier("constructor"),
      [],
      t.blockStatement([
        t.expressionStatement(t.callExpression(t.super(), [])),
        ...constructorStatements,
        ...assignmentStatements,
      ])
    );

    // Create the html method (formerly render method)
    const renderMethod = t.classMethod(
      "method",
      t.identifier("html"),
      [], // Empty parameter list for html method
      t.blockStatement([renderReturnStatement]) // The return statement from the original function
    );

    // Replace identifiers in renderReturnStatement with `this.identifier`
    if (renderReturnStatement) {
      const replaceIdentifiers = {
        Identifier(p) {
          const hasId = assignmentStatements.find(
            (assignment) =>
              assignment.expression.left.property.name === p.node.name
          );
          if (p.parent.type === "JSXExpressionContainer" && hasId) {
            p.replaceWith(
              t.memberExpression(t.thisExpression(), t.identifier(p.node.name))
            );
          }
        },
      };

      // Traverse only within the scope of the renderReturnStatement node
      path.traverse(replaceIdentifiers, renderMethod);
    }

    // Create the class declaration
    const classBody = [constructorMethod, renderMethod];
    const classDecl = t.classDeclaration(
      node.id ? t.identifier(node.id.name) : null,
      t.identifier("Reblend"), // Extend Reblend directly
      t.classBody(classBody),
      []
    );

    // Convert the class declaration to a class expression
    const classExpr = t.classExpression(
      node.id ? t.identifier(node.id.name) : null,
      t.identifier("Reblend"), // Extend Reblend directly
      t.classBody(classBody),
      []
    );

    // Remove the original function binding from the scope
    path.scope.removeBinding(node.id?.name);

    // Replace the arrow function or function declaration with the class
    if (t.isArrowFunctionExpression(path.node)) {
      path.replaceWith(
        t.arrowFunctionExpression(
          [],
          t.blockStatement([t.returnStatement(classExpr)])
        )
      );
    } else {
      path.replaceWith(classDecl);
    }
    //path.skip();
  }
};

module.exports = function ({ types: t }) {
  return {
    visitor: {
      Program(path) {
        // Ensure that Reblend import statement is present
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

      FunctionDeclaration(path) {
        const { node } = path;
        processFunction(path, node, t);
      },

      ArrowFunctionExpression(path) {
        const { node } = path;
        processFunction(path, node, t);
      },
    },
  };
};
