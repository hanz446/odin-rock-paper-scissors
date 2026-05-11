
const handSelection = {
    rock: {
        self: "Rock",
        winsTo: "Scissors",
        losesTo: "Paper"
    },
    paper: {
        self: "Paper",
        winsTo: "Rock",
        losesTo: "Scissors"
    },
    scissors: {
        self: "Scissors",
        winsTo: "Paper",
        losesTo: "Rock"
    }
};

function playGame() {
    let humanScore = 0;
    let computerScore = 0;

    for (let i = 0; i <= 4; i++) {
        let roundWinner = playRound(getHumanChoice(), getComputerChoice())
        roundWinner ? (roundWinner === "human" ? humanScore++ : computerScore++) : null;
        displayScore(humanScore, computerScore)
    }

    displayWinner(humanScore, computerScore);
}

function playRound(humanChoice, computerChoice) {
    let roundWinner = null;
    switch (humanChoice.self) {
        case computerChoice.losesTo:
            roundWinner = "human";
            console.log(`You win! ${humanChoice.self} beats ${computerChoice.self}!`);
            break;
        case computerChoice.winsTo:
            roundWinner = "computer";
            console.log(`You lose! ${computerChoice.self} beats ${humanChoice.self}!`);
            break;
        default:
            console.log("It's a draw!");
    }
    return roundWinner;
}

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"]
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    return handSelection[computerChoice];
}

function getHumanChoice() {
    let humanChoice = window.prompt("Choose your weapon! [Rock, Paper, Scissors]").trim().toLowerCase();

    while (handSelection[humanChoice] === undefined) {
        humanChoice = window.prompt("Choose a valid weapon! [Rock, Paper, Scissors]").trim().toLowerCase();
    }

    return handSelection[humanChoice];
}

function displayScore(humanScore, computerScore) {
    console.log(`Human: ${humanScore} Computer: ${computerScore}`);
}

function displayWinner(humanScore, computerScore) {
    humanScore == computerScore ? console.log("It's a Draw!") : (humanScore > computerScore ? console.log("You win! Congratulations!") : console.log("You lose! Try again!"));
}

playGame()