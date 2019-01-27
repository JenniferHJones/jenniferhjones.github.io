$(document).ready(function () {

    var topics = ["Basketball", "Bowling", "Boxing", "Golf", "Skiing", "Karate", "Rowing", "Swimming", "Tennis",
        "Volleyball"];

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

    buttons();

    $("#add-sport").on("click", function (event) {
        event.preventDefault();
        var sport = $("#sport-input").val().trim();
        topics.push(sport);
        buttons();
    });

    $(document).on("click", ".sport-btn", displayImages);

    function displayImages() {
        $("#images").empty();
        var sport = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=UlsGZGJN2JtxEIbf0FazuLxh7m2ASR2x&q=" + sport +
            "+fail&rating=&limit=10";
        var queryURLmore = queryURL + "&offset=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (var i = 0; i < response.data.length; i++) {
                var sportDiv = $("<div>");
                var p = $("<p>").text("Title: " + response.data[i].title + ", " + "Source: " + response.data[i].source_tld
                    + ", " + "Rating: " + response.data[i].rating);
                sportDiv.append(p);
                var image = $("<img data-state='still' class='sport mb-5'>").attr("src",
                    response.data[i].images.fixed_height_still.url);
                image.attr("data-still", response.data[i].images.fixed_height_still.url);
                image.attr("data-animate", response.data[i].images.fixed_height.url);
                sportDiv.append(image);
                $("#images").append(sportDiv);
            }
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
        })
        $(document).on("click", ".moreImages", displayMoreImages);

        function displayMoreImages() {
            $.ajax({
                url: queryURLmore,
                method: "GET"
            }).then(function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    var sportDiv = $("<div>");
                    var p = $("<p>").text("Title: " + response.data[i].title + ", " + "Source: " +
                        response.data[i].source_tld + ", " + "Rating: " + response.data[i].rating);
                    sportDiv.append(p);
                    var image = $("<img data-state='still' class='sport mb-5'>").attr("src",
                        response.data[i].images.fixed_height_still.url);
                    image.attr("data-still", response.data[i].images.fixed_height_still.url);
                    image.attr("data-animate", response.data[i].images.fixed_height.url);
                    sportDiv.append(image);
                    $("#images").append(sportDiv);
                }
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
            });
        }
    };


})