// variables 
var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var win = 0;
var loss = 0;
var guessLeft = 9;
var guesses = [];
var computerSelect = [];

// computer makes random letter selection
var computerChoice = letters[Math.floor(Math.random() * letters.length)];
computerSelect.push(computerChoice);
console.log(computerSelect[0]);

// function to log user's guess 
document.onkeydown = function (event) {
    var userGuess = event.key;
    guesses.push(userGuess);

    // compares user's guess against computer's choice and adds 1 to win and resets guesses left and guesses 
    if (guesses.length === 9) {
        loss++;
        guessLeft = 9;
        guesses.length = 0;
        computerSelect.length = 0;
        var computerChoice = letters[Math.floor(Math.random() * letters.length)];
        computerSelect.push(computerChoice);
        console.log(computerSelect[0]);
    }
    
    else if ((userGuess === computerSelect[0]) && (guessLeft > 0)) {
        win++;
        guessLeft = 9;
        guesses.length = 0;
        computerSelect.length = 0;
        var computerChoice = letters[Math.floor(Math.random() * letters.length)];
        computerSelect.push(computerChoice);
        console.log(computerSelect[0]);
    }
    // or subtracts 1 from guesses left if user didn't guess correctly
    else if ((userGuess !== computerSelect[0]) && (guessLeft > 0)) {
        guessLeft--;
    }
   
    // or adds 1 to loss if neither of the above is true & resets guesses left and guesses
    else {
        loss++;
        guessLeft = 9;
        guesses.length = 0;
        computerSelect.length = 0;
        var computerChoice = letters[Math.floor(Math.random() * letters.length)];
        computerSelect.push(computerChoice);
        console.log(computerSelect[0]);
    }

    // updates page with wins, losses, etc.
    document.getElementById("win").innerHTML = "Wins: " + win;
    document.getElementById("loss").innerHTML = "Losses: " + loss;
    document.getElementById("guessLeft").innerHTML = "Guesses left: " + guessLeft;
    document.getElementById("guesses").innerHTML = "Your guesses so far: " + guesses;
}