$(document).ready(function () {

    // on click function to display Register modal if Register button clicked
    document.getElementById("navRegister").addEventListener("click", function () {
        document.querySelector(".bg-modal-reg").style.display = "flex";
    });
    // on click function to hide Register modal if x is pressed
    document.querySelector(".closeReg").addEventListener("click", function () {
        document.querySelector(".bg-modal-reg").style.display = "none";
    });
    // on click function to display Login modal if Register button clicked
    document.getElementById("navLogin").addEventListener("click", function () {
        document.querySelector(".bg-modal-login").style.display = "flex";
    });
    // on click function to hide Login modal if x is pressed
    document.querySelector(".closeLogin").addEventListener("click", function () {
        document.querySelector(".bg-modal-login").style.display = "none";
    });

    // Function to run when user clicks Logout button in navbar
    $("#navLogout").click(userLogOut);

    function userLogOut() {
        console.log("logout clicked");
        firebase.auth().signOut();
        $("#choicesDiv").hide();
        $("#intro").show();
    };

    // Firebase setup
    var config = {
        apiKey: "AIzaSyAXBHM2-Rfs25DdM3vmaGK3CDbjGlZMkQM",
        authDomain: "cravings-7c8a8.firebaseapp.com",
        databaseURL: "https://cravings-7c8a8.firebaseio.com",
        projectId: "cravings-7c8a8",
        storageBucket: "cravings-7c8a8.appspot.com",
        messagingSenderId: "928328970018"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    function displayChoices() {
        $("#choicesDiv").show();
        $("#loginDiv").hide();
        $("#registerDiv").hide();
    }

    // Function to run based on if user is logged in or not
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            displayChoices();
            $("#intro").hide();
            console.log("it's been called")
        } else {
            // No user is signed in.
            userLogOut();
        }
    });

    // Function to register a new user
    $(".register form").on("submit", function (event) {
        event.preventDefault();

        var email = $(".register .email").val();
        var password = $(".register .password").val();

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function (user) {
                console.log(user);
            })
            .catch(function (err) {
                console.log(err);
            })
        document.querySelector(".bg-modal-reg").style.display = "none";

    });

    // Function to login existing user
    $(".login form").on("submit", function (event) {
        event.preventDefault();

        var email = $(".login .email").val();
        var password = $(".login .password").val();

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function (user) {
                console.log(user);
            })
            .catch(function (err) {
                console.log(err);
            });
        document.querySelector(".bg-modal-login").style.display = "none";
    });

})
