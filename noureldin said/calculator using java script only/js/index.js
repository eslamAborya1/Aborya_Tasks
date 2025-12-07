const style = document.createElement("style");
style.textContent = `
  * {
    box-sizing: border-box;
    font-family: 'Segoe UI', sans-serif;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea, #764ba2);
  }

  .calculator {
    width: 240px;
    padding: 20px;
    border-radius: 16px;
    background: #ffffffcc;
    backdrop-filter: blur(6px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }

  .display {
    width: 100%;
    height: 55px;
    font-size: 26px;
    border: none;
    padding: 10px;
    text-align: right;
    border-radius: 10px;
    background: #f4f4f4;
    box-shadow: inset 0 0 5px rgba(0,0,0,0.1);
    margin-bottom: 15px;
  }

  .buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }

  .buttons button {
    height: 50px;
    font-size: 20px;
    border: none;
    border-radius: 10px;
    background: #e0e0e0;
    cursor: pointer;
    transition: 0.2s;
  }

  .buttons button:hover {
    background: #d5d5d5;
  }

  .buttons button:active {
    transform: scale(0.95);
  }

  /* Style for special buttons */
  .buttons button[data-op] {
    background: #f7c948;
  }

  .buttons button[data-op]:hover {
    background: #facc53;
  }

  .buttons button[data-clear] {
    background: #ff6b6b;
    color: #fff;
  }

  .buttons button[data-clear]:hover {
    background: #ff5252;
  }

  .buttons button[data-equal] {
    background: #4caf50;
    color: white;
  }

  .buttons button[data-equal]:hover {
    background: #46a149;
  }
`;
document.head.appendChild(style);


// -----------------------
// Calculator Structure
// -----------------------

const calc = document.createElement("div");
calc.className = "calculator";

const display = document.createElement("input");
display.className = "display";
display.readOnly = true;
display.value = "0";
calc.appendChild(display);

const btns = document.createElement("div");
btns.className = "buttons";
calc.appendChild(btns);

document.body.appendChild(calc);


// -----------------------
// Buttons
// -----------------------

const buttons = [
  "7","8","9","/",
  "4","5","6","*",
  "1","2","3","-",
  "0","C","=","+"
];

buttons.forEach(text => {
  const b = document.createElement("button");
  b.textContent = text;

  if ("+-*/".includes(text)) b.dataset.op = true;
  if (text === "C") b.dataset.clear = true;
  if (text === "=") b.dataset.equal = true;

  btns.appendChild(b);
});


// -----------------------
// Logic (same as yours)
// -----------------------

let current = "";

btns.addEventListener("click", (e) => {
  if (!e.target.matches("button")) return;

  const value = e.target.textContent;

  if (value === "C") {
    current = "";
    display.value = "0";
    return;
  }

  if (value === "=") {
    try {
      current = eval(current).toString();
      display.value = current;
    } catch {
      display.value = "Error";
      current = "";
    }
    return;
  }

  current += value;
  display.value = current;
});
