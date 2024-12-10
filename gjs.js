#!/usr/bin/env node
import runFile from "./gjs/runFile.js"
import runRepl from "./gjs/runRepl.js"

function main() {
    const args = process.argv.slice(2);

    let debug = { status: false, processing: false, errors: false, whitespace: false };
    let fileName = null;
    let showVersion = false;
    let showHelp = false;

    // Parse arguments
    args.forEach((arg) => {
        if (arg === '--gjs-debug') {
            debug = { status: true, processing: true, errors: true, whitespace: false };
        } else if (arg === '--gjs-debug-ws') {
            debug = { status: true, processing: true, errors: true, whitespace: true };
        } else if (arg === '--version') {
            showVersion = true;
        } else if (arg === '--help') {
            showHelp = true;
        } else {
            fileName = arg;
        }
    });

    // Show version if '--version' flag is provided
    if (showVersion) {
        console.log("GujjuScript version 1.0.6");
        return;
    }

    // Show help if '--help' flag is provided
    if (showHelp) {
        console.log(`
Usage: gujju [options] [file]

Options:
  --debug-gjs      Enable debugging mode for gujjuScript
  --debug-gjs-ws   Enable debugging mode for gujjuScript with whitespace count
  --version        Show version information
  --help           Show this help message

If no file is provided, the REPL will start.
        `);
        return;
    }

    // Enable debugging if '-debug' flag is present
    if (debug.status) {
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
