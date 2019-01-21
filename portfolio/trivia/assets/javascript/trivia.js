$(document).ready(function () {

    // function to hide unnecessary variables once page loads
    $("#choice1").hide();
    $("#choice2").hide();
    $("#startOver").hide();

    // questions array using objects
    var questions = [
        {
            question: "A group of ravens is called...",
            answer: "An unkindness",
            choices: ["A murder", "An unkindness"],
        },
        {
            question: "The fortune cookie was invented in...",
            answer: "America",
            choices: ["America", "China"],
        },
        {
            question: "The plastic covering on the tip of a shoelace is called...",
            answer: "An aglet",
            choices: ["A grommet", "An aglet"],
        },
        {
            question: "This animal is known to kill more people than plane crashes…",
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
            answer: "It contains every letter of the English alphabet.",
            choices: ["It appears in a popular children’s book.", "It contains every letter of the English alphabet."],
        },
        {
            question: "The most popular boy’s first name in the world is…",
            answer: "Muhammed",
            choices: ["David", "Muhammed"],
        },
        {
            question: "Canine is to dogs as ursine is to...",
            answer: "Bears",
            choices: ["Bears", "Pigs"],
        },
        {
            question: "Espadrilles are...",
            answer: "Sandals",
            choices: ["Sandals", "A savory snack"],
        },
        {
            question: "Titan is this planet's largest moon...",
            answer: "Saturn",
            choices: ["Jupiter", "Saturn"],
        },
    ]

    var questionCount = 0;
    var timer;
    var intervalID;
    var correctAnswer = 0;
    var incorrectAnswer = 0;
    var unanswered = 0;

    // game reset function
    function resetGame() {
        correctAnswer = 0;
        incorrectAnswer = 0;
        unanswered = 0;
        questionCount = 0;
        $("#startOver").hide();
        $("#question").show();
    };

    // start game
    $("#start").click(startGame);

    // function to run when start button is clicked
    function startGame() {
        $("#start").hide();
        displayQuestion();
    };

    function displayQuestion() {
        timer = 5;
        intervalID = setInterval(displayTime, 1000);
        $("#timeUp").hide();
        $("#timer").show();
        $("#timer").html("Seconds Remaining: " + timer);
        $("#question").html(questions[questionCount].question);
        $("#choice1").show();
        $("#choice2").show();
        $("#choice1").html(questions[questionCount].choices[0]);
        $("#choice2").html(questions[questionCount].choices[1]);
        console.log(questions[questionCount].answer);

        /* attempted to record user's click
        var button;
        var s = questions[questionCount];

        for (var i = 0; i < s.choices.length; i++) {
            button = $(s.choices[i]);
            button.on("click", userAnswer);
        }
        */
    };

    /* tried to create function to register user's click and add to correct or incorrect answer score
    function userAnswer() {
        if (questionCount < questions.length) {
            var userClick = $(this).attr("data-value");
            if (userClick === questions[questionCount].answer) {
                $("#displayAnswer").html("Correct!");
                correctAnswer++;
            } else {
                $("#displayAnswer").html("Sorry! The correct answer was" + questions[questionCount].answer);
                incorrectAnswer++;
            }
            questionCount++;
            setTimeout(displayQuestion, 5000);
        } else {
            setTimeout(displayScore, 5000);
        }
    };
    */

    // function to decrease timer by 1 with if statement
    function displayTime() {
        timer--;
        $("#timer").html("Seconds Remaining: " + timer);
        if (timer === 0) {
            clearInterval(intervalID);
            displayAnswer();
            $("#timer").hide();
            $("#choice1").hide();
            $("#choice2").hide();
            $("#timeUp").show();
        }
    };

    // Error - couldn't figure out how to hide answer from previous question when game advanced to next question
    function displayAnswer(userAnswer) {
        $("#displayAnswer").show();
        $("#displayAnswer").html(questions[questionCount].answer);

        if (userAnswer === undefined) {
            $("#timeUp").show();
            $("#timeUp").html("Time is up!");
            unanswered++;
        } else if (userAnswer === questions[questionCount].answer) {
            correctAnswer++;
        } else {
            incorrectAnswer++;
        }

        questionCount++;
        if (questionCount < questions.length) {
            setTimeout(displayQuestion, 3000);
        } else {
            setTimeout(displayScore, 3000);
        }
    };

    // function to display user's score
    function displayScore () {
        $("#displayAnswer").hide();
        $("#timeUp").hide();
        $("#question").hide();
        $("#startOver").show();
        $("#displayScore").html("Game Over!"); 
        $("#correct").html("Correct Answers:  " + correctAnswer);
        $("#incorrect").html("Incorrect Answers:  " + incorrectAnswer); 
        $("#unanswered").html("Unanswered:  " + unanswered);
    }

    // start game over
        $("#startOver").click(function() {
            $("#wrapper").hide();
            $("#displayScore").hide();
            resetGame();
            startGame();
        });
})