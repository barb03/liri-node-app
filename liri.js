require('dotenv').config();

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var spotify = new Spotify(keys.spotify);
var request = require('request');
var fs = require('fs');
var moment = require('moment');
var chalk = require('chalk');

var getMyTweets = function(){
	var client = new Twitter(keys.twitter);	
	var screenName = {screen_name: '@MustangSalliee'};		
	client.get('statuses/user_timeline', screenName, function(error, tweets, response){
		if(!error){
			for(var i=0; i<tweets.length; i++){
				console.log(tweets[i].created_at);				
				console.log(tweets[i].text);
				console.log(chalk.magenta('----------------------------------------------------'));
			}		
		}
		else{
			console.log(error);
		}
	});
}

var getArtistNames = function(artist){
	return artist.name;
}

 var getMySpotify = function(songName){
	if(!songName){
		songName = '"The Sign" Ace of Base';
		console.log(songName);
	}
	spotify.search({ type: 'track', query: songName }, function(err, data) {
		if (err) {
			console.log(err);
			return;
		}		

	   var songs = data.tracks.items;
	   for(var i=0; i<songs.length; i++){
		   console.log(i);
		   console.log(chalk.green('----------------- Song Information -----------------'));		  
		   console.log('artist(s): ' + songs[i].artists.map(getArtistNames));		      
		   console.log('song name: ' + songs[i].name);
		   console.log('album: ' + songs[i].album.name);		   
		   if(songs[i].preview_url == null){
				console.log('preview song is not available.')				
		   }
		   else{
				console.log('preview song: ' + songs[i].preview_url);
		   }	   
	   }	   
	});	
 }

 var getMyMovie = function(movieName){	
	if(!movieName){
		movieName = 'Mr. Nobody';
		console.log(movieName);
	}	
	request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=trilogy', function (error, response, body) {		
	if(!error && response.statusCode == 200){			
			// console.log(body);
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
		}
		else{
			console.log(error);
		}		
	});
 }

 var getConcert = function(artist){
	 request('https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp', function(error, response, body){
		 if(!error){
			 var result = JSON.parse(body)[0];
			 console.log(chalk.magenta('-------------------- Concert Data --------------------'));
			 console.log('Venue Name: ' + result.venue.name);
			 console.log('Venue Location: ' + result.venue.city);
			 console.log('Date of Event: ' + moment(result.datetime).format("MM/DD/YYYY"));			 
		 }
		 else{
			 console.log(error);
		 }
	 });
 }

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
			getConcert();
			break;
		default:
			console.log('Liri does not know that');
	}
}



var runThis = function(argOne, argTwo){
	pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);

