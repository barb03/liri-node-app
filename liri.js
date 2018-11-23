// variables and requires
require('dotenv').config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var spotify = new Spotify(keys.spotify);
var request = require('request');
var fs = require('fs');
var moment = require('moment');
var chalk = require('chalk');

// function to get my tweets
var getMyTweets = function(){
	var client = new Twitter(keys.twitter);	
	var screenName = {screen_name: '@MustangSalliee'};		
	client.get('statuses/user_timeline', screenName, function(error, tweets, response){		
		if(!error){			
			for(var i=0; i<tweets.length; i++){
				console.log(tweets[i].created_at);				
				console.log(tweets[i].text);
				console.log(chalk.magenta('----------------------------------------------------'));
				// to log the results to log.txt
				var twitterResults = 
					"@" + tweets[i].user.screen_name + ': ' + 
					tweets[i].text + '\r\n' + 
					tweets[i].created_at + '\r\n' + 
					'------------------------------ ' + i + ' ------------------------------' + '\r\n';					
					log(twitterResults); 					
			}		
		}
		else{
			console.log(error);
		}		
	});	
}

// function to get the artist name from the api array
var getArtistNames = function(artist){
	return artist.name;
}
// function to input The Sign if there is no input from the user
 var getMySpotify = function(songName){
	if(!songName){
		songName = '"The Sign" Ace of Base';
		console.log(songName);
	}
	spotify.search({type: 'track', query: songName}, function(err, data) {
		if (err) {
			console.log(err);
			return;
		}		
	   var songs = data.tracks.items;
	   for(var i=0; i<songs.length; i++){
		var songLog = data.tracks.items;
		   console.log(i);
		   console.log(chalk.green('----------------- Song Information -----------------'));		  
		   console.log('Artist(s): ' + songs[i].artists.map(getArtistNames));		      
		   console.log('Song Name: ' + songs[i].name);
		   console.log('Album: ' + songs[i].album.name);		   
		   if(songs[i].preview_url == null){
				console.log('preview song is not available.')				
		   }
		   else{
				console.log('preview song: ' + songs[i].preview_url);
		   }
// to log the results to log.txt
		   var spotifyResults =
						'Artist: ' + songLog[i].artists[0].name + '\r\n' +
						'Song: ' + songLog[i].name + '\r\n' +
						'Album the song is from: ' + songLog[i].album.name + '\r\n' +
						'Preview Url: ' + songLog[i].preview_url + '\r\n' + 
						'------------------------------ ' + i + ' ------------------------------' + '\r\n';						
						log(spotifyResults); 
	   }	   
	});	
 }

//  function to input Mr. Nobody if there is no input from the user
 var getMyMovie = function(movieName){	
	if(!movieName){
		movieName = 'Mr. Nobody';
		console.log(movieName);
		console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
	}	
	request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=trilogy', function (error, response, body) {		
		if(!error && response.statusCode == 200){				
			var jsonData = JSON.parse(body);
			console.log(chalk.green('-------------------- Movie Data --------------------'));
			console.log('Title: ' + jsonData.Title);
			console.log('Year: ' + jsonData.Year);
			console.log('Rated: ' + jsonData.Rated);
			console.log('IMDB Rating: ' + jsonData.imdbRating);				
			console.log('Country: ' + jsonData.Country);
			console.log('Language: ' + jsonData.Language);
			console.log(chalk.cyan('----------------------- Plot -----------------------'));
			console.log('Plot: ' + jsonData.Plot);
			console.log(chalk.magenta('---------------------- Actors ----------------------'));
			console.log('Actors: ' + jsonData.Actors);	
			console.log(chalk.yellow('------------------ Rotten Tomatoes ------------------'));		
			console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value);
// to log the results to log.txt
			var movieResults =
				'------------------------------ Movie Data ------------------------------' + '\r\n' +
				'Title: ' + jsonData.Title +'\r\n' +
				'Year: ' + jsonData.Year + '\r\n' +
				'IMDB Rating: ' + jsonData.Rated + '\r\n' +
				'Country: ' + jsonData.Country + '\r\n' +
				'Language: ' + jsonData.Language + '\r\n' +
				'Plot: ' + jsonData.Plot + '\r\n' +
				'Actors: ' + jsonData.Actors + '\r\n' +
				'Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value + '\r\n' +				
				'---------------------------- End Movie Data ----------------------------' + '\r\n';				
				log(movieResults); 
		}
		else{
			console.log(error);
		}		
	});
 }

//  function to input Kiss if there is no input from the user
 var getConcert = function(venue){
	if(!venue){
		venue = 'Kiss';
		console.log(venue);
	}
// request from api 
		request('https://rest.bandsintown.com/artists/' + venue + '/events?app_id=codingbootcamp', function(error, response, body){
		console.log(venue);		 
		 if(!error){			
			 var result = JSON.parse(body);
			 for(i=0; i<result.length;i++){
			 console.log(chalk.magenta('-------------------- Concert Data --------------------'));
			 console.log('Artist Searched: ' + venue);			
			 console.log('Venue Name: ' + result[i].venue.name);
			 console.log('Venue Location: ' + result[i].venue.city);
			 console.log('Date of Event: ' + moment(result[i].datetime).format("MM/DD/YYYY"));				 
//  to log the results to log.txt
			 var concertResults =
				'------------------------------------------------------------' + '\r\n' +
				'Artist Searched: ' + venue + '\r\n' +
				'Venue Name: ' + result[i].venue.name + '\r\n' +
				'Venue Location: ' + result[i].venue.city + '\r\n' +
				'Date of Event: ' + moment(result[i].datetime).format("MM/DD/YYYY") + '\r\n';								
				log(concertResults); 
			 }
		 }
		 else{
			 console.log(error);
		 }
	 });
 }
 
// function to read from random.txt and input to the console 
 function doWhatItSays(){
	fs.readFile('random.txt', 'utf8', function(err, data){
		if (err){ 
			return console.log(err);
		}
		var dataArr = data.split(',');
		if(dataArr.length == 2){
			pick(dataArr[0], dataArr[1]);			
		}
		else if(dataArr.length == 1){
			pick(dataArr[0]);
		}
	});
}

// switch function for the different calls
var pick = function(caseData, functionData){	
	switch(caseData){
		case 'my-tweets':
			getMyTweets();					
			break;
		case 'spotify-this-song':
			getMySpotify(functionData);
			break;
		case 'movie-this':
			getMyMovie(functionData);
			break;
		case 'do-what-it-says':
			doWhatItSays();
			break;
		case 'concert-this':
			getConcert(functionData);
			break;
		default:
			console.log('Liri does not know that');
	}
}

// function to log the results to log.txt
function log(logResults) {
	fs.appendFile("log.txt", logResults, (error) => {
	  if(error) {
		throw error;
	  }
	});
  }

//   function to get the inputs from the user
var runThis = function(argOne, argTwo){
	pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);
 


  

