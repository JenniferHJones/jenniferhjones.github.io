// Link routes to data source
var existingUsers = require("../data/friends");

// ============== Routes ==============
module.exports = function (app) {

    // API GET request
    app.get("/api/friends", function (req, res) {
        res.json(existingUsers);
    });

    // API POST Request - add compatability function here
    app.post("/api/friends", function (req, res) {
        // new user's survey POST
        var newUser = req.body;
        console.log("New post=", newUser);

        var lowestCompScore = 9999;
        var bestMatch = {
            name: "",
            photo: ""
        }

        // loop through existing users
        for (var existingUsersIdx = 0; existingUsersIdx < existingUsers.length; existingUsersIdx++) {

            var currentScore = 0;
            //compare each existing user with new user by looping through the score 0 to 9
            for (var scoreIdx = 0; scoreIdx < 10; scoreIdx++) {
                // modify current score here
                currentScore = currentScore + Math.abs(newUser.scores[scoreIdx] - existingUsers[existingUsersIdx].scores[scoreIdx]);
            }
            // Best match becomes user with lowest comparable score
            if (currentScore < lowestCompScore) {
                lowestCompScore = currentScore;
                bestMatch.name = existingUsers[existingUsersIdx].name;
                bestMatch.photo = existingUsers[existingUsersIdx].photo;
            }
        }
        console.log(bestMatch);

        existingUsers.push(newUser);
        res.json(bestMatch);
    });
}
