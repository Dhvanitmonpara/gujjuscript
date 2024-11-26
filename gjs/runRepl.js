import readline from 'readline'

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

export default runRepl