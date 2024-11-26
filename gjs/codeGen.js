function codeGen(node) {
    switch (node.type) {
        case 'Program':
            // Generate code for the entire program by joining body elements
            return node.body.map(codeGen).join('\n');
        
        case 'Declaration':
            // For variable declarations, return the JS variable assignment
            return `let ${node.name} = ${generateExpression(node.value)};`;

        case 'Print':
            // Handle the print statement, which can include complex expressions
            const expressions = node.expressions.map(expr => generateExpression(expr)).join(' + ');
            return `console.log(${expressions});`;

        default:
            throw new Error(`Unexpected node type: ${node.type}`);
    }
}

// Helper function to generate code for expressions (numbers, strings, variables, and operators)
function generateExpression(expression) {
    if (typeof expression === 'string') {
        // Directly return string literals
        return expression;
    }

    if (expression.type === 'number') {
        // Return numbers as is
        return expression.value;
    }

    if (expression.type === 'string') {
        // Ensure that string values are wrapped in quotes
        return expression.value;
    }

    if (expression.type === 'identifier') {
        // Return the identifier (variable name)
        return expression.value;
    }

    // Handle complex expressions (e.g., sum + greeting)
    if (Array.isArray(expression)) {
        return expression.map(generateExpression).join(' + ');
    }

    throw new Error(`Unknown expression type: ${expression.type}`);
}

export default codeGen;
