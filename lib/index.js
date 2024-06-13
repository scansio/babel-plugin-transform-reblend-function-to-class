"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addAssignmentStatements = (t, declarations, declaredIdentifiers, assignmentStatements) => {
    declarations.forEach((declaration) => {
        if (t.isIdentifier(declaration.id)) {
            declaredIdentifiers.add(declaration.id.name);
            assignmentStatements.push(t.expressionStatement(t.assignmentExpression("=", t.memberExpression(t.thisExpression(), declaration.id), declaration.id)));
        }
        else if (t.isArrayPattern(declaration.id)) {
            // Extract the variables declared in the ArrayPattern
            declaration.id.elements.forEach((element) => {
                if (t.isIdentifier(element)) {
                    declaredIdentifiers.add(element.name);
                    assignmentStatements.push(t.expressionStatement(t.assignmentExpression("=", t.memberExpression(t.thisExpression(), element), element)));
                }
            });
        }
        else if (t.isObjectPattern(declaration.id)) {
            // Extract the variables declared in the ObjectPattern
            declaration.id.properties.forEach((property) => {
                if (t.isObjectProperty(property) && t.isIdentifier(property.value)) {
                    declaredIdentifiers.add(property.value.name);
                    assignmentStatements.push(t.expressionStatement(t.assignmentExpression("=", t.memberExpression(t.thisExpression(), property.value), property.value)));
                }
            });
        }
    });
};
const processFunction = (path, node, t) => {
    var _a, _b;
    let containsJSX = false;
    path.traverse({
        ReturnStatement(returnPath) {
            if (returnPath.node.argument &&
                (returnPath.node.argument.type === "JSXElement" ||
                    returnPath.node.argument.type === "JSXFragment")) {
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
        const bodyStatements = node.body.body;
        const constructorStatements = [];
        let renderReturnStatement;
        bodyStatements.forEach((statement) => {
            if (t.isReturnStatement(statement)) {
                renderReturnStatement = statement;
            }
            else {
                constructorStatements.push(statement);
            }
        });
        const declaredIdentifiers = new Set();
        const assignmentStatements = [];
        constructorStatements.forEach((statement) => {
            var _a;
            if (t.isVariableDeclaration(statement)) {
                addAssignmentStatements(t, statement.declarations, declaredIdentifiers, assignmentStatements);
            }
            else if (t.isFunctionDeclaration(statement)) {
                declaredIdentifiers.add(`${(_a = statement.id) === null || _a === void 0 ? void 0 : _a.name}`);
                assignmentStatements.push(t.expressionStatement(t.assignmentExpression("=", t.memberExpression(t.thisExpression(), statement.id), statement.id)));
            }
        });
        const constructorMethod = t.classMethod("method", t.identifier("init"), [], t.blockStatement([
            t.expressionStatement(t.callExpression(t.super(), [])),
            ...constructorStatements,
            ...assignmentStatements,
        ]));
        const renderMethod = t.classMethod("method", t.identifier("html"), [], t.blockStatement([renderReturnStatement]));
        const argIdentifiers = node.params.length < 1
            ? []
            : t.isObjectPattern(node.params[0])
                ? node.params[0].properties
                : [node.params[0]];
        const replaceIdentifiers = {
            Identifier(p) {
                var _a;
                const hasThisId = assignmentStatements.find((assignment) => {
                    const exp = assignment.expression;
                    return (t.isMemberExpression(exp.left) &&
                        t.isIdentifier(exp.left.property) &&
                        exp.left.property.name === p.node.name);
                });
                const hasPropId = argIdentifiers.find((ident) => t.isObjectProperty(ident)
                    ? t.isIdentifier(ident.value) && ident.value.name === p.node.name
                    : t.isIdentifier(ident) && ident.name === p.node.name);
                if (!t.isThisExpression(p.parent.object) &&
                    !t.isThisExpression((_a = p.parent.object) === null || _a === void 0 ? void 0 : _a.object)) {
                    if (hasThisId) {
                        p.replaceWith(t.memberExpression(t.thisExpression(), t.identifier(p.node.name)));
                    }
                    else if (hasPropId) {
                        if (t.isObjectProperty(hasPropId)) {
                            p.replaceWith(t.memberExpression(t.memberExpression(t.thisExpression(), t.identifier("props")), t.identifier(p.node.name)));
                        }
                        else {
                            p.replaceWith(t.memberExpression(t.thisExpression(), t.identifier(p.node.name)));
                        }
                    }
                }
            },
        };
        path.scope.traverse(renderReturnStatement, replaceIdentifiers);
        const classBody = [constructorMethod, renderMethod];
        const classDecl = t.classDeclaration(
        //@ts-ignore
        node.id ? t.identifier(node.id.name) : null, t.identifier("Reblend"), t.classBody(classBody), []);
        const classExpr = t.classExpression(
        //@ts-ignore
        node.id ? t.identifier(node.id.name) : null, t.identifier("Reblend"), t.classBody(classBody), []);
        //@ts-ignore
        ((_a = node.id) === null || _a === void 0 ? void 0 : _a.name) && path.scope.removeBinding((_b = node.id) === null || _b === void 0 ? void 0 : _b.name);
        //@ts-ignore
        if (t.isExpression(path)) {
            const fne = t.arrowFunctionExpression([], t.blockStatement([t.returnStatement(classExpr)]));
            t.addComment(fne, "inner", " Transformed from function to class ", false);
            path.replaceWith(t.callExpression(fne, []));
        }
        else {
            path.replaceWith(classDecl);
        }
    }
};
function default_1({ types: t, }) {
    return {
        visitor: {
            Function(path) {
                const { node } = path;
                processFunction(path, node, t);
            },
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map