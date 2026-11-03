//delete kore. mane empty string bosay
function DeleteMe() {
    document.getElementById("MyResult").value = "";
}

//input a ek value debar pore pashe arekta notun value add kore
function calculator(NewValue) {
    document.getElementById("MyResult").value += NewValue;
}

function Answer() {
    var a = document.getElementById("MyResult").value; //input value ke a variable er vitor rakhe
    var b = eval(a); //eval ekta built-in function ja mathmetical operation kore
    document.getElementById("MyResult").value = b;
}

// Add event listener to listen for key press events
document.addEventListener("keydown", function(event) {
    // Check if the pressed key corresponds to a number (0-9), an operator, backspace, opening brace, percentage symbol, or equals sign
    if ((event.key >= "0" && event.key <= "9") || // 0-9
        (event.key >= "NumPad0" && event.key <= "NumPad9") || // Numeric keypad 0-9
        event.key === "*" || // Multiplication (*)
        event.key === "+" || // Addition (+)
        event.key === "-" || // Subtraction (-)
        event.key === "." || // Decimal point (.)
        event.key === "/" || // Division (/)
        event.key === "Backspace" || // Backspace
        event.key === "(" || // Opening brace
        event.key === ")" || // Closing brace
        event.key === "%" || // Percentage symbol
        event.key === "=") { // Equals sign
        
        // If it's the backspace key, delete one character
        if (event.key === "Backspace") {
            var currentValue = document.getElementById("MyResult").value;
            document.getElementById("MyResult").value = currentValue.slice(0, -1); // Remove the last character
            return; // Exit the function to prevent adding "undefined" to the input
        }
        
        // If it's the equals sign, calculate the result
        if (event.key === "=") {
            Answer();
            return; // Exit the function to prevent adding the equals sign to the input
        }
        
        // Calculate the value based on the key pressed
        var keyValue = "";
        if (event.key >= "0" && event.key <= "9") {
            // If it's a number key (0-9)
            keyValue = event.key;
        } else if (event.key >= "NumPad0" && event.key <= "NumPad9") {
            // If it's a numeric keypad key (0-9)
            keyValue = event.key.slice(-1); // Extract the last character for NumPad keys
        } else {
            // If it's an operator, decimal point, opening brace, or percentage symbol
            keyValue = event.key;
        }
        
        // Call the calculator function with the corresponding value
        calculator(keyValue);
    }
});
