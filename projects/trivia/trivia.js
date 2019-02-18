$(document).ready(function () {
    // questions array using objects
    var questions = [
        {
            question: "A group of ravens is called...",
            answer: "an unkindness",
            choices: ["a murder", "an unkindness"],
        },
        {
            question: "The fortune cookie was invented in...",
            answer: "America",
            choices: ["America", "China"],
        },
        {
            question: "The plastic covering on the tip of a shoelace is called...",
            answer: "an aglet",
            choices: ["a grommet", "an aglet"],
        },
        {
            question: "This animal is known to kill more people than plane crashes.",
            answer: "Donkey",
            choices: ["Rattlesnake", "Donkey"],
        },
        {
            question: "The Great Wall of China is visible from outer space.",
            answer: "False",
            choices: ["False", "True"],
        },
        {
            question: "'The quick brown fox jumps over a lazy dog' is famous because…",
            answer: "it contains every letter of the English alphabet.",
            choices: ["it appears in a popular children’s book.", "it contains every letter of the English alphabet."],
        },
        {
            question: "The most popular boy’s first name in the world is…",
            answer: "Muhammed",
            choices: ["David", "Muhammed"],
        },
        {
            question: "Canine is to dogs as ursine is to...",
            answer: "bears",
            choices: ["bears", "pigs"],
        },
        {
            question: "Espadrilles are...",
            answer: "sandals",
            choices: ["sandals", "a savory snack"],
        },
        {
            question: "Titan is this planet's largest moon.",
            answer: "Saturn",
            choices: ["Jupiter", "Saturn"],
        },
    ]

    // function run immediately to set answer variables to 0 and show/hide divs
    resetGame();

    var timer;
    var intervalID;
    var currentAnswer;

    // game reset function
    function resetGame() {
        correctAnswer = 0;
        incorrectAnswer = 0;
        unanswered = 0;
        questionCount = 0;
        $("#startOver").hide();
        $("#question").show();
        $("#choice1").hide();
        $("#choice2").hide();
    };

    // start game
    $("#start").click(startGame);

    // function to run when start button is clicked
    function startGame() {
        $("#start").hide();
        displayQuestion();
    };

    $(".choices").click(handleClick);

    function handleClick(event) {
        var userChoice = $(this).attr("data-value");
        console.log(userChoice, currentAnswer, userChoice === currentAnswer);
        currentAnswer = questions[questionCount].answer;

        if (userChoice === currentAnswer) {
            $("#displayAnswer").show();
            $("#displayAnswer").html("Correct!<br>" + questions[questionCount].answer);
            $("#choice1").hide();
            $("#choice2").hide();
            correctAnswer++;
            console.log("correct answer score: " + correctAnswer);
        } else {
            $("#displayAnswer").show();
            $("#displayAnswer").html("Sorry! The correct answer was...<br>" + questions[questionCount].answer);
            $("#choice1").hide();
            $("#choice2").hide();
            incorrectAnswer++;
            console.log("incorrect answer score: " + incorrectAnswer);
        } 
        interval();
    };

    function interval() {
        clearInterval(intervalID);
        questionCount++;
        if (questionCount < questions.length) {
            setTimeout(displayQuestion, 3000);
        } else {
            setTimeout(displayScore, 3000);
        }
    }

    function displayQuestion() {
        timer = 10;
        intervalID = setInterval(displayTime, 1000);
        $("#displayAnswer").empty();
        $("#timeUp").hide();
        $("#timer").show();
        $("#timer").html("Seconds Remaining: " + timer);
        $("#question").html(questions[questionCount].question);
        $("#choice1").show();
        $("#choice2").show();
        $("#choice1").html(questions[questionCount].choices[0]);
        $("#choice2").html(questions[questionCount].choices[1]);
        $("#choice1").attr("data-value", questions[questionCount].choices[0])
        $("#choice2").attr("data-value", questions[questionCount].choices[1])
        currentAnswer = questions[questionCount].answer;
    };

    // function to decrease timer by 1 with if statement
    function displayTime() {
        timer--;
        $("#timer").html("Seconds Remaining: " + timer);
        if (timer === 0) {
            unanswered++;
            console.log("unanswered total: "+unanswered);
            clearInterval(intervalID);
            $("#timeUp").show();
            $("#timeUp").html("Time is up!");
            $("#displayAnswer").show();
            $("#displayAnswer").html(questions[questionCount].answer);
            $("#timer").hide();
            $("#choice1").hide();
            $("#choice2").hide();
            interval();
        }
    };

    // function to display user's score
    function displayScore() {
        $("#timer").hide();
        $("#displayAnswer").hide();
        $("#timeUp").hide();
        $("#question").hide();
        $("#startOver").show();
        $("#displayScore").show();
        $("#displayScore").html("Game Over!");
        $("#wrapper").show();
        $("#correct").html("Correct Answers:  " + correctAnswer);
        $("#incorrect").html("Incorrect Answers:  " + incorrectAnswer);
        $("#unanswered").html("Unanswered:  " + unanswered);
    }

    // start game over
    $("#startOver").click(function () {
        $("#wrapper").hide();
        $("#displayScore").hide();
        resetGame();
        startGame();
    });
})