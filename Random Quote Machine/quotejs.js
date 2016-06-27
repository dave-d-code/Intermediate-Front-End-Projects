

// Jquery code to 
// 1. connect with a random quote API...
// 2. send API as a tweet on twitter. 

$(function() {
	$('#msg-btn').on('click', function() { // event handler when button clicked
		$.getJSON("http://api.icndb.com/jokes/random" , function(json) {

			var html = "";

			
				html += '<blockquote><p id="inner_msg">';
				html += json.value.joke;
				html += "</p></blockquote>";
			

			$('#message-box').html(html);
		});
	});


});


// {"type":"success",
// "value":{"id":422,
// 		"joke":"Mr. T pities the fool. Chuck Norris rips the fool's head off.",
// 		"categories":[]}
// }