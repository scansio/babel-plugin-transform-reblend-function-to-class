module.exports = function ({ types: t }) {
  return {
    visitor: {
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
          // Check if the binding already exists in the current scope
          if (path.scope.hasBinding(node.id.name, true)) {
            path.scope.removeBinding(node.id.name);
          }

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
            null, // No superclass
            t.classBody([constructorMethod, renderMethod]),
            []
          );

          // Replace the function declaration with the class declaration
          path.replaceWith(classDecl);

          // Stop further traversal
          path.stop();
        }
      },
    },
  };
};
