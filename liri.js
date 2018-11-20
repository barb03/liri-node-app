
// var spotify = require('spotify');
var request = require('request');
var fs = require('fs');
var keys = require("./keys.js");

var inputCommand = process.argv[2];
var commandParam = process.argv[3];
var defaultMovie = "Mr. Nobody";
var axios = require('axios');


function processCommands(command, commandParam){

	console.log(commandParam);

	switch(command){	
	
	case 'movie-this':		
		if(commandParam === undefined){
			commandParam = defaultMovie;
		}    
		movieThis(commandParam); break;
	case 'do-what-it-says':
		doWhatItSays(); break;
	default: 
		console.log("That is not a valid command");
    }
}

function movieThis(movieName){    
	console.log(movieName);
	axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log("The movie's rating is: " + response.data.imdbRating);
  });

}

function doWhatItSays(){
	fs.readFile('random.txt', 'utf8', function(err, data){

		if (err){ 
			return console.log(err);
		}

		var dataArr = data.split(',');

		processCommands(dataArr[0], dataArr[1]);
	});
}



//-------------------------MAIN PROCESS-------------------------------------------

processCommands(inputCommand, commandParam);