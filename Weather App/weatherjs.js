/* Jquery code to compliment weather app... Steps will be.....
* 1. Get the user location.
* 2. Modify co-ordinates and use that to get weather data from JSON API.
* 3. Use info in JSON api to load up images.
* 4. Use info in JSON to toggle C to F. */

var is_celsius = true;
var temperature;


$(function() {

	if (navigator.geolocation) {
  		navigator.geolocation.getCurrentPosition(function(position) {
    		get_weather(position.coords.latitude, position.coords.longitude);
  		});
	} else {
		$('#error').html('No location data.. No weather data dude!');
	}

	$('#temp').click(function() {
		change_temp(temperature);
	});



	


});

function get_weather(lat, longit) {
	var lat_cords = "lat=" + String(lat).substring(0, 5);
	var long_cords = "&lon=" + String(longit).substring(0, 5);
	var http_string = "http://api.openweathermap.org/data/2.5/weather?" + lat_cords + long_cords + "&units=metric&APPID=d651d137bb54b8f84de822226f5f526d";

	// make a JSON request to openweathermap.org
	$.getJSON(http_string, function(json) {

		$('#location').html(json.name); // set the location
		$('#conditions').html(json.weather[0].description); // set the local weather
		$('#temp').html(json.main.temp + " ° Celsius"); // set the temp
		temperature = json.main.temp;
		var file = json.weather[0].icon.substring(0, 2); // use icon to set our own background jumbotron picture
		var url = 'url(http://tropicalmoonlight.us/FCC/weather_images/' + file + '.jpg)';
		$('#weather_bg').css('background-image', url);
	});
}

function change_temp(temp) {
	if (is_celsius) {
		var fahrenheit = (temp * 9/5) + 32;
		$('#temp').html(fahrenheit.toFixed(1) + " ° Fahrenheit");
		$('#change').html('Click on temp to change to Celsius');
		temperature = fahrenheit;
		is_celsius = false;
	} else {
		var celsius = (temp - 32) * 5/9;
		$('#temp').html(celsius.toFixed(1) + " ° Celsius");
		$('#change').html('Click on temp to change to Fahrenheit');
		temperature = celsius;
		is_celsius = true;
	}
}




