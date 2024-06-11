let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let playerOWins = 0;
let playerXWins = 0;
let drawCount = 0;

const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.style.color = "#A70FFB";
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "#FF70AB";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerHTML = `<span style="font-size: 5rem; color:yellow;">Congratulations,</span><br> the winner is<br> <p style="font-size:4rem; font-family:sans; color:red;">${winner}</p>`;
    msgContainer.classList.remove("hide");
    disableBoxes();

    if (winner === "O") {
        playerOWins++;
    } else if (winner === "X") {
        playerXWins++;
    }
    updateWinCounts();
}

const showDraw = () => {
    msg.innerHTML = `<span style="font-size: 5rem; color: orange;">Oops,</span><br> game draw`;
    msgContainer.classList.remove("hide");
    disableBoxes();

    drawCount++;
    updateWinCounts();
}

const checkWinner = () => {
    let winnerFound = false;
    for (let pattern of winpatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("winner", pos1Val);
                showWinner(pos1Val);
                winnerFound = true;
                break;
            }
        }
    }
    if (!winnerFound) {
        checkDraw();
    }
};

const checkDraw = () => {
    let allBoxesFilled = true;
    for (let box of boxes) {
        if (box.innerText === "") {
            allBoxesFilled = false;
            break;
        }
    }
    if (allBoxesFilled) {
        showDraw();
    }
}


const updateWinCounts = () => {
    document.getElementById("playerOWins").innerText = playerOWins;
    document.getElementById("playerXWins").innerText = playerXWins;
    document.getElementById("draws").innerText = drawCount;
}

newGamebtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
