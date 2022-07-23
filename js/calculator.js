function calcClear() {
    textArea = ''
    previousTextArea = ''
    currentOperation = ''
    point = false
    resultArea.innerHTML = ''
}
function calcSqrt(number) {
    return Math.sqrt(number)
}
function calcChangeSign(number) {
    return +number * -1
}
function calcPercent(number, percent) {
    return +number / 100 * +percent
}
function calcDivide(firstNumber, secondNumber) {
    return +firstNumber / +secondNumber
}
function calcMulti(firstNumber, secondNumber) {
    return +firstNumber * +secondNumber
}
function calcMinus(firstNumber, secondNumber) {
    return +firstNumber - +secondNumber
}
function calcPlus(firstNumber, secondNumber) {
    return +firstNumber + +secondNumber
}
function calcNumb(number) {
    return number
}

let resultArea = document.querySelector(".calculator__result-area")
let textArea = ''
let previousTextArea = ''
let currentOperation = ''
let point = false
let numlengthLimit = 0.068 * resultArea.offsetWidth - 1
let numFix = numlengthLimit - Math.trunc(+resultArea.innerHTML).toString.length

document.addEventListener("click", function (e) {
    let target = e.target
    if (!target.classList.contains("btn")) return
    switch (target.className) {
        case "calculator__number btn":
            textArea += calcNumb(target.textContent);
            resultArea.innerHTML = textArea
            break;
        case "calculator__plus btn":
            if (currentOperation) return
            currentOperation = "plus"
            previousTextArea = textArea
            resultArea.innerHTML = ''
            textArea = ''
            point = false
            break;
        case "calculator__minus btn":
            if (currentOperation) return
            currentOperation = "minus"
            previousTextArea = textArea
            resultArea.innerHTML = ''
            textArea = ''
            point = false
            break;
        case "calculator__multi btn":
            if (currentOperation) return
            currentOperation = "multi"
            previousTextArea = textArea
            resultArea.innerHTML = ''
            textArea = ''
            point = false
            break;
        case "calculator__divided btn":
            if (currentOperation) return
            currentOperation = "divide"
            previousTextArea = textArea
            resultArea.innerHTML = ''
            textArea = ''
            point = false
            break;
        case "calculator__percent btn":
            try {
                switch (currentOperation) {
                    case "plus":
                        numFix = numlengthLimit - Math.trunc(+previousTextArea + calcPercent(previousTextArea, textArea)).toString().length - 1
                        resultArea.innerHTML = (+previousTextArea + calcPercent(previousTextArea, textArea)).toFixed(numFix)
                        resultArea.innerHTML = +resultArea.innerHTML
                        break;
                    case "minus":
                        numFix = numlengthLimit - Math.trunc(+previousTextArea - calcPercent(previousTextArea, textArea)).toString().length - 1
                        resultArea.innerHTML = (+previousTextArea - calcPercent(previousTextArea, textArea)).toFixed(numFix)
                        resultArea.innerHTML = +resultArea.innerHTML
                        break;
                    case "multi":
                        numFix = numlengthLimit - Math.trunc(+previousTextArea * calcPercent(previousTextArea, textArea) / 100).toString().length - 1
                        resultArea.innerHTML = (+previousTextArea * calcPercent(previousTextArea, textArea) / 100).toFixed(numFix)
                        resultArea.innerHTML = +resultArea.innerHTML
                        break;
                    case "divide":
                        numFix = numlengthLimit - Math.trunc(+previousTextArea / calcPercent(previousTextArea, textArea) * 100).toString().length - 1
                        resultArea.innerHTML = (+previousTextArea / calcPercent(previousTextArea, textArea) * 100).toFixed(numFix)
                        resultArea.innerHTML = +resultArea.innerHTML
                        break;
                }
            } catch (err) {
                console.log(err.name);
                resultArea.innerHTML = 'ERROR'
                setTimeout(function(){
                    resultArea.innerHTML = ''
                    textArea = ''
                    previousTextArea = ''
                    currentOperation = ''
                },500)
            }
            textArea = resultArea.innerHTML
            currentOperation = ''
            break;
        case "calculator__sqrt btn":
            numFix = numlengthLimit - Math.trunc(calcSqrt(textArea)).toString().length - 1
            resultArea.innerHTML = calcSqrt(textArea).toFixed(numFix)
            resultArea.innerHTML = +resultArea.innerHTML
            textArea = resultArea.innerHTML
            break;
        case "calculator__changeSign btn":
            resultArea.innerHTML = calcChangeSign(textArea)
            textArea = resultArea.innerHTML
            break;
        case "calculator__point btn":
            if (resultArea.innerHTML.includes(".")) return
            point = true
            textArea += "."
            resultArea.innerHTML = textArea
            break;
        case "calculator__clear btn":
            calcClear()
            break;
        case "calculator__equal btn":
            try{
                switch (currentOperation) {
                    case "plus":
                        numFix = numlengthLimit - Math.trunc(calcPlus(previousTextArea, textArea)).toString().length - 1
                        resultArea.innerHTML = calcPlus(previousTextArea, textArea).toFixed(numFix)
                        resultArea.innerHTML = +resultArea.innerHTML
                        point = false
                        break;
                    case "minus":
                        numFix = numlengthLimit - Math.trunc(calcMinus(previousTextArea, textArea)).toString().length - 1
                        resultArea.innerHTML = calcMinus(previousTextArea, textArea).toFixed(numFix)
                        resultArea.innerHTML = +resultArea.innerHTML
                        point = false
                        break;
                    case "multi":
                        numFix = numlengthLimit - Math.trunc(calcMulti(previousTextArea, textArea)).toString().length - 1
                        resultArea.innerHTML = calcMulti(previousTextArea, textArea).toFixed(numFix)
                        resultArea.innerHTML = +resultArea.innerHTML
                        point = false
                        break;
                    case "divide":
                        numFix = numlengthLimit - Math.trunc(calcDivide(previousTextArea, textArea)).toString().length - 1
                        resultArea.innerHTML = calcDivide(previousTextArea, textArea).toFixed(numFix)
                        resultArea.innerHTML = +resultArea.innerHTML
                        point = false
                        break;
                }
            }catch(err){
                resultArea.innerHTML = 'ERROR'
                setTimeout(function(){
                    resultArea.innerHTML = ''
                    textArea = ''
                    previousTextArea = ''
                    currentOperation = ''
                },500)

            }
            textArea = resultArea.innerHTML
            currentOperation = ''
            break;
    }
    if (resultArea.innerHTML.length > numlengthLimit) resultArea.innerHTML = 'ERROR'
})