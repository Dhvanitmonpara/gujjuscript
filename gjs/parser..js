function parser(tokens) {
    const ast = {
        type: 'Program',
        body: []
    };

    while (tokens.length > 0) {
        let token = tokens.shift();

        if (token.type === 'keyword' && token.value === 'jo') {
            let declaration = {
                type: 'Declaration',
                name: tokens.shift().value,
                value: null
            };

            // Check the statement
            if (tokens[0].type === 'operator' && tokens[0].value === '=') {
                tokens.shift(); // Consumes '='
                let expression = '';
                while (tokens.length > 0 && tokens[0].type !== 'keyword') {
                    expression += tokens.shift().value;
                }
                declaration.value = expression.trim();
            }

            ast.body.push(declaration);
        }

        if(token.type === "string") {
            let declaration = {
                type: 'Declaration',
                name: token.value,
                value: null
            };
            ast.body.push(declaration);
        }

        if (token.type === 'keyword' && token.value === 'bol') {
            let printStatement = {
                type: 'Print',
                expressions: []
            };

            // Collect all expressions after the print statement
            while (tokens.length > 0 && tokens[0].type !== 'keyword') {
                let expr = tokens.shift();
                printStatement.expressions.push(expr.value);
            }

            ast.body.push(printStatement);
        }
    }

    return ast;
}

export default parser