const container = document.createElement("section");
container.className = "d-flex justify-content-center pt-5";
document.body.appendChild(container);

const card = document.createElement("div");
card.className = "card p-4 shadow-lg";
card.style.width = "500px";
container.appendChild(card);

const title1 = document.createElement("h4");
title1.innerText = "Calculator";
title1.className = "text-center mb-4";
card.appendChild(title1);

const title2 = document.createElement("h5");
title2.innerText = "---";
title2.className = "text-center mb-4";
card.appendChild(title2);

const div1 = document.createElement("div");
div1.className = "mb-3 d-flex justify-content-center gap-1 flex-wrap";

const button1 = document.createElement("button");
button1.className = "btn btn-primary mt-2";
button1.innerText = "+";
button1.style.width = "100px";
button1.setAttribute("aria-label", "Addition");
button1.setAttribute("role", "button");

const button2 = document.createElement("button");
button2.className = "btn btn-primary mt-2";
button2.innerText = "-";
button2.style.width = "100px";
button2.setAttribute("aria-label", "Subtraction");
button2.setAttribute("role", "button");

const button3 = document.createElement("button");
button3.className = "btn btn-primary mt-2";
button3.innerText = "*";
button3.style.width = "100px";
button3.setAttribute("aria-label", "Multiplication");
button3.setAttribute("role", "button");

const button4 = document.createElement("button");
button4.className = "btn btn-primary mt-2";
button4.innerText = "/";
button4.style.width = "100px";
button4.setAttribute("aria-label", "Division");
button4.setAttribute("role", "button");

const button5 = document.createElement("button");
button5.className = "btn btn-secondary mt-2";
button5.innerText = "1";
button5.style.width = "100px";
button5.setAttribute("aria-label", "1");
button5.setAttribute("role", "button");

const button6 = document.createElement("button");
button6.className = "btn btn-secondary mt-2";
button6.innerText = "2";
button6.style.width = "100px";
button6.setAttribute("aria-label", "2");
button6.setAttribute("role", "button");

const button7 = document.createElement("button");
button7.className = "btn btn-secondary mt-2";
button7.innerText = "3";
button7.style.width = "100px";
button7.setAttribute("aria-label", "3");
button7.setAttribute("role", "button");

const button8 = document.createElement("button");
button8.className = "btn btn-secondary mt-2";
button8.innerText = "4";
button8.style.width = "100px";
button8.setAttribute("aria-label", "4");
button8.setAttribute("role", "button");

const button9 = document.createElement("button");
button9.className = "btn btn-secondary mt-2";
button9.innerText = "5";
button9.style.width = "100px";
button9.setAttribute("aria-label", "5");
button9.setAttribute("role", "button");

const button10 = document.createElement("button");
button10.className = "btn btn-secondary mt-2";
button10.innerText = "6";
button10.style.width = "100px";
button10.setAttribute("aria-label", "6");
button10.setAttribute("role", "button");

const button11 = document.createElement("button");
button11.className = "btn btn-secondary mt-2";
button11.innerText = "7";
button11.style.width = "100px";
button11.setAttribute("aria-label", "7");
button11.setAttribute("role", "button");

const button12 = document.createElement("button");
button12.className = "btn btn-secondary mt-2";
button12.innerText = "8";
button12.style.width = "100px";
button12.setAttribute("aria-label", "8");
button12.setAttribute("role", "button");

const button13 = document.createElement("button");
button13.className = "btn btn-secondary mt-2";
button13.innerText = "9";
button13.style.width = "100px";
button13.setAttribute("aria-label", "9");
button13.setAttribute("role", "button");

const button14 = document.createElement("button");
button14.className = "btn btn-secondary mt-2";
button14.innerText = "0";
button14.style.width = "100px";
button14.setAttribute("aria-label", "0");
button14.setAttribute("role", "button");

const button15 = document.createElement("button");
button15.className = "btn btn-primary mt-2";
button15.innerText = "=";
button15.style.width = "100px";
button15.setAttribute("aria-label", "Equal");
button15.setAttribute("role", "button");

const button16 = document.createElement("button");
button16.className = "btn btn-danger mt-2";
button16.innerText = "Del";
button16.style.width = "100px";
button16.setAttribute("aria-label", "Backspace");
button16.setAttribute("role", "button");

const button17 = document.createElement("button");
button17.className = "btn btn-warning mt-2";
button17.innerText = "Clear";
button17.style.width = "100px";
button17.setAttribute("aria-label", "Clear Screen");
button17.setAttribute("role", "button");

div1.appendChild(button1);
div1.appendChild(button2);
div1.appendChild(button3);
div1.appendChild(button4);
div1.appendChild(button5);
div1.appendChild(button6);
div1.appendChild(button7);
div1.appendChild(button8);
div1.appendChild(button9);
div1.appendChild(button10);
div1.appendChild(button11);
div1.appendChild(button12);
div1.appendChild(button13);
div1.appendChild(button14);
div1.appendChild(button15);
div1.appendChild(button16);
div1.appendChild(button17);
card.appendChild(div1);

const screen = title2;

let firstClick = true;

function cleanStart() {
  if (firstClick) {
    screen.innerText = "";
    firstClick = false;
  }
}

button5.addEventListener("click", function () {
  cleanStart();
  screen.innerText += "1";
});
button6.addEventListener("click", function () {
  cleanStart();
  screen.innerText += "2";
});
button7.addEventListener("click", function () {
  cleanStart();
  screen.innerText += "3";
});
button8.addEventListener("click", function () {
  cleanStart();
  screen.innerText += "4";
});
button9.addEventListener("click", function () {
  cleanStart();
  screen.innerText += "5";
});
button10.addEventListener("click", function () {
  cleanStart();
  screen.innerText += "6";
});
button11.addEventListener("click", function () {
  cleanStart();
  screen.innerText += "7";
});
button12.addEventListener("click", function () {
  cleanStart();
  screen.innerText += "8";
});
button13.addEventListener("click", function () {
  cleanStart();
  screen.innerText += "9";
});
button14.addEventListener("click", function () {
  cleanStart();
  screen.innerText += "0";
});

button1.addEventListener("click", function () {
  cleanStart();
  screen.innerText += "+";
});
button2.addEventListener("click", function () {
  cleanStart();
  screen.innerText += "-";
});
button3.addEventListener("click", function () {
  cleanStart();
  screen.innerText += "*";
});
button4.addEventListener("click", function () {
  cleanStart();
  screen.innerText += "/";
});

//? function safeCalc(expr) {
//?   if (!/^[0-9+\-*/.() ]+$/.test(expr)) {
//?     return "Invalid";
//?   }
//?   try {
//?     return new Function("return " + expr)();
//?   } catch {
//?     return "Error";
//?   }
//? }

button15.addEventListener("click", function () {
  try {
    const result = eval(screen.innerText);
    //? const result = safeCalc(screen.innerText);
    screen.innerText = result;
  } catch {
    screen.innerText = "Error";
  }
});

button16.addEventListener("click", function () {
  if (firstClick) return;
  screen.innerText = screen.innerText.slice(0, -1);
  if (screen.innerText.length === 0) {
    screen.innerText = "---";
    firstClick = true;
  }
});

button17.addEventListener("click", function () {
  screen.innerText = "---";
  firstClick = true;
});
