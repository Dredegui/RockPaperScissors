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
	const imgDiv= document.createElement("div"); 
	const div = document.createElement("div"); 
	const who = document.createElement("h4"); 
	imgDiv.className = `choice ${cl}`;
	const img = document.createElement("img"); 
	img.src = `img/${clname}-icon.png`;
	imgDiv.appendChild(img);
	who.textContent = usr;
	who.style.margin = "0";
	who.style.marginBottom = "2px";
	who.style.textAlign = "center";
	div.style.display = "flex";
	div.style.justifyContent = "center";
	div.style.flexDirection= "column";
	div.appendChild(who);
	div.appendChild(imgDiv);
	return div;
}

function animateRandom(div, image){
	div.removeChild(image);
	const divmoving = document.createElement("div"); 
	const rock = document.createElement("img"); 
	const paper = document.createElement("img"); 
	const scissors = document.createElement("img"); 
	rock.src = `img/rock-icon.png`;
	paper.src = `img/paper-icon.png`;
	scissors.src = `img/scissors-icon.png`;
	div.appendChild(divmoving);
	divmoving.appendChild(rock);
	divmoving.appendChild(paper);
	divmoving.appendChild(scissors);
	divmoving.style.position = "absolute";
	divmoving.style.top = "0";
	let id = null;
	let pos = 0;
	clearInterval(id);
	id = setInterval(frame, 1);
	function frame() {
		if (pos === -300) {
			clearInterval(id);
			div.removeChild(divmoving);
			div.appendChild(image);
		} else {
			pos--;
			divmoving.style.top = pos + "px";
		}
	}
}



function mkCenterDiv () {
	let div = document.createElement("div");
	div.style.display = "flex";
	div.style.justifyContent = "center";
	div.style.alignItems = "center";
	div.style.flexDirection= "column";
	div.classList.add("spec");
	div.style.marginTop = "20px"
	return div;
}

function game(className) {
	playerSelection = className.replace("choice ", "");
	let computerSelection = getComputerChoice();
	let playerButton = mkButton("Player", playerSelection);	
	let computerButton = mkButton("Computer", computerSelection);
	const para = document.createElement("p");
	para.textContent="vs";
	para.style.textAlign = "center";
	let par = document.querySelector(".choice-container");
	let buttons = document.querySelectorAll(".choice-container button");
	buttons.forEach((button) => par.removeChild(button));
	let div = mkCenterDiv();
	div.appendChild(para);
	par.appendChild(playerButton);
	par.appendChild(div);
	par.appendChild(computerButton);
	let corr = computerButton.lastElementChild.lastElementChild;
	animateRandom(computerButton.lastElementChild,  computerButton.lastElementChild.lastElementChild);
	let specid = null;
	specid = setInterval()
	const anc = document.createElement("h3");
	anc.textContent = round(playerSelection, computerSelection);;
	anc.style.textAlign = "center";
	(par.parentNode).insertBefore(anc, document.querySelector(".score"));
	if (anc.textContent.includes("win")) {
		return 1;
	} else if (anc.textContent.includes("lose")){
		return -1;
	} else {
		return 0;
	}
}

function listenButtons(playerSc, compSc) {
	const buttons = document.querySelectorAll("button");
	let temp;
	buttons.forEach((button) => {
		button.addEventListener('click', () => {
			temp = game(button.className);
			if (temp > 0) {
				playerSc += temp;
			} else {
				compSc += temp;
			}
			let prmpt = document.querySelector(".prompt-container");
			const plagin = document.createElement("button");
			let res = "";
			plagin.textContent = "Play Again";
			if (playerSc === 5) {
				res = "You won the game!";
				playerSc = 0;
				compSc = 0;
			} else if (compSc === -5) {
				res = "You lost the game!";
				playerSc = 0;
				compSc = 0;
			} else {
				plagin.textContent = "Next Round";
			}
			prmpt.appendChild(plagin);
			const score = document.querySelector(".score");
			if (res != "") {
				score.textContent=res;
			} else {
				score.textContent=`Score: ${playerSc} - ${(-1*compSc)}`;
			}
			plagin.addEventListener("click", () => {
				document.body.innerHTML = originalDOM;
				listenButtons(playerSc, compSc);
			});
		});
	});
	const score = document.querySelector(".score");
	score.textContent=`Score: ${playerSc} - ${(-1*compSc)}`;
	return;	
}

let originalDOM = document.body.innerHTML;
console.log("wtf");
listenButtons(0, 0);
// game();