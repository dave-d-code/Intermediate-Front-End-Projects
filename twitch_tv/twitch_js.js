// need AJAX function to experiment with calls.

var output;


$(function() {

	$('#hit').click(function() {
		console.log('i heard hit');
		searchTwitch();
	});


});

function searchTwitch () {
	
	var http_string1 = "https://api.twitch.tv/kraken/streams/freecodecamp?callback=?";
	var http_string2 = "https://api.twitch.tv/kraken/streams?game=StarCraft+II&callback=?";
	var http_string3 = "https://api.twitch.tv/kraken/streams?channel=freecodecamp,sheevergaming,OgamingSC2&callback=?" // works, no info returned for 
	var http_string4 = "https://api.twitch.tv/kraken/streams?game=StarCraft+II&limit=2&callback=?";
	var http_string5 = "https://api.twitch.tv/kraken/streams?channel=freecodecamp,storbeck,terakilobyte&stream_type=playlist&callback=?"; // should be offline
	var http_string6 = "https://api.twitch.tv/kraken/streams?channel=comster404&callback=?" // account closed...
	var http_string7 = "https://api.twitch.tv/kraken/users/freecodecamp"; // user gives logos at least
	var http_string8 = "https://api.twitch.tv/kraken/users/OgamingSC2";
	var http_string9 = "https://api.twitch.tv/kraken/channel/freecodecamp";
	var http_string10 = "https://api.twitch.tv/kraken/channels/freecodecamp"; // this might be it to test for account status
	var http_string11 = "https://api.twitch.tv/kraken/channels/brunofin";
	var http_string12 = "https://api.twitch.tv/kraken/channels?channel=freecodecamp";
	var http_string13 = "https://api.twitch.tv/kraken/streams?channel=ESL_SC2,OgamingSC2,cretetion,freecodecamp,";
		http_string13 += "storbeck,habathcx,RobotCaleb,noobs2ninjas&callback=?";


	$.ajax({
		type : "GET",
		url : http_string13,
		async : false,
		dataType : "json",
		success : function(data) {
			$('#outputView').html(JSON.stringify(data));
			output = data;
		},
		error : function(error) {
			$('#outputView').html('that account is fffff');
		}
	});

}

// console.log(output);