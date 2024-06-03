const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let operator = null;
let previousInput = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        
        switch (value) {
            case 'AC':
                currentInput = '';
                previousInput = '';
                operator = null;
                display.textContent = '';
                break;
            case '=':
                if (previousInput !== '' && currentInput !== '') {z
                    currentInput = eval(previousInput + operator + currentInput).toString();
                    operator = null;
                    previousInput = '';
                    display.textContent = currentInput;
                }
                break;
            case '+':
            case '-':
            case '*':
            case '/':
                if (currentInput === '' && value === '-') {
                    currentInput = '-';
                    display.textContent = currentInput;
                } else if (currentInput !== '') {
                    previousInput = currentInput;
                    currentInput = '';
                    operator = value;
                    display.textContent += value;
                }
                break;
            default:
                currentInput += value;
                display.textContent += value;
                break;
        }
    });
});
