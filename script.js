class RpsGame {
    constructor() {
        this.body = document.querySelector("body");
        this.heading = document.querySelector("h1")
        this.gameDisplay = document.getElementById("game-display");
        this.playerScoreDisplay = document.getElementById("player-score");
        this.compScoreDisplay = document.getElementById("comp-score");
        this.compChoiceDisplay = document.getElementById("comp-choice-display");
        this.resultDisplay = document.getElementById("result-display");
        this.btnContainer = document.getElementById("button-container");
        this.selectionBtns = document.querySelectorAll(".selection");
        this.playBtn = document.getElementById("play-game");

        this.playBtn.addEventListener("click", (event) => this.handleClick(event));
        this.btnContainer.addEventListener("click", (event) => this.handleRound(event));

        this.handSelection = {
            0: {
                symbol: "👊",
                self: "Rock",
                winsTo: "Scissors",
                losesTo: "Paper"
            },
            1: {
                symbol: "✋",
                self: "Paper",
                winsTo: "Rock",
                losesTo: "Scissors"
            },
            2: {
                symbol: "✌️",
                self: "Scissors",
                winsTo: "Paper",
                losesTo: "Rock"
            }
        }

        this.ongoing = false;
        this.playerScore = 0;
        this.compScore = 0;
        this.genSymbol = RpsGame.symbolGenerator();
        this.animateIntervalID = null;
    }

    handleClick(event) {
        this.toggleUI();
        this.ongoing ? this.resetGame() : this.startGame();
    }

    toggleUI() {
        this.gameDisplay.classList.toggle("ongoing");
        this.body.classList.toggle("ongoing");
        this.heading.classList.toggle("ongoing");
        this.playBtn.classList.toggle("ongoing");
    }

    startGame() {
        this.ongoing = true;

        this.selectionBtns.forEach(btn => btn.disabled = false);
        this.animateIntervalID = setInterval(() => this.compChoiceDisplay.textContent = this.genSymbol.next().value, 500);
        setTimeout(() => this.playBtn.textContent = "Reset", 320)
    }

    resetGame() {
        this.ongoing = false;
        this.playerScore = 0;
        this.compScore = 0;

        this.playBtn.textContent = "Play Game"
        this.compChoiceDisplay.textContent = "✌️";
        setTimeout(() => this.resultDisplay.textContent = "First to five wins!", 300);

        this.gameDisplay.classList.remove("win", "lose")
        this.compChoiceDisplay.classList.remove("win", "lose")

        this.updateScoreDisplay();
        this.stopChoiceAnim();
        this.updateBtnState("default");
    }

    handleRound(event) {
        const playerChoice = this.handSelection[event.target.id];
        const compChoice = this.handSelection[Math.floor(Math.random() * 3)];
        const roundResult = this.evaluateResult(playerChoice, compChoice);

        this.stopChoiceAnim();
        this.compChoiceDisplay.textContent = compChoice.symbol;

        this.updateBtnState(roundResult);
        this.updateScore(roundResult);
        this.updateScoreDisplay();
        
        if (this.isOver()) {
            this.handleGameOver();
        }
    }

    evaluateResult(playerChoice, compChoice) {
        let roundResult;

        switch (playerChoice.self) {
            case compChoice.losesTo:
                roundResult = "win";
                this.resultDisplay.textContent = `You win! ${playerChoice.self} beats ${compChoice.self}!`;
                break;
            case compChoice.winsTo:
                roundResult = "lose";
                this.resultDisplay.textContent = `You lose! ${compChoice.self} beats ${playerChoice.self}!`;
                break;
            default:
                roundResult = "default";
                this.resultDisplay.textContent = "It's a draw!";
        }

        return roundResult;
    }

    isOver() {
        return this.playerScore === 5 || this.compScore ===5;
    }

    handleGameOver() {
        this.selectionBtns.forEach(btn => btn.disabled = true);

        if (this.playerScore === 5) {
            this.gameDisplay.classList.add("win");
            this.compChoiceDisplay.classList.add("win");
            this.resultDisplay.textContent = "Congratulations! You win!";
        } else {
            this.gameDisplay.classList.add("lose");
            this.compChoiceDisplay.classList.add("lose");
            this.resultDisplay.textContent = "Aww, better luck next time!";
        }
    }

    updateScore(roundResult) {
        switch (roundResult) {
            case "win":
                this.playerScore++;
                break;
            case "lose":
                this.compScore++;
                break;
        }
    }

    updateScoreDisplay() {
        this.playerScoreDisplay.textContent = `Player: ${this.playerScore}`;
        this.compScoreDisplay.textContent = `Computer: ${this.compScore}`;
    }

    updateBtnState(state) {
        const currentState = this.selectionBtns[0].className.trim().split(' ').pop();
        this.selectionBtns.forEach(btn => btn.classList.replace(currentState, state));
    }

    stopChoiceAnim() {
        clearInterval(this.animateIntervalID);
    }
    
    static *symbolGenerator() {
        const symbols = ["👊", "✋", "✌️"];
        let index = 0;
        while (true) {
            yield symbols[index];
            index = (index + 1) % 3;
        }
    }
}

new RpsGame();