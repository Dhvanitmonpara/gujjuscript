function lexer(input, debug = { status: false }) {
    let tokens = [];
    let cursor = 0;

    while (cursor < input.length) {
        let char = input[cursor];

        // Skip whitespace
        if (/\s/.test(char)) {

            if (debug.status && debug.whitespace) {
                console.log(`Skipping whitespace at position ${cursor}`);
            }

            cursor++;
            continue;
        }

        if (debug.status && debug.processing) {
            console.log(`Processing char '${char}' at position ${cursor}`);
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
        if (debug.status && debug.errors) {
            console.error(`Unknown character '${char}' at position ${cursor}`);
        }
        throw new Error(`Unexpected character '${char}' at position ${cursor}`);
    }

    return tokens;
}

export default lexer;
