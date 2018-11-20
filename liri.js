//At the top of the `liri.js` file, add code to read and set any environment variables with the dotenv package:
require("dotenv").config();

//Add the code required to import the `keys.js` file and store it in a variable.
var keys = require('./keys.js');
var fs = require("fs");

var action = process.argv[2];
var value = process.argv[3];

//You should then be able to access your keys information like so
var spotify = new Spotify(keys.spotify);