

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

	$('#tweet-btn').on('click', function() {
		var link = "https://twitter.com/intent/tweet?text=";
		var quote = $('#inner_msg').html().replace(/[ ]/g, '%20');
		$('#tweet-btn').attr({"href":link + quote, "target":"_blank"});
	
	});


});

