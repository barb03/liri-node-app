require('dotenv').config();
var keys = require("./keys.js");

// var Twitter = required('twitter');
var spotify = require('spotify');
// var spotify = new Spotify(keys.spotify);
var request = require('request');
var fs = require('fs');

// var getMyTweets = function(){
// 	var client = new Twitter(keys.twitterKeys);
// 	var params = {screen_name: 'inrtracker'};
// 	client.get('statuses/user_timeline', params, function(error, tweets, response){
// 		if('error'){
// 			for(var i=0; i<tweets.length; i++){
// 				console.log(tweets[i].created_at);
// 				console.log('');
// 				console.log(tweets[i].text);
// 			}
// 		}
// 	});
// }

// var getArtistNames = function(artist){
// 	return artist.name;
// }

 var getMySpotify = function(songName){
	spotify.search({ type: 'track', query: songName }, function(err, data) {
		if ( err ) {
			console.log('Error occurred: ' + err);
			return;
		}
	 
	   console.log(data);
	   var songs = data.tracks.items;
	   for(var i=0; i<songs.length; i++){
		   console.log(i);
		   console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
		   console.log('song name: ' + songs[i].name);
		   console.log('preview song: ' + songs[i].preview_url);
		   console.log('album: ' + songs[i].album.name);
		   console.log('----------------------------------------------------');
	   }
	});
 }

 var getMyMovie = function(movieName){
	request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=trilogy', function (error, response, body) {
		if(!error && response.statusCode == 200){
			var jsonData = JSON.parse(body);
			console.log('Title: ' + jsonData.Title);
			console.log('Year: ' + jsonData.Year);
			console.log('Rated: ' + jsonData.Rated);
			console.log('IMDB Rating: ' + jsonData.imdbRating);
			console.log('Country: ' + jsonData.Country);
			console.log('Language: ' + jsonData.Language);
			console.log('Plot: ' + jsonData.Plot);
			console.log('Actors: ' + jsonData.Actors);
			console.log('Rotten Tomatoes Rating: ' + jsonData.tomatoeRating);
			console.log('Rotting Tomatoes URL: ' + jsonData.tomatoURL);			
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
	// 	case 'my-tweets':
	// 		getMyTweets();
	// 		break;
		case 'spotify-this-song':
			getMySpotify(functionData);
			break;
		case 'movie-this':
			getMyMovie(functionData);
			break;
		case 'do-what-it-says':
			doWhatItSays();
			break;
		default:
			console.log('Liri does not know that');
	}
}
var runThis = function(argOne, argTwo){
	pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);

