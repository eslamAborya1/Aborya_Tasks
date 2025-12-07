let box = document.createElement("div");
box.style.position = "fixed";
box.style.top = "20px";
box.style.right = "20px";
box.style.padding = "10px";
box.style.width = "200px";
box.style.border = "1px solid #aaa";
box.style.background = "#fff";
box.style.fontFamily = "Arial";
box.style.borderRadius = "8px";
document.body.appendChild(box);

let scr = document.createElement("div");
scr.style.height = "40px";
scr.style.border = "1px solid #ccc";
scr.style.marginBottom = "8px";
scr.style.padding = "5px";
scr.style.textAlign = "right";
scr.style.fontSize = "20px";
scr.style.borderRadius = "5px";
scr.textContent = "0";
box.appendChild(scr);

let current = "";
let storedValue = null;
let lastOp = null;

function applyOperation(a, b, op) {
  a = Number(a);
  b = Number(b);
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b === 0 ? "Err" : a / b;
  }
}

let btns = [
  "7",
  "8",
  "9",
  "/",
  "4",
  "5",
  "6",
  "*",
  "1",
  "2",
  "3",
  "-",
  "0",
  ".",
  "=",
  "+",
  "C",
];

let grid = document.createElement("div");
grid.style.display = "grid";
grid.style.gridTemplateColumns = "repeat(4,1fr)";
grid.style.gap = "5px";
box.appendChild(grid);

btns.forEach((b) => {
  let bt = document.createElement("button");
  bt.textContent = b;

  bt.style.padding = "10px";
  bt.style.background = "#f5f5f5";
  bt.style.border = "1px solid #bbb";
  bt.style.fontSize = "16px";
  bt.style.cursor = "pointer";
  bt.style.borderRadius = "5px";

  if (b === "C") {
    bt.style.background = "#aaa";
  }

  bt.onclick = function () {
    if (b === "C") {
      current = "";
      storedValue = null;
      lastOp = null;
      scr.textContent = "0";
      return;
    }

    if (b === "=") {
      if (storedValue !== null && lastOp && current !== "") {
        storedValue = applyOperation(storedValue, current, lastOp);
        scr.textContent = storedValue;
        current = "";
        lastOp = null;
      }
      return;
    }

    if (["+", "-", "*", "/"].includes(b)) {
      if (current !== "") {
        if (storedValue === null) {
          storedValue = current;
        } else if (lastOp) {
          storedValue = applyOperation(storedValue, current, lastOp);
        }
      }
      lastOp = b;
      current = "";
      scr.textContent = storedValue;
      return;
    }

    if (scr.textContent === "0" && b !== ".") {
      current = b;
    } else {
      current += b;
    }

    scr.textContent = current;
  };

  grid.appendChild(bt);
});
