/* JQuery script to perform AJAX calls to twitch tv....
****** I will try to base this code (at least loosely) around the MVC model.. ******/


// This is the user list in an array, including the 2 dud accounts at the end.
var userList = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404", "harry", "jon"];

// lets not spank twitch with multiple AJAX calls, here's the http link to do it in 1 go... leave out brunofin & comster404 for now..

var whoIsOnline = "https://api.twitch.tv/kraken/streams?channel=ESL_SC2,OgamingSC2,cretetion,freecodecamp,"; 
	whoIsOnline += "storbeck,habathcx,RobotCaleb,noobs2ninjas,lirik&callback=?";

	// take out lirik

var outputer;
var tbnCount = 0;  // for use later...
var notOnlineArray;

// ***** CONTROLLER SECTION ********************


$(function() {
	
	performAjax(whoIsOnline, function(data) {
		liveView(data, 1, data.streams.length); // needs to check if anyone online???? anyoneThere?
		notOnlineArray = notOnline(data);
		
		for (var i = 0; i < notOnlineArray.length; i++ ) {
			performAjax(notOnlineArray[i], function(data2) {
			liveView(data2, 2, 1);
			});
		}
		

	});

});



// ************** MODEL SECTION ******************

// perform the ajax call depending on the string being passed.
// pass back the data for processing.
function performAjax(http_string, callback) {
	var dataModel;

	$.ajax({
		type : "GET",
		url : http_string,
		async : false,
		dataType : "json",
		success : function(data, status, xhr) {
			callback(data);
			
		},
		error : function(error) {
			var outputerstr = $.parseJSON(error.responseText);
			liveView(outputerstr, 3, 1);
		}
	});

	
}

// check that the initial livestream data call doesnt return an emtpy array
// ie no one online
function anyoneThere(data) {
	if (data.streams.length > 0) {
		return true;
	} else {
		return false;
	}
}

// produce an array of those not online, and give me back the links to cycle through...
// #TODO there is a bug here, where i am losing the last element of the array.
// #TODO even more bizarrely, i cant alter i < data.streams.length, as i then lose
// the scope of the data.streams[i].channel.display_name variables....
// this could cause me to start hating JS.

function notOnline (data){
	var notOnline = userList;
	var name, namePosition;
	
	for (var i = 0; i < data.streams.length; i++) {
		name = data.streams[i].channel.display_name;
		namePosition = notOnline.indexOf(name); // basically see where the online name occurs in user list.
		notOnline.splice(namePosition, 1); // remove that name from the list leaving offline members.
	};


	return $.map(notOnline, function(n) {
		return 'https://api.twitch.tv/kraken/channels/' + n;
	});
	
}

// ******************* VIEW SECTION **************************

// punch out HTML and append it to the DOM for livestreams
function liveView (data, isOnline, outputCount) {
	var output = '';
	var outputImage, outputName, outputGame, outputStatus, outputUrl, onlineStatus;
	


	for (var i =0; i < outputCount; i++) {

		switch (isOnline) {
			case 1: // is online
				onlineStatus = 'online';
				outputImage = data.streams[i].preview.medium; // this is the online screen capture
				outputName = data.streams[i].channel.display_name; // this is the display name
				outputGame = data.streams[i].channel.game; // this is what they are doing
				outputStatus = data.streams[i].channel.status;
				outputUrl = data.streams[i].channel.url;
				break;
			case 2: // is offline
				onlineStatus = 'offline';
				outputImage = data.logo; // this is the online screen capture
				outputName = data.display_name; // this is the display name
				outputGame = data.game; // this is what they are doing
				outputStatus = data.status;
				outputUrl = data.url;
				break;
			case 3: // is deactivated
				onlineStatus = 'deactivated';
				outputImage = 'https://pbs.twimg.com/profile_images/528573622349484032/xvmxB3Kd_400x400.jpeg';
				outputName = ''; 
				outputGame = data.message; 
				outputStatus = '';
				outputUrl = '';
				break;
		}


		output += '<div class="col-md-3"><div class="thumbnail ' +  onlineStatus + '">';
		output += '<img src="' + outputImage + '" alt="online screen">'; 
		output += '<div class="caption"><h3>' + outputName + '</h3>'; 
		output += '<p>' + outputGame + ' : ' + outputStatus + '</p>'; 
		output += '<p class="text-center"><a href="' + outputUrl + '" class="btn btn-primary" role="button">'; // their link
		output += outputName + ' on Twitch</a></p></div></div></div>';

		tbnCount++ // to keep track of the no. of thumbnails i am producing. bit naughty for a fun to be altering a global, but hey.
		if ((tbnCount % 4) == 0) { // 4 thumbails per row, if over, i want another div.row
			output += '<div><div class="row">';
		}

	}

	// append the output
	$('#output2').append(output);
}