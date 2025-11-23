const style = document.createElement("style");
style.textContent = `    body {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f0f0f0;
        font-family: Arial, sans-serif;
        border-radius: 10px;
    }
    .calculator {
        background-color: #adadadff;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        text-align: center;
    }
    input {
        display: block;
        margin: 10px auto;
        padding: 8px;
        width: 150px;
        font-size: 16px;
        
    }
    button {
        margin: 5px;
        padding: 10px 15px;
        font-size: 16px;
        cursor: pointer;
        border-radius: 3px;
    }
    .result {
        margin: 15px;
        font-size: 18px;
        font-weight: bold;
    }`;
document.head.appendChild(style);

// Create calculator container
const calculator = document.createElement("div");
calculator.className = "calculator";

// Inputs
const num1 = document.createElement("input");
num1.type = "text";
num1.placeholder = "First number";

const num2 = document.createElement("input");
num2.type = "text";
num2.placeholder = "Second number";

// Buttons
const addButton = document.createElement("button");
addButton.textContent = "+";

const subtractButton = document.createElement("button");
subtractButton.textContent = "-";

const multiplyButton = document.createElement("button");
multiplyButton.textContent = "*";

const divideButton = document.createElement("button");
divideButton.textContent = "/";

// Result
const result = document.createElement("div");
result.className = "result";
result.textContent = "Result: ";

// Append elements to calculator
calculator.appendChild(num1);
calculator.appendChild(num2);
calculator.appendChild(addButton);
calculator.appendChild(subtractButton);
calculator.appendChild(multiplyButton);
calculator.appendChild(divideButton);
calculator.appendChild(result);

// Append calculator to body
document.body.appendChild(calculator);

// Button events
addButton.onclick = function () {
const n1 = parseFloat(num1.value) || 0;
const n2 = parseFloat(num2.value) || 0;
result.textContent = "Result: " + (n1 + n2);
};

subtractButton.onclick = function () {
const n1 = parseFloat(num1.value) || 0;
const n2 = parseFloat(num2.value) || 0;
result.textContent = "Result: " + (n1 - n2);
};

multiplyButton.onclick = function () {
const n1 = parseFloat(num1.value) || 0;
const n2 = parseFloat(num2.value) || 0;
result.textContent = "Result: " + n1 * n2;
};

divideButton.onclick = function () {
const n1 = parseFloat(num1.value) || 0;
const n2 = parseFloat(num2.value) || 0;
if (n2 === 0) {
result.textContent = "Error: Cannot divide by zero";
} else {
result.textContent = "Result: " + n1 / n2;
}
};
