function getComputerChoice () {
	let choice = Math.floor(Math.random() * 3);
	if (choice === 0) {
		return "Rock";
	} else if (choice === 1) {
		return "Paper";
	} else {
		return "Scissor"; 
	}
}

function decide(choice1, choice2) {
	if (!((choice1 === "Scissors" && choice2 == "Paper") || (choice1 === "Paper" && choice2 == "Rock") || 
		(choice1 === "Rock" && choice2 == "Scissors"))) {
		return choice2;
	}
	return choice1;
}

function round(playerSelection, computerSelection) {
	let winner = "";
	if (computerSelection === playerSelection) {
		return "Tie!";
	} else {
		winner = decide(playerSelection, computerSelection);
		if (winner == playerSelection) {
			return `You win! ${playerSelection} beats ${computerSelection}`;
		} else {
			return `You lose! ${computerSelection} beats ${playerSelection}`;
		}
	}
	
}

function game(rounds) {
	let playerSelection;
	let computerSelection;
	let result;
	for(let i = 0; i < rounds; i++) {
		playerSelection = prompt("Choose between Rock Paper and Scissor");
		playerSelection = playerSelection.toLowerCase();
		playerSelection = playerSelection.replace(playerSelection[0], playerSelection[0].toUpperCase());
		computerSelection = getComputerChoice();
		console.log(`Player chose: ${playerSelection}`);
		console.log(`Computer chose: ${computerSelection}`);
		result = round(playerSelection, computerSelection);
		console.log(result);
	}
}

let rounds = prompt("How many rounds you want to play: ");
game(rounds);