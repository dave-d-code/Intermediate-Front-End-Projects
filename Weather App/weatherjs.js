/* Jquery code to compliment weather app... Steps will be.....
* 1. Get the user location.
* 2. Modify co-ordinates and use that to get weather data from JSON API.
* 3. Use info in JSON api to load up images.
* 4. Use info in JSON to toggle C to F. */

var varDump;

$(function() {

	if (navigator.geolocation) {
  		navigator.geolocation.getCurrentPosition(function(position) {
    		$("#my_position").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
  		});
	}

	$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=42.13&lon=24.74&units=metric&APPID=d651d137bb54b8f84de822226f5f526d", function(json) {
		varDump = json;
		var html = json.weather[0].main;
		var icon = json.weather[0].icon;
		var temp = json.main.temp;
		console.log(varDump);
		$('#weather').append(html);
		$('#weather-icon').attr("src", "http://openweathermap.org/img/w/" + icon + ".png");
		$('#temp').append(temp);

	});


});




