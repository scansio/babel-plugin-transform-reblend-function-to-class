module.exports = function ({ types: t }) {
  return {
    visitor: {
      FunctionDeclaration(path) {
        const { node } = path;

        // Assuming the function name is "App"
        if (node.id) {
          // Check if the binding already exists in the current scope
          /* if (path.scope.hasBinding(node.id.name, true)) {
            path.scope.removeBinding(node.id.name);
          } */

          // Create the class constructor method
          const constructorMethod = t.classMethod(
            "constructor",
            t.identifier("constructor"),
            [],
            t.blockStatement([
              t.expressionStatement(t.callExpression(t.super(), [])),
            ])
          );

          // Create the render method
          const renderMethod = t.classMethod(
            "method",
            t.identifier("html"),
            [], // Empty parameter list for render method
            node.body.body.pop().node // The body of the original function
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
