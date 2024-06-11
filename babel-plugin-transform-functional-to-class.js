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

        // Check if the function contains a JSX return statement
        let containsJSX = false;

        path.traverse({
          ReturnStatement(returnPath) {
            if (t.isJSXElement(returnPath.node.argument)) {
              containsJSX = true;
            }
          },
        });

        if (containsJSX) {
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

          // Create the class constructor method
          const constructorMethod = t.classMethod(
            "constructor",
            t.identifier("constructor"),
            [],
            t.blockStatement([
              t.expressionStatement(t.callExpression(t.super(), [])),
              ...constructorStatements,
            ])
          );

          // Create the render method
          const renderMethod = t.classMethod(
            "method",
            t.identifier("render"),
            [], // Empty parameter list for render method
            t.blockStatement([renderReturnStatement]) // The return statement from the original function
          );

          // Create the class declaration
          const classDecl = t.classDeclaration(
            t.identifier(node.id.name),
            t.identifier("Reblend"), // Extend Reblend directly
            t.classBody([constructorMethod, renderMethod]),
            []
          );

          // Remove the original function binding from the scope
          path.scope.removeBinding(node.id.name);

          // Replace the function declaration with the class declaration
          path.replaceWith(classDecl);

          // Stop further traversal
          //path.stop();
        }
      },
    },
  };
};
