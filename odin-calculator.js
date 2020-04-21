const buttons = [
    { text: "=", type: "eval" },
    { text: "Clear", type: "eval" },
    { text: "0", type: "zero" },
    { text: ".", type: "num" },
    { text: "/", type: "operator" },
    { text: "1", type: "num" },
    { text: "2", type: "num" },
    { text: "3", type: "num" },
    { text: "*", type: "operator" },
    { text: "4", type: "num" },
    { text: "5", type: "num" },
    { text: "6", type: "num" },
    { text: "-", type: "operator" },
    { text: "7", type: "num" },
    { text: "8", type: "num" },
    { text: "9", type: "num" },
    { text: "+", type: "operator" }
]
let savedInputs = {
    firstNum: "",
    operation: "",
    secondNum: "",
    solution: true
}
display = document.querySelector("#display")

function createBtn(buttons) {
    var container = document.querySelector(".container")
    buttons.forEach( button => {
        newBtn = document.createElement("button")
        newBtn.innerText = ` ${button.text} `
        newBtn.classList.add(`${button.type}`)

        container.appendChild(newBtn)
    })
}

function inputListeners() {
    buttonEls = document.querySelectorAll("button")

    buttonEls.forEach( btn => {
        btn.addEventListener("click", function(e) {
            e.preventDefault()
            
            input = this.innerText
            input == "Clear" ? clearDisplay(true) : inputHandler(input) 
        })
    })
}

function inputHandler(input) {
    savedInputs.firstNum == '∞' ? savedInputs.firstNum = "" :

    input1 = (savedInputs.firstNum=="")
    input2 = (savedInputs.secondNum=="")
    input3 = (savedInputs.operation=="")
    inputO = ('+-*/='.includes(input) )
    solution = (savedInputs.solution == true)

    if (!input3 && inputO) { // 2nd number exists & input is an operator
        savedInputs.firstNum = operate(savedInputs)
        savedInputs.secondNum = ""
        input == '=' ? savedInputs.operation = "" : savedInputs.operation = input
    } else if (!input3) { // 2nd number exists
        savedInputs.secondNum = `${savedInputs.secondNum}${input}`
    } else if (!input2 && input3) { // operator exists, no 2nd number
        savedInputs.secondNum = input
    } else if (!input1 && '+-*/'.includes(input)) { // 1st number exists & operator
        savedInputs.operation = input
    } else if (!input1 && input=='=') {
        return
    } else if (!input1 && solution) {
        savedInputs.firstNum = input
        savedInputs.solution = false
    } else if (!input1) {
        savedInputs.firstNum = `${savedInputs.firstNum}${input}`
    } else if (input1) {
        savedInputs.firstNum = input
    }

    updateDisplay()
    console.log(`input: ${input}
                n1:${savedInputs.firstNum}
                n2:${savedInputs.secondNum}
                op:${savedInputs.operation}
                solution:${savedInputs.solution}`)
}

function operate(i) {
    num1 = Number(i.firstNum)
    num2 = Number(i.secondNum)

    var result
    switch(i.operation) {
        case "+":
            result = num1 + num2
            break
        case "-":
            result = num1 - num2
            break
        case "*":
            result = num1 * num2
            break
        case "/":
            result = (num1/num2)
            break
    }

    i.firstNum = result
    i.solution = true
    updateDisplay()
    
    if (result==Infinity) {
        clearDisplay(true)
        savedInputs.solution = false
        return "∞" // handle when users try to divide by zero
    } else {
        return parseFloat(result.toFixed(5)) // handle overflowing decimals
    }
}

function updateDisplay() {
    clearDisplay()
    i = savedInputs
    display.value = `${i.firstNum} ${i.operation} ${i.secondNum}`
}
function clearDisplay(clearMemory = false) {
    if (clearMemory == true) {
        for (key in savedInputs) {
            savedInputs[key] = "";
        }
    }
    display.value = ''
}

createBtn(buttons)
inputListeners()
clearDisplay(true)