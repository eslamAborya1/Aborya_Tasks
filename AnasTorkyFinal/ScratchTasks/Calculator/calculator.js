class Calculator extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
  
      // Calculator container
      const calculatorContainer = document.createElement('div');
      calculatorContainer.setAttribute('class', 'calculator');
  
      // Calculator screen
      const screen = document.createElement('input');
      screen.setAttribute('type', 'text');
      screen.setAttribute('class', 'screen');
      screen.setAttribute('disabled', 'true');
      calculatorContainer.appendChild(screen);
  
      // Buttons
      const buttons = [
        'C', '←', '%', '√',
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', '.', '=', '+'
      ];
  
      const buttonContainer = document.createElement('div');
      buttonContainer.setAttribute('class', 'button-container');
  
      buttons.forEach(button => {
        const btn = document.createElement('button');
        btn.textContent = button;
        btn.onclick = () => this.onButtonClick(button, screen);
        buttonContainer.appendChild(btn);
      });
  
      calculatorContainer.appendChild(buttonContainer);
      shadow.appendChild(calculatorContainer);
  
      // Styles
      const style = document.createElement('style');
      style.textContent = `
        .calculator {
          display: grid;
          grid-template-rows: auto 2fr;
          width: 320px;
          background-color: white;
          border-radius: 15px;
          box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
          padding: 20px;
        }
  
        .screen {
          grid-row: 1 / 2;
          width: 95%;
          height: 50px;
          border: none;
          background-color: #333;
          color: #fff;
          font-size: 2rem;
          text-align: right;
          padding: 10px;
          border-radius: 10px;
        }
  
        .button-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-top: 20px;
        }
  
        button {
          padding: 20px;
          font-size: 1.5rem;
          border: none;
          border-radius: 10px;
          background-color: #4caf50;
          color: white;
          cursor: pointer;
          transition: background-color 0.2s ease-in-out;
        }
  
        button:hover {
          background-color: #45a049;
        }
  
        button:active {
          transform: scale(0.95);
        }
  
        button:nth-child(4n) {
          background-color: #ff9800;
        }
  
        button:nth-child(4n):hover {
          background-color: #fb8c00;
        }
      `;
      shadow.appendChild(style);
    }
  
    onButtonClick(button, screen) {
      if (button === '=') {
        try {
          screen.value = eval(this.replaceOperators(screen.value));
        } catch {
          screen.value = 'Error';
        }
      } else if (button === 'C') {
        screen.value = '';
      } else if (button === '←') {
        screen.value = screen.value.slice(0, -1);
      } else if (button === '√') {
        try {
          screen.value = Math.sqrt(parseFloat(screen.value));
        } catch {
          screen.value = 'Error';
        }
      } else if (button === '%') {
        screen.value = (parseFloat(screen.value) / 100).toString();
      } else {
        screen.value += button;
      }
    }
  
    replaceOperators(value) {
      // Replace percentage (%) with corresponding division by 100
      return value.replace(/%/g, '/100');
    }
  }
  
  // Define the new element
  customElements.define('my-calculator', Calculator);