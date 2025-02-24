let currentNum, previousNum;
let currentOp;

const Operators = {
    Minus: '-',
    Plus: '+',
    Divide: '÷',
    Multiply: '*'
}

function setTop(previousNum, currentOp) {
    document.getElementById("top").textContent = (previousNum && currentOp) ? formatWithCommas(previousNum) + " " + currentOp : undefined;
}

function setBottom(currentNum) {
    document.getElementById("bottom").textContent = currentNum ? formatWithCommas(currentNum) : undefined;
}

document.getElementById('number-pad-wrapper').addEventListener("click", (event) => {
    if (event.target.tagName === 'BUTTON') {
        const buttonText = event.target.innerText;

        switch (buttonText) {
            case "AC":
                allClear();
                break;
            case "DEL":
                deleteDigit();
                break;
            case Operators.Divide:
            case Operators.Multiply:
            case Operators.Plus:
                // If an operator has been selected already, allow the user to change the selected operator
                if (!currentOp || currentOp === "-") {
                    handleOperator(buttonText);
                } else {
                    currentOp = buttonText;
                    setTop(previousNum, currentOp);
                }
                break;
            case Operators.Minus:
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
            case ".":
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
    currentOp = operator;
    opCleanUp();
}

function subtract() {
    // If no number has been entered, - is not an operator, but the start of a negative number
    if (!currentNum) {
        currentNum = "-";
        setBottom(currentNum);
        return;
    }

    // Don't want the user to enter "- -"
    if (currentNum !== "-") {
        if (previousNum) {
            evaluateExpression();
        }
        currentOp = '-';
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
    if (!String(currentNum).includes(".")) {
        // If user types a decimal point with no number, replace that with 0.
        if (!currentNum) {
            currentNum = 0;
        }
        currentNum += ".";
        setBottom(currentNum);
    }
}

function evaluateExpression() {
    // Ensure all parts of the expression are present before evaluating
    if (currentNum && previousNum && currentOp) {
        // Cast numbers before doing math (avoid doing string concatenation for +)
        previousNum = Number(previousNum);
        currentNum = Number(currentNum);

        switch (currentOp) {
            case Operators.Divide:
                currentNum = previousNum / currentNum;
                break;
            case Operators.Multiply:
                currentNum = previousNum * currentNum;
                break;
            case Operators.Plus:
                currentNum = previousNum + currentNum;
                break;
            case Operators.Minus:
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
    return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
