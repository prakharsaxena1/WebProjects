// Variables
let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");
let player1Symbol = document.getElementById("player1Symbol");
let player2Symbol = document.getElementById("player2Symbol");
let reset = document.getElementById("reset");
let allBox = document.getElementsByClassName("BOX");
let p1Score = document.getElementById("player1Score")
let p2Score = document.getElementById("player2Score")
let playerTurn = document.getElementById("turn");

let matchStatus = "";
let count = 0;

// Solution Array
let solutionArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 5, 9], [3, 5, 7], [1, 4, 7], [2, 5, 8], [3, 6, 9]];

// EVENTS
player1.addEventListener("click", function () {
    [player1Symbol.textContent, player2Symbol.textContent] = [player2Symbol.textContent, player1Symbol.textContent];
});

player2.addEventListener("click", function () {
    [player1Symbol.textContent, player2Symbol.textContent] = [player2Symbol.textContent, player1Symbol.textContent];
});

reset.addEventListener("click", function () {
    player1Symbol.textContent = "X";
    player2Symbol.textContent = "O";
    document.getElementById("playerSettings-box").style.pointerEvents = "auto";
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].textContent = "";
    }
    p1Score.textContent = "0";
    p2Score.textContent = "0";
    playerTurn.textContent = "1"
    matchStatus = ""
    count = 0;
});

function markSymbol() {
    if (this.textContent === "") {
        if (playerTurn.textContent === "1") {
            playerTurn.textContent = "2";
            this.textContent = player1Symbol.textContent
            document.getElementById("playerSettings-box").style.pointerEvents = "none";
            count++;
        }
        else {
            playerTurn.textContent = "1";
            document.getElementById("playerSettings-box").style.pointerEvents = "none";
            this.textContent = player2Symbol.textContent
            count++;
        }
    }
    if (count > 4) {
        finalFunction();
    }
}

for (let i = 0; i < 9; i++) {
    allBox[i].addEventListener("click", markSymbol);
}

function finalFunction() {
    let X = [];
    let O = [];
    for (let i = 0; i < 9; i++) {
        if (allBox[i].textContent === "X") {
            X.push(i + 1);
        }
        else if (allBox[i].textContent === "O") {
            O.push(i + 1);
        }
    }

    let winner = "draw";
    // Get match winner
    if (matchStatus !== "over") {
        for (let i = 0; i < solutionArray.length; i++) {
            if (solutionArray[i].every(val => X.includes(val))) {
                matchStatus = "over";
                winner = "X";
                getOutput(winner);
                break;
            } else if (solutionArray[i].every(val => O.includes(val))) {
                matchStatus = "over";
                winner = "O";
                getOutput(winner);
                break;
            }
        }
    }
    if (count === 9 && matchStatus !== "over") {
        getOutput(winner);
    }
}

function getOutput(winner) {
    // Stops match
    document.getElementById("playBoard").style.display = "none";
    // declare winner
    if (winner.length < 2) {
        // increment score
        if (winner === "X" && player1Symbol.textContent === "X") {
            document.getElementById("win-text").textContent = "Player 1 wins!!";
            p1Score.textContent = parseInt(p1Score.textContent) + 1;
        } else if (winner === "O" && player1Symbol.textContent === "O") {
            document.getElementById("win-text").textContent = "Player 1 wins!!";
            p1Score.textContent = parseInt(p1Score.textContent) + 1;
        } else {
            document.getElementById("win-text").textContent = "Player 2 wins!!";
            p2Score.textContent = parseInt(p2Score.textContent) + 1;
        }
    } else {
        document.getElementById("win-text").textContent = "Match " + winner + "!!";
    }
    // Overlays main screen
    document.getElementById("overlay").style.display = "flex";
    // gives button to start new match
    document.getElementById("btn-text").addEventListener("click", function () {
        document.getElementById("playBoard").style.display = "flex";
        document.getElementById("overlay").style.display = "none";
        player1Symbol.textContent = "X";
        player2Symbol.textContent = "O";
        for (let i = 0; i < allBox.length; i++) {
            allBox[i].textContent = "";
        }
        playerTurn.textContent = "1";
        matchStatus = "";
        count = 0;
        document.getElementById("playerSettings-box").style.pointerEvents = "auto";
    });
}
