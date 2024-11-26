import compiler from "./compiler.js";
import fs from 'fs';
import runner from "./runner.js";

function runFile(fileName, debug = {status: false}) {
    try {
        const code = fs.readFileSync(fileName, 'utf8'); // Read the file content
        const compiledCode = compiler(code, debug); // Compile the content
        runner(compiledCode); // Execute the compiled code
    } catch (err) {
        console.error(`Error reading file "${fileName}":`, err.message);
    }
}

export default runFile;