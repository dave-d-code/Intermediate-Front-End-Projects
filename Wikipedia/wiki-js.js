/* Jquery to 
* 1. search wiki from a search box 
* 2. have button for random wiki entry  */



$(function() {
	$('#submit').click(function() {
		search_wiki($('#searchBox').val());
		
	});

	$("#searchBox").keydown(function(event) {
		if (event.keyCode == 13) {
    		search_wiki($('#searchBox').val());
		}
	});

	$(document).on('click', ".panel", function() {
        $(this).find("a")[0].click(); 
	});

	

});

function search_wiki(searchTerm) {

	var output;
	var http_string = "https://en.wikipedia.org/w/api.php?action=opensearch&search=";
	http_string += searchTerm;
	http_string += "&format=json&callback=?" /// callback=? needed to prevent this pain in the ass CORS stuff.

	// make the ajax call
	$.ajax({
		type : "GET",
		url : http_string,
		async : false,
		dataType: "json",
		success : function(data) {
			output_results(data);
		},
		error : function(error) {
			console.log(error);
		}
	});
		
}
	
function output_results(data) {
	var outputStr;
	$('#searchQuery').html("You searched for: <em>" + data[0] + "</em>");
	$('#outputStream').empty(); // clear the previous results
	$.each(data[1], function(index, value) {
		outputStr = '<div class="panel panel-info"><div class="panel-heading"><h3 class="panel-title">';
		outputStr += value;
		outputStr += '</h3></div><div class="panel-body">';
		outputStr += data[2][index];
		outputStr += '</div><div class="panel-footer"><a href="';
		outputStr += data[3][index];
		outputStr += '" class="thisLink" target="_blank">To go to the Wiki page, click anywhere in the panel</a></div>';
		$('#outputStream').append(outputStr);
		hover_effect();
	});


	
}


function hover_effect() {
	$('.panel').on({
		mouseenter: function() {
			$(this).css("border", "yellow solid 3px");
		},
		mouseleave: function() {
			$(this).removeAttr('style');
		}	
	});
}





  
