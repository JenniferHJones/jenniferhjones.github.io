// Dependencies
var express = require("express");
var path = require("path");

// Set up Express App
var app = express();
var PORT = process.env.PORT || 8080;

// Middleware to set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "/app/public")));

// Routes
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// Start the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });