$(document).ready(function () {
    var offsetNum = 0;
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=UlsGZGJN2JtxEIbf0FazuLxh7m2ASR2x";
    var topics = ["Basketball", "Bowling", "Boxing", "Golf", "Skiing", "Karate", "Rowing", "Swimming", "Tennis", "Volleyball"];

    // function to dynamically create buttons by looping through the array
    function buttons() {
        $("#buttons").empty();
        for (var i = 0; i < topics.length; i++) {
            var b = $("<button class='btn btn-outline-primary'>");
            b.addClass("sport-btn");
            b.attr("data-name", topics[i]);
            b.text(topics[i]);
            $("#buttons").append(b);
        }
    };

    // function to insert buttons
    buttons();

    // function to create a new button after user clicks submit button
    $("#add-sport").on("click", function (event) {
        event.preventDefault();
        var sport = $("#sport-input").val().trim();
        topics.push(sport);
        buttons();
        $("#images").empty();
    });

    // on click event to run displayImages function
    $(document).on("click", ".sport-btn", displayImages);

    // function with AJAX call to GIPHY API, limited to 10 GIFs returned
    function displayImages() {
        $("#images").empty();
        var sport = $(this).attr("data-name");

        offsetNum = 0;
        queryURL = queryURL + "&q=" + sport + "+fail&rating=&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            generateImagesToView(response.data)
        })
    };

    // function to create images
    function generateImagesToView(data) {
        for (var i = 0; i < data.length; i++) {
            var sportDiv = $("<div>");
            // var p = $("<p>").text("Title:  " + data[i].title + ", " + "Source: " + data[i].source_tld + ", " + "Rating: " + data[i].rating);
            var t = $("<p>").text("Title:  " + data[i].title);
            var s = $("<p>").text("Source: " + data[i].source_tld);
            var r = $("<p>").text("Rating: " + data[i].rating);
            sportDiv.append(t, s, r);
            var image = $("<img data-state='still' class='sport mb-5'>").attr("src", data[i].images.fixed_height_still.url);
            image.attr("data-still", data[i].images.fixed_height_still.url);
            image.attr("data-animate", data[i].images.fixed_height.url);
            sportDiv.append(image);

            $("#images").prepend(sportDiv);
        }
    }

    // on click event to change image state between still to animate
    $("#images").on("click", 'div > img', function () {
        console.log("click");
        var state = $(this).attr("data-state");
        if (state === "still") {
            var animateURL = $(this).attr("data-animate");
            $(this).attr('src', animateURL);
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', "still");
        }
    });

    // on click event to run displayMoreImages function
    $(document).on("click", ".moreImages", displayMoreImages);

    // function to append 10 more GIFs to page, different images called each time function runs
    function displayMoreImages() {
        offsetNum += 10;
        console.log(offsetNum);

        var queryUrlAgain = queryURL + "&offset=" + offsetNum;
        console.log(queryUrlAgain);

        $.ajax({
            url: queryUrlAgain,
            method: "GET"
        }).then(function (response) {
            generateImagesToView(response.data)
        });
    }
});