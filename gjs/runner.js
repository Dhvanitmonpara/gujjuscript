function runner(input) {
    try {
        eval(input); // Still uses eval for executing the generated JavaScript code
    } catch (err) {
        console.error("Error during execution:", err.message);
    }
}

export default runner