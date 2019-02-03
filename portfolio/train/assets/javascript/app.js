$(document).ready(function () {

    // initialize Firebase
    var config = {
        apiKey: "AIzaSyAS2hCzuDydxISQ5g7eM7zBOtgWbkvcVjA",
        authDomain: "jj-s-project.firebaseapp.com",
        databaseURL: "https://jj-s-project.firebaseio.com",
        projectId: "jj-s-project",
        storageBucket: "",
        messagingSenderId: "91412721795"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    // on click function for adding a new train
    $("#add-train").on("click", function () {
        event.preventDefault();

        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrainTime = $("#firstTime").val().trim();
        var frequency = $("#frequency").val().trim();
        console.log("clicked");

        // object to save user's entries to Firebase db
        database.ref().push({
            name: trainName,
            destination: destination,
            time: firstTrainTime,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        })
    });

    var currentTime = moment().format("LT");
    $("#currentTime").append(currentTime);
    console.log("current time", currentTime);

    // current time
    var now = moment();

    // interval to refresh the page every minute
    setInterval(function () {
        window.location.reload();
    }, 60000);

    // calling values from Firebase
    database.ref().on("child_added", function (db) {
        console.log("child_added");
        var dbObj = db.val();
        console.log("user's input", dbObj.time);

        // create moment.js object for train time
        var startTime = moment(dbObj.time, "HH:mm");
        console.log("start time: ", startTime.format("HH:mm"));

        // change frequency string into a number
        var trainFrequency = parseInt(dbObj.frequency);
        console.log("frequency", trainFrequency);

        // calculate diffference between now and the start time minus frequency to get remainder
        var minutesAway = trainFrequency - now.diff(startTime, "minutes") % trainFrequency;
        console.log("minutes away", minutesAway);

        // calculate next train's arrival by adding above calculation to now
        var nextArrival = moment().add(minutesAway, "minutes");
        console.log("arrival", nextArrival.format("hh:mm A"));

        var key = db.key;

        // create new row to store the data & append it
        var newRow = $("<tr>");
        newRow.append($("<td>" + dbObj.name + "</td>"));
        newRow.append($("<td>" + dbObj.destination + "</td>"));
        newRow.append($("<td>" + dbObj.frequency + "</td>"));
        newRow.append($("<td>" + nextArrival.format("hh:mm A") + "</td>"));
        newRow.append($("<td>" + minutesAway + "</td>"));
        newRow.append($("<td><button class='remove btn btn-success btn-sm' data-key='" + key + "'>X</button></td>"));

        // append new row
        $("tbody").append(newRow);

    }, function (e) {
        alert(e)
    });

    // on click function to remove train entry from page & Firebase
    $(document).on("click", ".remove", function () {
        keyref = $(this).attr("data-key");
        database.ref().child(keyref).remove();
        window.location.reload();
    });
})