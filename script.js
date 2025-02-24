let currentNum, previousNum;
let currentOp;

const Symbols = {
    MINUS: '-',
    PLUS: '+',
    DIVIDE: '÷',
    MULTIPLY: '*',
    COMMA: ",",
    PERIOD: ".",
}

function setTop(previousNum, currentOp) {
    document.getElementById("top").textContent = (previousNum && currentOp) ? formatWithCommas(previousNum) + " " + currentOp : '';
}

function setBottom(currentNum) {
    document.getElementById("bottom").textContent = currentNum ? formatWithCommas(currentNum) : '';
}

document.getElementById('calculator-wrapper').addEventListener("click", (event) => {
    if (event.target.tagName === 'BUTTON') {
        const buttonText = event.target.innerText;

        switch (buttonText) {
            case "AC":
                allClear();
                break;
            case "DEL":
                deleteDigit();
                break;
            case Symbols.DIVIDE:
            case Symbols.MULTIPLY:
            case Symbols.PLUS:
                // TODO: If an operator has been selected already, allow the user to change the selected operator
                handleOperator(buttonText);
                break;
            case Symbols.MINUS:
                subtract();
                break;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                assignNum(buttonText);
                break;
            case Symbols.PERIOD:
                decimalNum();
                break;
            case "=":
                evaluateExpression();
                break;
            default:
                console.error("Unknown value/operator: " + buttonText)
        }
    }
})

function allClear() {
    previousNum = undefined;
    currentNum = undefined;
    currentOp = undefined;

    setTop(previousNum, currentOp);
    setBottom(currentNum);
}

function deleteDigit() {
    // Don't try deleting if currentNum is not defined
    if (currentNum) {
        currentNum = String(currentNum).slice(0, -1);
        setBottom(currentNum);
    }
}

function handleOperator(operator) {
    if (!currentNum) {
        currentNum = 0;
    }
    if (previousNum) {
        evaluateExpression();
    }
    if (currentOp) {
        return;
    }
    currentOp = operator;
    opCleanUp();
}

function subtract() {
    // If no number has been entered, - is not an operator, but the start of a negative number
    if (!currentNum) {
        currentNum = Symbols.MINUS;
        setBottom(currentNum);
        return;
    }

    // Don't want the user to enter "- -"
    if (currentNum !== Symbols.MINUS) {
        if (previousNum) {
            evaluateExpression();
        }
        currentOp = Symbols.MINUS;
        opCleanUp();
    }
}

function opCleanUp() {
    previousNum = currentNum;
    currentNum = undefined;
    setTop(previousNum, currentOp);
    setBottom(currentNum);
}

function assignNum(num) {
    if (!currentNum) {
        currentNum = num;
    } else {
        currentNum += "" + num;
    }

    setBottom(currentNum);
}

function decimalNum() {
    // Ensure a number can not contain multiple decimal points
    if (!String(currentNum).includes(Symbols.PERIOD)) {
        // If user types a decimal point with no number, replace that with 0.
        if (!currentNum) {
            currentNum = 0;
        }
        currentNum += Symbols.PERIOD;
        setBottom(currentNum);
    }
}

function evaluateExpression() {
    // Ensure all parts of the expression are present before evaluating
    if (currentNum && currentNum !== Symbols.MINUS && previousNum && currentOp) {
        // Cast numbers before doing math (avoid doing string concatenation for +)
        previousNum = Number(previousNum);
        currentNum = Number(currentNum);

        switch (currentOp) {
            case Symbols.DIVIDE:
                currentNum = previousNum / currentNum;
                break;
            case Symbols.MULTIPLY:
                currentNum = previousNum * currentNum;
                break;
            case Symbols.PLUS:
                currentNum = previousNum + currentNum;
                break;
            case Symbols.MINUS:
                currentNum = previousNum - currentNum;
                break;
            default:
                console.error("Unknown operator: " + currentOp);
        }

        previousNum = undefined;
        currentOp = undefined;
        setTop(previousNum, currentOp);
        setBottom(currentNum);
    }
}

// from https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators
function formatWithCommas(number) {
    return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, Symbols.COMMA);
}
