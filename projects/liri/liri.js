/* Require & global variables */
require("dotenv").config();
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var timestamp = moment();
var divider = "\n\===========================================\n";
var validCommands = "* concert-this\n* spotify-this-song\n* movie-this\n* do-what-it-says";

/* Command line arguements entered by user */
const command = process.argv[2];
const query = process.argv.slice(3);

/* If statements to execute commands based on user input */
if (command === "movie-this") {
    movie(query);
} else if (command === "spotify-this-song") {
    song(query);
} else if (command === "concert-this") {
    concert(query.join("+"));
} else if (command === "do-what-it-says") {
    doIt();
} else if (command === undefined) {
    console.log("Please enter one of the following commands:\n" + validCommands);
} else {
    console.log("Invalid command. Please use one of the following commands:\n" + validCommands);
}

/* ---------------------------------Bands in Town API using Axios---------------------------------*/
/* Function to respond to concert-this command */
function concert(artist) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + keys.bandCamp.code;

    /* Default band if user fails to input a band */
    if (!artist) {
        queryUrl = "https://rest.bandsintown.com/artists/imagine+dragons/events?app_id=" + keys.bandCamp.code;
    }

    // console.log(queryUrl);
    console.log(timestamp.format("YYYY-MM-DD HH:mm") + "\n");

    axios.get(queryUrl).then(
        function (response) {
            /* Logs how many band results found */
            console.log(`LIRI found ${response.data.length} results`)

            for (var i = 0; i < response.data.length; i++) {
                // console.log(response.data);
                output = `${divider}
                    * Lineup: ${response.data[i].lineup}
                    * Venue name: ${response.data[i].venue.name}
                    * Venue location: ${response.data[i].venue.city}, ${response.data[i].venue.country}
                    * Event Date: ${moment(response.data[i].datetime).format("MM/DD/YYYY")}`
                console.log(output);
                logIt(output);
            }
        },
        function (error) {
            console.log(error);
        });
}

/* ---------------------------------Spotify API using npm package---------------------------------*/
/* Function to respond to spotify-this-song command */
function song(input) {
    /* Default song if user fails to input a song */
    if (!input[0]) {
        input = "The Sign";
    }
    /* Logs what song was searched */
    console.log(`LIRI searched for ${input}\n`);
    
    spotify.search({ type: 'track', query: input }, function (error, data) {
        var songs = data.tracks.items;
        /* Logs how many results were found*/
        console.log(`\nLIRI found ${data.tracks.items.length} results\n`)

        if (error) {
            console.log(`Error occurred: ${error}`);
        } else {
            for (var i = 0; i < data.tracks.items.length; i++) {
                output = `${divider}* Artist name: ${songs[i].artists[0].name}\n* Song name: ${songs[i].name}\n* Album name: ${songs[i].album.name}\n* Song URL: ${songs[i].preview_url}`
                console.log(output);
                logIt(output);
            }
        }
    });
}

/* ---------------------------------OMDB API---------------------------------*/
/* Function to respond to movie-this command */
function movie(title) {
    /* Default movie if user fails to input a movie */
    if (!title[0]) {
        title = "Mr. Nobody";
    };

    var queryUrl = "http://www.omdbapi.com/?t=" + title + "&apikey=" + keys.omdb.code;

    axios.get(queryUrl).then(
        function (response) {
            // console.log(response.data);
            output = divider +
                "* Title of the movie: " + response.data.Title + "\n" +
                "* Year the movie came out: " + response.data.Year + "\n" +
                "* IMDB Rating of the movie: " + response.data.Ratings[0].Value + "\n" +
                "* Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value + "\n" +
                "* Country where the movie was produced: " + response.data.Country + "\n" +
                "* Language: " + response.data.Language + "\n" +
                "* Plot: " + response.data.Plot + "\n" +
                "* Actors: " + response.data.Actors
            console.log(output);
            logIt(output);
        },
        function (error) {
            console.log(error);
        });
}

/* Function to respond to do-what-it-says command */
function doIt() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArray = data.split(",");
        // console.log(data);
        song(dataArray[1]);
    });
}

/* Function to append LIRI command results to log.txt file */
function logIt(data) {
    fs.appendFile("log.txt", timestamp.format("YYYY-MM-DD HH:mm") + "\n" + (data), function (error) {
        if (error) {
            return console.log(error);
        }
    });
    fs.appendFile("log.txt", "\r\n", function (error) {
        if (error) {
            return console.log(error);
        }
        console.log("Log file updated");
    });
}