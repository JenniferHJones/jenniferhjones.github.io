$(document).ready(function () {
    // array for initial buttons
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
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=UlsGZGJN2JtxEIbf0FazuLxh7m2ASR2x&q=" + sport + "+fail&rating=&limit=10";
        var offsetNum = 0;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            // for loop through the returned GIFs, dynamically insert them, and display title, source, and rating
            for (var i = 0; i < response.data.length; i++) {
                var sportDiv = $("<div>");
                // var p = $("<p>").text("Title:  " + response.data[i].title + ", " + "Source: " + response.data[i].source_tld + ", " + "Rating: " + response.data[i].rating);          
                var t = $("<p>").text("Title:  " + response.data[i].title);
                var s = $("<p>").text("Source: " + response.data[i].source_tld);
                var r = $("<p>").text("Rating: " + response.data[i].rating);            
                sportDiv.append(t,s,r);
                var image = $("<img data-state='still' class='sport mb-5'>").attr("src", response.data[i].images.fixed_height_still.url);
                image.attr("data-still", response.data[i].images.fixed_height_still.url);
                image.attr("data-animate", response.data[i].images.fixed_height.url);
                sportDiv.append(image);
                $("#images").append(sportDiv);
            }

            // function for on click event to change GIF from still to animated
            function state() {
                $(".sport").on("click", function () {
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
            }
            // run function for initial 10 GIFs
            state();

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
                    for (var i = 0; i < response.data.length; i++) {
                        var sportDiv = $("<div>");
                        var p = $("<p>").text("Title:  " + response.data[i].title + ", " + "Source: " + response.data[i].source_tld + ", " + "Rating: " + response.data[i].rating);
                        sportDiv.append(p);
                        var image = $("<img data-state='still' class='sport mb-5'>").attr("src", response.data[i].images.fixed_height_still.url);
                        image.attr("data-still", response.data[i].images.fixed_height_still.url);
                        image.attr("data-animate", response.data[i].images.fixed_height.url);
                        sportDiv.append(image);
                        $("#images").append(sportDiv);
                    }
                    // run function for newly added GIFs
                    state();
                });
            }
        })
    };
})