
const handSelection = {
    rock: {
        symbol: "👊",
        self: "Rock",
        winsTo: "Scissors",
        losesTo: "Paper"
    },
    paper: {
        symbol: "✋",
        self: "Paper",
        winsTo: "Rock",
        losesTo: "Scissors"
    },
    scissors: {
        symbol: "✌️",
        self: "Scissors",
        winsTo: "Paper",
        losesTo: "Rock"
    }
};

const body = document.querySelector("body");
const heading = document.querySelector("h1")
const gameDisplay = document.getElementById("game-display");
const playerScoreDisplay = document.getElementById("player-score");
const compScoreDisplay = document.getElementById("comp-score");
const compChoiceDisplay = document.getElementById("comp-choice-display");
const resultDisplay = document.getElementById("result-display");
const btnContainer = document.getElementById("button-container");
const selectionBtns = document.querySelectorAll(".selection");
const playBtn = document.getElementById("play-game");

let ongoing = false;
let genSymbol = symbolGenerator();

playBtn.addEventListener("click", playGame)             // Also acts as reset button

function playGame(event) {
    let playerScore = 0;
    let compScore = 0;

    // Toggles UI
    gameDisplay.classList.toggle("ongoing");
    body.classList.toggle("ongoing");
    heading.classList.toggle("ongoing");
    playBtn.classList.toggle("ongoing");

    // Starts or resets the game
    if (ongoing) {
        resetGame();
    } else {
        let animateIntervalID;
        startGame();
    }

    function startGame() {
        ongoing = true;
        btnContainer.addEventListener("click", calculateResult);

        animateIntervalID = setInterval(() => compChoiceDisplay.textContent = genSymbol.next().value, 500); // Start compChoiceDisplay animation
        setTimeout(updatePlayBtn, 320);
    }

    function resetGame() {
        ongoing = false;

        updateScore("reset");
        updatePlayBtn();

        compChoiceDisplay.textContent = "✌️";
        setTimeout(() => resultDisplay.textContent = "First to five wins!", 300);

        gameDisplay.classList.remove("win")
        gameDisplay.classList.remove("lose")
        compChoiceDisplay.classList.remove("win")
        compChoiceDisplay.classList.remove("lose")

        clearInterval(animateIntervalID);                                             // Stops animation
        const currentState = selectionBtns[0].className.trim().split(' ').pop();      // Checks for current button state
        selectionBtns.forEach(btn => btn.classList.replace(currentState, "default")); // Recolors each selection button to default
    }
    
    function isOver(playerScore, compScore) {
        return playerScore >= 5 || compScore >=5;
    }

    function gameOver() {
        btnContainer.removeEventListener("click", calculateResult);

        let gameWinner = playerScore === 5 ? "player" : "computer";
        let result = gameWinner === "player" ? "Congratulations! You win!" : "Aww, better luck next time!";

        resultDisplay.textContent = result;

        if (gameWinner === "player") {
            gameDisplay.classList.add("win");
            compChoiceDisplay.classList.add("win");
        } else {
            gameDisplay.classList.add("lose");
            compChoiceDisplay.classList.add("lose");
        }
    }

    function getPlayerChoice(event) {
        playerChoice = handSelection[event.target.id];
        return playerChoice;
    }

    function getCompChoice() {
        const choices = ["rock", "paper", "scissors"]
        const compChoice = handSelection[choices[Math.floor(Math.random() * 3)]];
        clearInterval(animateIntervalID);
        compChoiceDisplay.textContent = compChoice.symbol;
        return compChoice;
    }

    function calculateResult(event) {
        const playerChoice = getPlayerChoice(event)
        const compChoice = getCompChoice();
        let roundWinner = null;

        switch (playerChoice.self) {
            case compChoice.losesTo:
                roundWinner = "player";
                resultDisplay.textContent = `You win! ${playerChoice.self} beats ${compChoice.self}!`;
                break;
            case compChoice.winsTo:
                roundWinner = "computer";
                resultDisplay.textContent = `You lose! ${compChoice.self} beats ${playerChoice.self}!`;
                break;
            default:
                resultDisplay.textContent = "It's a draw!";
        }
        updateSelectionColor(roundWinner);
        updateScore(roundWinner);

        if (isOver(playerScore, compScore)) {
            gameOver();
        }
    }

    function updateSelectionColor(roundWinner) {
        const currentState = selectionBtns[0].className.trim().split(' ').pop();
        console.log(selectionBtns[0].className);
        switch (roundWinner) {
            case "player":
                selectionBtns.forEach(btn => btn.classList.replace(currentState, "win"));
                break;
            case "computer":
                selectionBtns.forEach(btn => btn.classList.replace(currentState, "lose"));
                break;
            default:
                selectionBtns.forEach(btn => btn.classList.replace(currentState, "default"));
        }
    }

    function updateScore(roundWinner) {
        if (roundWinner) {
            switch (roundWinner) {
                case "player":
                    playerScore++;
                    break;
                case "computer":
                    compScore++;
                    break;
                case "reset":
                    playerScore = 0;
                    compScore = 0;
                    break;
            }
            playerScoreDisplay.textContent = `Player: ${playerScore}`;
            compScoreDisplay.textContent = `Computer: ${compScore}`;
        }
    }
    
    function updatePlayBtn() {
        ongoing ? playBtn.textContent = "Reset" : playBtn.textContent = "Play Game";
    }
}

function* symbolGenerator() {
    const symbols = ["👊", "✋", "✌️"];
    let index = 0;
    while (true) {
        yield symbols[index];
        index = (index + 1) % 3;
    }
}

