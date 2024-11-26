import lexer from './lexer.js';
import codeGen from './codeGen.js';
import parser from './parser..js';

function compiler(input, debug = {status: false}) {
    const tokens = lexer(input, debug);
    const ast = parser(tokens);
    return codeGen(ast);
}

export default compiler;