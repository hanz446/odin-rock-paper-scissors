
const rock = {
    self: "Rock",
    winsTo: "Scissors",
    losesTo: "Paper"
};
const paper = {
    self: "Paper",
    winsTo: "Rock",
    losesTo: "Scissors"
};
const scissors = {
    self: "Scissors",
    winsTo: "Paper",
    losesTo: "Rock"
};
const selection = {
    rock: rock,
    paper: paper,
    scissors: scissors
};
const choices = [rock, paper, scissors];

function playGame() {
    let humanScore = 0;
    let computerScore = 0;

    for (let i = 0; i <= 4; i++) {
        let roundWinner = playRound(getHumanChoice(), getComputerChoice())
        roundWinner ? roundWinner === "human" ? humanScore++ : computerScore++ : null;
        displayScore(humanScore, computerScore)
    }
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
    let computerChoice = choices[Math.floor(Math.random() * 3)];
    return computerChoice;
}

function getHumanChoice() {
    let humanChoice = window.prompt("Choose your weapon! [Rock, Paper, Scissors]");
    humanChoice = humanChoice.trim().toLowerCase();
    return selection[humanChoice];
}

function displayScore(humanScore, computerScore) {
    console.log(`Human: ${humanScore} Computer: ${computerScore}`);
}

playGame()