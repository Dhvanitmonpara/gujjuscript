# **GujjuScript: A Fun Project Made by Me**

GujjuScript is a simple, fun, and easy-to-understand programming language designed as a personal project to explore compiler design and language creation. This language aims to provide a basic foundation for learning about tokenization, parsing, and code execution.

---

## **Installation**

To set up **GujjuScript** on your machine, follow these steps:

### **1. Install Node.js**

Ensure you have **Node.js** installed on your system. If not, download and install it from the [official website](https://nodejs.org/).

### **2. Install GujjuScript**

You can install **GujjuScript** globally on your machine via **npm**. Run the following command in your terminal:

```bash
npm install -g gujjuscript
```

This will allow you to run **GujjuScript** from anywhere on your system using the `gujju` command.

### **3. Verify Installation**

After installation, verify that **GujjuScript** was successfully installed by running the following command:

```bash
gujju --version
```

This should output the installed version of **GujjuScript**.

---

Now, you're ready to use **GujjuScript** on your machine! You can start running **GujjuScript** files or enter the REPL mode.

To run a **GujjuScript** file:

```bash
gujju index.gjs
```

To start an interactive **GujjuScript** REPL:

```bash
gujju
```

To run a file with debugging enabled:

```bash
gujju index.gjs -debug
```

---

## **Documentation**

### **Keywords**

**GujjuScript** has a set of reserved keywords that have special meanings in the language. These keywords are used for different programming constructs like declarations and print statements.

#### **Reserved Keywords:**

1. `jo`: Used for declaring variables (similar to `let` or `const` in JavaScript).
2. `bol`: Used for printing the value of a variable or expression (similar to `console.log` in JavaScript).

### **Pre-built Functions**

GujjuScript includes a few basic pre-built functions to make programming easier:

- `console.log()`: A function to print output to the console (used as `bol` in **GujjuScript**).
- **GujjuScript** supports basic operations such as addition (`+`), subtraction (`-`), multiplication (`*`), and division (`/`).

**Note:** More pre-built functions and features can be added based on user needs, but currently, these are the available features.

---

## **How It Works**

The **GujjuScript** compiler follows three main stages to process and run the code: **Lexing**, **Parsing**, and **Code Generation**.

### **1. Lexing (Tokenization)**

Lexing is the first step in the compilation process. During this phase, the **GujjuScript** source code is broken down into **tokens**. Tokens represent the smallest units of meaningful code.

For example, the following **GujjuScript** code:

```text
jo x = 10
jo y = 20

jo sum = x + y
bol sum
```

is tokenized into the following array of tokens:

```json
[
  { "type": "keyword", "value": "jo" },
  { "type": "identifier", "value": "x" },
  { "type": "operator", "value": "=" },
  { "type": "number", "value": 10 },
  { "type": "keyword", "value": "jo" },
  { "type": "identifier", "value": "y" },
  { "type": "operator", "value": "=" },
  { "type": "number", "value": 20 },
  { "type": "keyword", "value": "jo" },
  { "type": "identifier", "value": "sum" },
  { "type": "operator", "value": "=" },
  { "type": "identifier", "value": "x" },
  { "type": "operator", "value": "+" },
  { "type": "identifier", "value": "y" },
  { "type": "keyword", "value": "bol" },
  { "type": "identifier", "value": "sum" }
]
```

### **2. Parsing (Creating the AST)**

After lexing, the next step is **parsing**, where the tokens are organized into an **Abstract Syntax Tree (AST)**. The AST represents the program’s structure.

For the above example, the generated AST looks like this:

```json
{
  "type": "Program",
  "body": [
    {
      "type": "Declaration",
      "name": "x",
      "value": 10
    },
    {
      "type": "Declaration",
      "name": "y",
      "value": 20
    },
    {
      "type": "Declaration",
      "name": "sum",
      "value": "x + y"
    },
    {
      "type": "Print",
      "expression": "sum"
    }
  ]
}
```

### **3. Code Generation**

Once the AST is created, it is converted into executable JavaScript code. The generated JavaScript code for the above AST is:

```javascript
const x = 10;
const y = 20;
const sum = x + y;
console.log(sum);
```

This JavaScript code is then executed in the **Node.js** environment, and the result will be:

```
30
```

---

## **Usage**

### **Running a Script**

To run a **GujjuScript** file, use the following command:

```bash
gujju index.gjs
```

This will compile and execute the file `index.gjs`.

### **Debugging**

To enable debugging while running a script, use the `-debug` flag:

```bash
gujju index.gjs -debug
```

This will output additional information such as the tokenized code, AST, and generated JavaScript code, which can be useful for debugging your code.

### **REPL Mode**

To start an interactive **GujjuScript** REPL (Read-Eval-Print-Loop), type:

```bash
gujju
```

This will start the REPL, where you can enter **GujjuScript** code line by line.

To exit the REPL, type:

```bash
exit
```

### **File Execution with Debugging**

To run a file with debugging enabled, use:

```bash
gujju index.gjs -debug
```

This will show the debugging output, which includes the tokenization process, the AST, and the generated JavaScript code before execution.

---

## **Example Code**

Here’s an example of **GujjuScript** code that demonstrates variable declarations and printing:

```text
jo a = 5
jo b = 10
jo sum = a + b
bol sum
```

### **Tokenized Code:**

```json
[
  { "type": "keyword", "value": "jo" },
  { "type": "identifier", "value": "a" },
  { "type": "operator", "value": "=" },
  { "type": "number", "value": 5 },
  { "type": "keyword", "value": "jo" },
  { "type": "identifier", "value": "b" },
  { "type": "operator", "value": "=" },
  { "type": "number", "value": 10 },
  { "type": "keyword", "value": "jo" },
  { "type": "identifier", "value": "sum" },
  { "type": "operator", "value": "=" },
  { "type": "identifier", "value": "a" },
  { "type": "operator", "value": "+" },
  { "type": "identifier", "value": "b" },
  { "type": "keyword", "value": "bol" },
  { "type": "identifier", "value": "sum" }
]
```

### **AST:**

```json
{
  "type": "Program",
  "body": [
    {
      "type": "Declaration",
      "name": "a",
      "value": 5
    },
    {
      "type": "Declaration",
      "name": "b",
      "value": 10
    },
    {
      "type": "Declaration",
      "name": "sum",
      "value": "a + b"
    },
    {
      "type": "Print",
      "expression": "sum"
    }
  ]
}
```

### **Generated JavaScript Code:**

```javascript
const a = 5;
const b = 10;
const sum = a + b;
console.log(sum);
```

### **Output:**

```
15
```

---

## **Conclusion**

**GujjuScript** is a simple, beginner-friendly programming language designed to help users learn about the process of creating a programming language from scratch. Through the lexer, parser, and code generation process, users can explore key concepts such as tokenization, abstract syntax trees (ASTs), and how programming languages are interpreted and executed.

With its easy-to-understand syntax and the possibility of extending functionality, **GujjuScript** is a great learning tool for anyone interested in programming languages or compilers.