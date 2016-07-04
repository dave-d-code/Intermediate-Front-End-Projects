/* JQuery script to perform AJAX calls to twitch tv....
****** I will try to base this code (at least loosely) around the MVC model.. ******/
/* The MVC idea was kinda working until JS's refusal to wait for AJAX returns kinda messed things up.. but still*/


// This is the user list in an array, including the 2 dud accounts at the end.
var userList = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];

// lets not spank twitch with multiple AJAX calls, here's the http link to do it in 1 go... leave out brunofin & comster404 for now..

var whoIsOnline = "https://api.twitch.tv/kraken/streams?channel=ESL_SC2,OgamingSC2,cretetion,freecodecamp,"; 
	whoIsOnline += "storbeck,habathcx,RobotCaleb,noobs2ninjas,lirik&callback=?";




var tbnCount = 0;  // global variable to count no of thumbnails in each row.. to help with layout.
var notOnlineArray; // will hold the array of who isnt online.

// ***** CONTROLLER SECTION ********************


$(function() {
	
	performAjax(whoIsOnline, function(data) {

		liveView(data, 1, data.streams.length); // if no-one line, this will simply output nothing...
		notOnlineArray = notOnline(data);	// work out who isn't online
		
		for (var i = 0; i < notOnlineArray.length; i++ ) { // i didnt want to do multiple AJAX calls, but i cant find another way.
			performAjax(notOnlineArray[i], function(data2) { // output the rest of offline and deactivated accounts
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
		async : true,
		dataType : "json",
		cache: false, // FU I.E
		crossDomain: false, // FU I.E 
		success : function(data, status, xhr) {
			callback(data);
			
		},
		error : function(error) {
			liveView(error.responseJSON, 3, 1);	
		}
	});

	
}



// produce an array of those not online, and give me back the links to cycle through...
// #TODO keep an eye on this function. buggy one day, working fine the next???
// #TODO was previously missing out the last element on the array..

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

// punch out HTML and append it to the DOM for livestreams and other accounts.
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

		tbnCount++ // to keep track of the no. of thumbnails i am producing. bit naughty for a function to be altering a global, but hey.
		if ((tbnCount % 4) == 0) { // 4 thumbails per row, if over, i want another div.row
			output += '<div><div class="row">';
		}

	}

	// append the output
	$('#output2').append(output);
}