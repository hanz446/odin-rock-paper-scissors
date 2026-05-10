
const choices = ["Rock", "Paper", "Scissors"];

function getComputerChoice() {
    let computerChoice = choices[Math.floor(Math.random() * 3)];
    return computerChoice
}

function getHumanChoice() {
    let humanChoice = window.prompt("Choose your weapon! [Rock, Paper, Scissors]");
    return humanChoice
}
