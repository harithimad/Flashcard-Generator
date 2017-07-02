var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var inquirer = require("inquirer");
var fs = require("fs");
var basiccardArr = [];
var clozedcardArr = [];

function mainmenu() {
	console.log("..Welcome to our flashcard game ..")
	inquirer.prompt([{
		type: "list",
		message: "what would you like to do ?",
		choices: ["Create a card", "Quiz", "EXIT"],
		name: "mainmenu"
	}]).then(function(choice) {
		var msg;
		switch (choice.mainmenu) {
			case "Create a card":
				console.log("Great , let's create a new card")
				msg = setTimeout(createcard, 1000);
				break;
			case "Quiz":
				console.log(" oh so you want to have a quiz")
				msg = setTimeout(quiz, 1000);
				break;
			case "EXIT":
				console.log("Thanks for playing.. Come again");
				break;
		}
	});
}

function createcard() {
	inquirer.prompt([{
		type: "list",
		message: "what type of card would you like to create ? ",
		choices: ["Basic Card", "Cloze Card"],
		name: "cardType"
	}]).then(function(cardanswer) {
		var cardType = cardanswer.cardType;
		if (cardType === "Basic Card") {
			inquirer.prompt([{
				type: "input",
				message: "please type in the front of the card",
				name: "front"
			}, {
				type: "input",
				message: "please full in the back of the card",
				name: "back"
			}]).then(function(response) {
				console.log("Basic Card Created");
				var card = new BasicCard(response.front, response.back);
				basicpremade.push(card);
				fs.appendFile("basiccard.txt",JSON.stringify(card,null,2),function(err){
					if(err)
					{
						console.log(err);
					}
				});
				
				console.log(basicpremade);
				inquirer.prompt([{
					type: "list",
					message: "would you like to create another card",
					choices: ["YES", "NO"],
					name: "newBasicCard"
				}]).then(function(answer) {
					if (answer.newBasicCard === "YES") {
						createcard();
					} else {
						mainmenu();
					}
				})
			})
		} else {
			console.log("so you  decided to create a ClozeCard");
			inquirer.prompt([{
				type: "input",
				message: "Type in the full text of the card: ",
				name: "fulltext"
			}, {
				type: "input",
				message: "type the words that you want to cloze from the full text: ",
				name: "clozedtext"
			}]).then(function(answers) {
				if (answers.fulltext.includes(answers.clozedtext)) {
					var card = new ClozeCard(answers.fulltext, answers.clozedtext);
					console.log(card.partial);
					clozepremade.push(card);
					inquirer.prompt([{
						type: "list",
						message: "would you like to create another card",
						choices: ["YES", "NO"],
						name: "newClozeCard"
					}]).then(function(answer) {
						if (answer.newClozeCard === "YES") {
							createcard();
						} else {
							mainmenu();
						}
					})
				} else {
					console.log("Error , please make sure that the clozed text is inside the full text ");
					createCard();
				}
			})
		}
	})
}
var count = 0;
var basicpremade = [
	new BasicCard("In what comic book did Hawkeye first appear in?", "Tales of Suspense"),
	new BasicCard("Warren K. Worthington III, aka Angel was originally part of what superhero team?", "The X-Men"),
	new BasicCard("Where was Galactus born?", "Taa")
]
var clozepremade = [
	new ClozeCard("The Fantastic Four's headquarters is located in The Baxter Building", "Baxter Building"),
	new ClozeCard("Cain Marko is better known as The Juggernaut", "Juggernaut"),
	new ClozeCard("Bruce Banner aka The Incredible Hulk has a sidekick named Rick Jones", "Rick Jones"),
]

function quiz() {
	inquirer.prompt([{
		type: "list",
		message: "Which deck would you like to choose",
		choices: ["BasicCards", "ClozeCards"],
		name: "quizcards"
	}]).then(function(answer) {
		if (answer.quizcards === "BasicCards") {
			basicCardGame();
		} else {
			clozeCardGame();
		}
	})
}

function basicCardGame() {
	inquirer.prompt([{
		type: "input",
		message: basicpremade[count].front,
		name: "basicanswer"
	}]).then(function(answer) {
		if (answer.basicanswer === basicpremade[count].back) {
			console.log("Correct");
			if (count < basicpremade.length - 1) {
				count++
				basicCardGame();
			} else {
				inquirer.prompt([{
					type: "list",
					message: " The Quiz is finished what would you like to do ",
					choices: ["Play Again", "Main Menu", "EXIT"],
					name: "todo"
				}]).then(function(answers) {
					switch (answers.todo) {
						case "Play Again":
							quiz();
							break;
						case "Main Menu":
							mainmenu();
							break;
						case "EXIT":
							console.log("Thanks for playing come back again");
							break;
					}
				})
			}
		} else {
			console.log("False");
			inquirer.prompt([{
				type: "list",
				message: "would you like to see the answer?",
				choices: ["YES", "NO"],
				name: "listanswer"
			}]).then(function(confirm) {
				if (confirm.listanswer === "YES") {
					console.log("The Answer is " + basicpremade[count].back);
					if (count < basicpremade.length - 1) {
						count++
						basicCardGame();
					} else {
						inquirer.prompt([{
							type: "list",
							message: " The Quiz is finished what would you like to do ",
							choices: ["Play Again", "Main Menu", "EXIT"],
							name: "todo"
						}]).then(function(answers) {
							count = 0;
							switch (answers.todo) {
								case "Play Again":
									quiz();
									break;
								case "Main Menu":
									mainmenu();
									break;
								case "EXIT":
									console.log("Thanks for playing come back again");
									break;
							}
						})
					}
				} else {
					if (count < basicpremade.length - 1) {
						count++
						basicCardGame();
					} else {
						count = 0;
						inquirer.prompt([{
							type: "list",
							message: " The Quiz is finished what would you like to do ",
							choices: ["Play Again", "Main Menu", "EXIT"],
							name: "todo"
						}]).then(function(answers) {
							switch (answers.todo) {
								case "Play Again":
									quiz();
									break;
								case "Main Menu":
									mainmenu();
									break;
								case "EXIT":
									console.log("Thanks for playing come back again");
									break;
							}
						})
					}
				}
			})
		}
	})
}

function clozeCardGame() {
	inquirer.prompt([{
		type: "input",
		message: clozepremade[count].partial,
		name: "answer",
	}]).then(function(answers) {
		if (answers.answer === clozepremade[count].cloze) {
			console.log("Correct!");
			if (count < clozepremade.length - 1) {
				count++
				clozeCardGame();
			} else {
				count = 0;
				inquirer.prompt([{
					type: "list",
					message: " The Quiz is finished what would you like to do ",
					choices: ["Play Again", "Main Menu", "EXIT"],
					name: "todo"
				}]).then(function(answers) {
					switch (answers.todo) {
						case "Play Again":
							quiz();
							break;
						case "Main Menu":
							mainmenu();
							break;
						case "EXIT":
							console.log("Thanks for playing come back again");
							break;
					}
				})
			}
		} else {
			// console.log("False");
			// console.log("The correct answer is " + clozepremade[count].cloze);
			// console.log(clozepremade[count].fullText);
			console.log("False");
			inquirer.prompt([{
				type: "list",
				message: "would you like to see the answer?",
				choices: ["YES", "NO"],
				name: "listanswer"
			}]).then(function(confirm) {
				if (confirm.listanswer === "YES") {
					console.log("The Answer is " + clozepremade[count].cloze);
					if (count < clozepremade.length - 1) {
						count++
						clozeCardGame();
					} else {
						inquirer.prompt([{
							type: "list",
							message: " The Quiz is finished what would you like to do ",
							choices: ["Play Again", "Main Menu", "EXIT"],
							name: "todo"
						}]).then(function(answers) {
							count = 0;
							switch (answers.todo) {
								case "Play Again":
									quiz();
									break;
								case "Main Menu":
									mainmenu();
									break;
								case "EXIT":
									console.log("Thanks for playing come back again");
									break;
							}
						})
					}
				} else {
					if (count < clozepremade.length - 1) {
						count++
						clozeCardGame();
					} else {
						count = 0;
						inquirer.prompt([{
							type: "list",
							message: " The Quiz is finished what would you like to do ",
							choices: ["Play Again", "Main Menu", "EXIT"],
							name: "todo"
						}]).then(function(answers) {
							switch (answers.todo) {
								case "Play Again":
									quiz();
									break;
								case "Main Menu":
									mainmenu();
									break;
								case "EXIT":
									console.log("Thanks for playing come back again");
									break;
							}
						})
					}
				}
			})
		}
	});
}
mainmenu();


// i tried logging the file into a text i managed to do that but using
//fs.appendFile("file.txt",JSON.stringify(card,null,2)), but i did face some problems retrieving it
// by using thre ReadFile i will still work on it to implement it 
// this application will let you create the card that you want and add it to the deck and you can use it in the question 
// wether it was a Cloze case or Basic case