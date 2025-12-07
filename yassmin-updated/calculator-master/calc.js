

// // Helper for element creation
// function el(tag, options = {}) {
//     const { text, attrs = {}, style = {} } = options;
//     const element = document.createElement(tag);

//     if (text) element.textContent = text;

//     for (const key in attrs) {
//         element.setAttribute(key, attrs[key]);
//     }

//     for (const key in style) {
//         element.style[key] = style[key];
//     }

//     return element;
// }

// /* ------------------ UI CREATION ------------------ */

// const root = el("div", {
//     style: {
//         width: "350px",
//         margin: "40px auto",
//         padding: "20px",
//         background: "#1e1e1e",
//         borderRadius: "20px",
//         boxShadow: "0 0 25px rgba(0,0,0,0.5)",
//         color: "white",
//         fontFamily: "Arial",
//         userSelect: "none"
//     }
// });

// document.body.style.background = "#121212";
// document.body.appendChild(root);

// // Screen container
// const screen = el("div", {
//     style: {
//         background: "#000",
//         padding: "20px",
//         borderRadius: "15px",
//         marginBottom: "20px",
//         textAlign: "right",
//         minHeight: "80px",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center"
//     }
// });

// const expr = el("div", {
//     style: {
//         color: "#777",
//         fontSize: "16px",
//         marginBottom: "5px"
//     }
// });

// const display = el("div", {
//     text: "0",
//     style: {
//         fontSize: "36px",
//         fontWeight: "bold",
//         color: "white"
//     }
// });

// screen.appendChild(expr);
// screen.appendChild(display);
// root.appendChild(screen);

// // Buttons grid
// const pad = el("div", {
//     style: {
//         display: "grid",
//         gridTemplateColumns: "repeat(4, 1fr)",
//         gap: "10px"
//     }
// });

// root.appendChild(pad);

// // Button definitions
// const buttons = [
//     { label: "C", action: "clear" },
//     { label: "←", action: "back" },
//     { label: "%", action: "percent" },
//     { label: "÷", action: "/" },
//     { label: "7" }, { label: "8" }, { label: "9" }, { label: "×", action: "*" },
//     { label: "4" }, { label: "5" }, { label: "6" }, { label: "-", action: "-" },
//     { label: "1" }, { label: "2" }, { label: "3" }, { label: "+", action: "+" },
//     { label: "0" }, { label: "." }, { label: "=", action: "equals" }
// ];

// // Generate buttons
// buttons.forEach(btn => {
//     const button = el("button", {
//         text: btn.label,
//         attrs: { "data-action": btn.action || btn.label },
//         style: {
//             padding: "20px",
//             fontSize: "20px",
//             border: "none",
//             borderRadius: "10px",
//             background: btn.action === "equals" ? "#f57c00" : "#333",
//             color: "white",
//             cursor: "pointer",
//             transition: "0.2s",
//         }
//     });

//     button.onmouseenter = () => button.style.background = "#555";
//     button.onmouseleave = () => button.style.background = btn.action === "equals" ? "#f57c00" : "#333";

//     pad.appendChild(button);
// });

// /* ------------------ CALCULATOR LOGIC ------------------ */

// let current = "0";
// let previous = null;
// let operator = null;
// let justEvaluated = false;

// function updateDisplay() {
//     display.textContent = current;
//     expr.textContent = previous && operator ? `${previous} ${operator}` : "";
// }

// function inputDigit(d) {
//     if (justEvaluated) {
//         current = d;
//         justEvaluated = false;
//     } else {
//         if (current === "0" && d !== ".") current = d;
//         else current += d;
//     }
// }

// function clearAll() {
//     current = "0";
//     previous = null;
//     operator = null;
// }

// function backspace() {
//     if (justEvaluated) return;
//     current = current.length > 1 ? current.slice(0, -1) : "0";
// }

// function percent() {
//     current = String(parseFloat(current) / 100);
// }

// function setOperator(op) {
//     if (previous && operator) compute();
//     previous = current;
//     operator = op;
//     current = "0";
// }

// function compute() {
//     if (!previous || !operator) return;

//     const a = parseFloat(previous);
//     const b = parseFloat(current);
//     let result;

//     switch (operator) {
//         case "+": result = a + b; break;
//         case "-": result = a - b; break;
//         case "*": result = a * b; break;
//         case "/": result = b === 0 ? "Error" : a / b; break;
//     }

//     current = String(result);
//     previous = null;
//     operator = null;
//     justEvaluated = true;
// }

// /* ------------------ EVENT HANDLING ------------------ */

// pad.addEventListener("click", (e) => {
//     const btn = e.target.closest("button");
//     if (!btn) return;

//     const action = btn.dataset.action;

//     if (!isNaN(action)) inputDigit(action);
//     else if (action === ".") inputDigit(".");
//     else if (action === "clear") clearAll();
//     else if (action === "back") backspace();
//     else if (action === "percent") percent();
//     else if (action === "equals") compute();
//     else setOperator(action);

//     updateDisplay();
// });

// updateDisplay();



const calc = document.createElement("div");
calc.style.width = "260px";
calc.style.margin = "40px auto";
calc.style.padding = "15px";
calc.style.background = "white";
calc.style.borderRadius = "10px";
calc.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
calc.style.fontFamily = "Arial";
document.body.style.background = "#eee";
document.body.appendChild(calc);

const screen = document.createElement("div");
screen.style.height = "60px";
screen.style.background = "#f8f8f8";
screen.style.marginBottom = "10px";
screen.style.borderRadius = "8px";
screen.style.fontSize = "28px";
screen.style.display = "flex";
screen.style.alignItems = "center";
screen.style.justifyContent = "flex-end";
screen.style.padding = "10px";
screen.textContent = "0";
calc.appendChild(screen);

const panel = document.createElement("div");
panel.style.display = "grid";
panel.style.gridTemplateColumns = "repeat(4, 1fr)";
panel.style.gap = "10px";
calc.appendChild(panel);

const btns = [
  "7","8","9","/",
  "4","5","6","*",
  "1","2","3","-",
  "0",".","=","+",
  "C"
];

btns.forEach(t => {
  const b = document.createElement("button");
  b.textContent = t;
  b.style.padding = "15px";
  b.style.fontSize = "18px";
  b.style.border = "none";
  b.style.borderRadius = "8px";
  b.style.cursor = "pointer";
  b.style.background = (t === "=") ? "#0EA5E9" : "#f0f0f0";
  b.style.color = (t === "=") ? "white" : "black";

  panel.appendChild(b);

  b.addEventListener("click", () => {
    
    if (t === "C") {
      screen.textContent = "0";
      return;
    }

    if (t === "=") {
      try {
        screen.textContent = eval(screen.textContent);
      } catch {
        screen.textContent = "Error";
      }
      return;
    }

    if (screen.textContent === "0") {
      screen.textContent = t;
    } else {
      screen.textContent += t;
    }
  });
});

