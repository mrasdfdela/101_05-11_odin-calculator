display = document.querySelector("#display")

function createBtn(buttons) { //create buttons using JSON list
    var container = document.querySelector(".container")
    buttons.forEach( button => {
        newBtn = document.createElement("button")
        newBtn.innerText = ` ${button.text} `
        newBtn.classList.add(`${button.type}`)

        container.appendChild(newBtn)
    })
}

function inputListeners() { // create listeners for button presses
    buttonEls = document.querySelectorAll("button")

    buttonEls.forEach( btn => {
        btn.addEventListener("click", function(e) { 
            input = this.innerText
            // clear display or handle input
            input == "Clear" ? clearDisplay(true) : inputHandler(input) 
        })
    })
}

function inputHandler(input) { // handle input from button
    savedInputs.firstNum == '∞' ? savedInputs.firstNum = "" :

    input1 = (savedInputs.firstNum=="")
    input2 = (savedInputs.secondNum=="")
    input3 = (savedInputs.operation=="")
    inputO = ('+-x/='.includes(input) )
    solution = (savedInputs.solution == true)

    if (!input3 && inputO) { // 2nd number exists & input is an operator
        savedInputs.firstNum = operate(savedInputs)
        savedInputs.secondNum = ""
        input == '=' ? savedInputs.operation = "" : savedInputs.operation = input
    } else if (!input3) { // 2nd number exists
        savedInputs.secondNum = `${savedInputs.secondNum}${input}`
    } else if (!input2 && input3) { // operator exists, no 2nd number
        savedInputs.secondNum = input
    } else if (!input1 && '+-x/'.includes(input)) { // 1st number exists & operator
        savedInputs.operation = input
    } else if (!input1 && input=='=') { // do nothing if 1st number exists & input is equal
        return
    } else if (!input1 && solution) { // if 1st num is a solution, create new 1st number
        savedInputs.firstNum = input
        savedInputs.solution = false
    } else if (!input1) { // if 1st number exists, update number
        savedInputs.firstNum = `${savedInputs.firstNum}${input}`
    } else if (input1) { // if 1st number doesn't exist, create it
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

    // process results of operation
    var result
    switch(i.operation) {
        case "+":
            result = num1 + num2
            break
        case "-":
            result = num1 - num2
            break
        case "x":
            result = num1 * num2
            break
        case "/":
            result = (num1/num2)
            break
    }

    // update display with results
    i.firstNum = result
    i.solution = true
    updateDisplay()
    
    // handle operation when dividing by zero
    if (result==Infinity) {
        clearDisplay(true)
        savedInputs.solution = false
        return "∞" // handle when users try to divide by zero
    } else {
        return parseFloat(result.toFixed(5)) // handle overflowing decimals
    }
}
// update display
function updateDisplay() {
    clearDisplay()
    i = savedInputs
    display.value = `${i.firstNum} ${i.operation} ${i.secondNum}`
}
// clear display with option to clear all memory
function clearDisplay(clearMemory = false) {
    if (clearMemory == true) {
        for (key in savedInputs) {
            savedInputs[key] = "";
        }
    }
    display.value = ''
}

// initialize calculator
createBtn(buttons)
inputListeners()
clearDisplay(true)