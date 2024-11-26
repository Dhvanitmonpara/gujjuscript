#!/usr/bin/env node
const fs = require('fs');
const readline = require('readline');

function lexer(input, debug = false) {
    let tokens = [];
    let cursor = 0;

    while (cursor < input.length) {
        let char = input[cursor];

        // Debug: Log current state
        if (debug) {
            console.log(`Processing char '${char}' at position ${cursor}`);
        }

        // Skip whitespace
        if (/\s/.test(char)) {
            cursor++;
            continue;
        }

        // Handle words (identifiers and keywords)
        if (/[a-zA-Z]/.test(char)) {
            let word = "";

            while (/[a-zA-Z0-9]/.test(char) && cursor < input.length) {
                word += char;
                cursor++;
                char = input[cursor];
            }

            if (word === "jo" || word === "bol") {
                tokens.push({ type: 'keyword', value: word });
            } else {
                tokens.push({ type: 'identifier', value: word });
            }

            continue;
        }

        // Handle numbers
        if (/[0-9]/.test(char)) {
            let num = "";

            while (/[0-9]/.test(char) && cursor < input.length) {
                num += char;
                cursor++;
                char = input[cursor];
            }

            tokens.push({ type: 'number', value: parseInt(num) });
            continue;
        }

        // Handle operators
        if (/[\+\-\*\/=]/.test(char)) {
            tokens.push({ type: 'operator', value: char });
            cursor++;
            continue;
        }

        // Handle unknown characters (error case)
        if (debug) {
            console.error(`Unknown character '${char}' at position ${cursor}`);
        }
        throw new Error(`Unexpected character '${char}' at position ${cursor}`);
    }

    return tokens;
}


function parser(tokens) {
    const ast = {
        type: 'Program',
        body: []
    }

    while (tokens.length > 0) {
        let token = tokens.shift();

        if (token.type === 'keyword' && token.value === 'jo') {
            let declaration = {
                type: 'Declaration',
                name: tokens.shift().value,
                value: null
            }

            // check the statement
            if (tokens[0].type === 'operator' && tokens[0].value === '=') {
                tokens.shift(); // consumes '='
                let expression = '';
                while (tokens.length > 0 && tokens[0].type !== 'keyword') {
                    expression += tokens.shift().value;
                }
                declaration.value = expression.trim();
            }

            ast.body.push(declaration);
        }

        if (token.type === 'keyword' && token.value === 'bol') {
            ast.body.push({
                type: 'Print',
                expression: tokens.shift().value
            });
        }
    }

    return ast;
}

function codeGen(node) {
    switch (node.type) {
        case 'Program':
            return node.body.map(codeGen).join('\n');
        case 'Declaration':
            return `const ${node.name} = ${node.value};`;
        case 'Print':
            return `console.log(${node.expression});`;
        default:
            throw new Error(`Unexpected node type: ${node.type}`);
    }
}

function compiler(input, debug = false) {
    const tokens = lexer(input, debug);
    const ast = parser(tokens);
    return codeGen(ast);
}

function runner(input) {
    try {
        eval(input); // Executes the generated JavaScript code
    } catch (err) {
        console.error("Error during execution:", err.message);
    }
}

// Function to run a file
function runFile(fileName, debug = false) {
    try {
        const code = fs.readFileSync(fileName, 'utf8'); // Read the file content
        const compiledCode = compiler(code, debug); // Compile the content
        runner(compiledCode); // Execute the compiled code
    } catch (err) {
        console.error(`Error reading file "${fileName}":`, err.message);
    }
}

function runRepl(debug = false) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'myLang> ',
    });

    console.log("Welcome to gujjuScript REPL (beta). Type your commands below:");
    rl.prompt();

    rl.on('line', (line) => {
        if (line.trim().toLowerCase() === 'exit') {
            console.log("Goodbye!");
            rl.close();
            return;
        }

        try {
            const tokens = lexer(line, debug); // Tokenize with debugging
            if (debug) {
                console.log("Tokens:", tokens);
            }
            const compiled = compiler(line); // Compile the input
            runner(compiled); // Execute the compiled code
        } catch (err) {
            console.error("Error:", err.message);
        }

        rl.prompt();
    }).on('close', () => {
        console.log('Exiting gujjuScript REPL.');
        process.exit(0);
    });
}


function main() {
    const args = process.argv.slice(2);

    let debug = false;
    let fileName = null;

    // Parse arguments
    args.forEach((arg) => {
        if (arg === '-debug') {
            debug = true;
        } else {
            fileName = arg;
        }
    });

    // Enable debugging if '-debug' flag is present
    if (debug) {
        console.log("Debugging mode activated.");
    }

    // Run a file if a filename is provided
    if (fileName) {
        runFile(fileName, debug); // Pass debug flag to runFile
    } else {
        runRepl(debug); // Pass debug flag to runRepl
    }
}


main();
