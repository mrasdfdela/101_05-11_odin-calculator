buttons = [
    { text: "Enter", type: "eval" },
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

function createBtn(buttons) {
    var container = document.querySelector(".container")
    buttons.forEach( button => {
        newBtn = document.createElement("button")
        newBtn.innerText = ` ${button.text} `
        newBtn.classList.add(`${button.type}`)

        container.appendChild(newBtn)
    })
}

createBtn(buttons)