$(document).ready(function () {

    // Function to run when user clicks Register button in navbar
    $("#navRegister").click(displayRegister);

    function displayRegister() {
        console.log("register clicked");
        $("#registerDiv").show();
        $("#loginDiv").hide();
        $("#choicesDiv").hide();
        $("#intro").hide();
    }

    // Function to run when user clicks Login button in navbar
    $("#navLogin").click(displayLogin);

    function displayLogin() {
        console.log("login clicked");
        $("#loginDiv").show();
        $("#registerDiv").hide();
        $("#choicesDiv").hide();
        $("#intro").hide();
    }

    // Function to run when user clicks Logout button in navbar
    $("#navLogout").click(userLogOut);

    function userLogOut() {
        console.log("logout clicked");
        firebase.auth().signOut();
        $("#choicesDiv").hide();
        $("#loginDiv").hide();
        $("#registerDiv").hide();
        $("#intro").show();
    };

    $("#showLogin").click(displayLogin);

    $("#showRegister").click(displayRegister);

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
    });

    // function validate() {
    //     // to validate email addresses entered, this API works!
    //     var email;
    //     var queryURL = "http://apilayer.net/api/check?access_key=079da406e2f7aaa1714f04c3adcc3efc&email=" + email + "&smtp=1&format=1"

    //     $.ajax({
    //         url: queryURL,
    //         method: "GET",
    //     }).then(function (response) {
    //         console.log(response);
    //     });
    // };

})
