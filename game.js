function getComputerChoice () {
	let choice = Math.floor(Math.random() * 3);
	if (choice === 0) {
		return "Rock";
	} else if (choice === 1) {
		return "Paper";
	} else {
		return "Scissors"; 
	}
}

function decide(choice1, choice2) {
	if (!((choice1 == "Scissors" && choice2 == "Paper") || (choice1 == "Paper" && choice2 == "Rock") || (choice1 == "Rock" && choice2 == "Scissors"))) {
		return choice2;
	}
	return choice1;
}

function round(playerSelection, computerSelection) {
	let winner = "";
	if (computerSelection == playerSelection) {
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

function mkButton(usr, cl) {
	let clname = cl.toLowerCase();
	const button = document.createElement("button"); 
	const div = document.createElement("div"); 
	const who = document.createElement("h4"); 
	button.className = `choice ${cl}`;
	const img = document.createElement("img"); 
	img.src = `img/${clname}-icon.png`;
	button.appendChild(img);
	who.textContent = usr;
	who.style.margin = "0";
	who.style.marginBottom = "2px";
	who.style.textAlign = "center";
	div.style.display = "flex";
	div.style.justifyContent = "center";
	div.style.flexDirection= "column";
	div.appendChild(who);
	div.appendChild(button);
	return div;
}

function game(className) {
	playerSelection = className.replace("choice ", "");
	let computerSelection = getComputerChoice();
	let playerButton = mkButton("Player", playerSelection);	
	let computerButton = mkButton("Computer", computerSelection);
	const para = document.createElement("p");
	para.classList.add("choice");
	para.textContent="vs";
	para.style.textAlign = "center";
	let par = document.querySelector(".choice-container");
	let buttons = document.querySelectorAll(".choice-container button");
	buttons.forEach((button) => par.removeChild(button));
	par.appendChild(playerButton);
	par.appendChild(para);
	par.appendChild(computerButton);
	const anc = document.createElement("h3");
	anc.textContent = round(playerSelection, computerSelection);;
	anc.style.textAlign = "center";
	(par.parentNode).appendChild(anc);
	if (anc.textContent.includes("win")) {
		return 1;
	} else {
		return -1;
	}
}

function listenButtons() {
	const buttons = document.querySelectorAll("button");
	let score = 0;
	buttons.forEach((button) => {
		button.addEventListener('click', () => {
			score += game(button.className);
			let prmpt = document.querySelector(".prompt-container");
			const plagin = document.createElement("button");
			plagin.textContent = "Play Again";
			prmpt.appendChild(plagin);
			plagin.addEventListener("click", () => {
				document.body.innerHTML = originalDOM;
				listenButtons();
			});
		});
	});
	return;	
}

let originalDOM = document.body.innerHTML;
console.log("wtf");
listenButtons();
// game();