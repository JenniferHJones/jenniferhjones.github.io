$(document).ready(function () {

    // variables
    var winTotal = 0;
    var lossTotal = 0;
    var counter = 0;
    var audio = new Audio("./assets/Tada.mp3");

    // computer displays random number between 19 - 120
    var numberDisplay = Math.floor((Math.random() * 102) + 19);
    $("#randomNumber").html(numberDisplay);
    console.log(numberDisplay);
    
    reset();

    // function to reset game after playing a round
    function reset() {
        counter = 0;
        $("#counter").html(counter);
        numberDisplay = Math.floor((Math.random() * 102) + 19);
        $("#randomNumber").html(numberDisplay);
        console.log(numberDisplay);
        randomCrystal1 = Math.floor((Math.random() * 12) + 1);
        randomCrystal2 = Math.floor((Math.random() * 12) + 1);
        randomCrystal3 = Math.floor((Math.random() * 12) + 1);
        randomCrystal4 = Math.floor((Math.random() * 12) + 1);
        console.log(randomCrystal1, randomCrystal2, randomCrystal3, randomCrystal4);
    };

    // function for winning game
    function win() {
        winTotal++;
        $("#win").html(winTotal);
        audio.play();
        alert("You won! Let's play again.");
        reset();
    }

    // function for losing game
    function lose() {
        lossTotal++;
        $("#loss").html(lossTotal);
        alert("No win this time. Try again!");
        reset();
    }

    // on click function for crystals with if statement for counter action
    $("#crystal1").click(function () {
        counter = counter + randomCrystal1;
        $("#counter").html(counter);
        if (counter === numberDisplay) {
            win();
        } else if (counter > numberDisplay) {
            lose();
        } else;
    });

    $("#crystal2").on("click", function () {
        counter = counter + randomCrystal2;
        $("#counter").html(counter);
        if (counter === numberDisplay) {
            win();
        } else if (counter > numberDisplay) {
            lose();
        }
    });

    $("#crystal3").on("click", function () {
        counter = counter + randomCrystal3;
        $("#counter").html(counter);
        if (counter === numberDisplay) {
            win();
        } else if (counter > numberDisplay) {
            lose();
        }
    });

    $("#crystal4").on("click", function () {
        counter = counter + randomCrystal4;
        $("#counter").html(counter);
        if (counter === numberDisplay) {
            win();
        } else if (counter > numberDisplay) {
            lose();
        }
    });


});