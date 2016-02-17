var http = require('http'),
	https = require('https');

var API_KEY = ""; // Get your own forecast.io API key and plug it in here first!

function printWeather(report) {
	console.log(report.daily.summary);
}

function printError(error) {
	console.log(error.message);
}

function getWeather(coordinates){
	var request = https.get("https://api.forecast.io/forecast/" + API_KEY + "/" + coordinates, function(response) {
		var body = "";
		response.on('data', function(chunk) {
			body += chunk;
		});
		response.on('end', function() {
			if(response.statusCode === 200) {
				try {
					var report = JSON.parse(body);
					printWeather(report);
				} catch(error) {
					printError(error);
				}
			} else {
				printError({message: "There was an error getting the weather for " + coordinates + ". Please check your coordinates and try again. (" + http.STATUS_CODES[response.statusCode] + ")"});
			}
		})
	});
}

getWeather(process.argv.slice(2));