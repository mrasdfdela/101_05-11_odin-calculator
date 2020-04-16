const buttons = [
    { text: "=", type: "eval" },
    { text: "Clear", type: "eval" },
    { text: "0", type: "zero" },
    { text: ".", type: "num" },
    { text: "/", type: "operator" },
    { text: "1", type: "num" },
    { text: "2", type: "num" },
    { text: "3", type: "num" },
    { text: "x", type: "operator" },
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
    firstNum: 1,
    secondNum: 2,
    operation: "+"
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
    test = document.querySelectorAll("button")
    display = document.querySelector("#display")

    test.forEach( btn => {
        btn.addEventListener("click", function(e) {
            e.preventDefault()
            
            input = this.innerText

            switch(input) {
                case "Clear":
                    clear();
                    break;
                case "=":
                    operate()
                    break;
                default:
                    inputHandler(input)
            }
        })
    })
}

function inputHandler(input) {
    operation = "+"
    
    clear(display)
    updateDisplay(input)
}

function updateDisplay(input) {
    display.value += input
}

function operate() {
    switch(savedInputs.operation) {
        case "+":
            break
        case "-":
            break
        case "*":
            break
        case "/":
            break
    }

    // takes in previously stored values
    // listener with "Equals" key
    // handle long decimals so they don't overflow

    // handle when users try to divide by zero
}

function clear() {
    for (key in savedInputs) {
        savedInputs[key] = null;
    }
    display.value = ''
}

createBtn(buttons)
inputListeners()
clear(display)