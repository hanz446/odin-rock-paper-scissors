
let humanScore = 0;
let computerScore = 0;

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

function playRound(humanChoice, computerChoice) {

    switch (humanChoice.self) {
        case computerChoice.losesTo:
            humanScore++;
            console.log(`You win! ${humanChoice.self} beats ${computerChoice.self}!`);
            break;
        case computerChoice.winsTo:
            computerScore++;
            console.log(`You lose! ${computerChoice.self} beats ${humanChoice.self}!`);
            break;
        default:
            console.log("It's a draw!")
    }
    console.log(`Human: ${humanScore} Computer: ${computerScore}`)
}

function getComputerChoice() {
    let computerChoice = choices[Math.floor(Math.random() * 3)];
    return computerChoice
}

function getHumanChoice() {
    let humanChoice = window.prompt("Choose your weapon! [Rock, Paper, Scissors]");
    humanChoice = humanChoice.trim().toLowerCase();
    return selection[humanChoice]
}

const humanSelection = getHumanChoice();
const computerSelection = getComputerChoice();

playRound(humanSelection, computerSelection);