function listLsccMeetups(){	
	executeApiRequest(displayEvents);
}

function executeApiRequest(callback){
	var apiEndpoint = 'https://api.meetup.com/london-software-craftsmanship/events?photo-host=public&page=3&sig_id=70197872&fields=plain_text_description&sig=23964a489b632a356d3a23aaafa95dd93fb0d1b3';
	$.ajax({
	     type : "GET",
	     dataType : "jsonp",
	     url : apiEndpoint,
	     success: function(data){
				callback(data.data);
			}
	});
}

function displayEvents(data){
	var $eventsTimelineElement = $("#lssc_events");
	var $textElement = $('<textarea/>');
	var source   = (($textElement.html($("#entry-template").html())).text());
	var template = Handlebars.compile(source);

	$(data).each(function(i, lscc_event){
		lscc_event.time = new Date(lscc_event.time).toDateString();
		lscc_event.description = lscc_event.plain_text_description.substring(0,300) + "...";
		var eventHtml = template(lscc_event);
		$eventsTimelineElement.append($textElement.html(eventHtml).text());
	});

	if(!$(data) || $(data).length == 0){
		displayDefaultMessage($eventsTimelineElement);
	}
}

function displayDefaultMessage(eventsTimelineElement){
	eventsTimelineElement.html("<li><h2>We are still planning the next meetup, come back soon for more!</h2></li>");
}
