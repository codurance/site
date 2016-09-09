function getLsccMeetups(){
	var $textElement = $('<textarea/>');
	var apiEndpoint = 'https://api.meetup.com/london-software-craftsmanship/events?photo-host=public&page=3&sig_id=70197872&fields=plain_description&sig=c6bec32c7f1d44610ea27ef6576ea66c81ec314c';
	var source   = (($textElement.html($("#entry-template").html())).text());
	var template = Handlebars.compile(source);
	
	$.ajax({
	     type : "GET",
	     dataType : "jsonp",
	     url : apiEndpoint,
	     success: function(data){
				$(data.data).each(function(i, lscc_event){
					lscc_event.time = new Date(lscc_event.time).toDateString();
					lscc_event.description = lscc_event.plain_text_description.substring(0,300) + "...";
					var eventHtml = template(lscc_event);
					$("#lssc_events").append($textElement.html(eventHtml).text());
				});
				if($(data.data)){
					$("#lssc_events").html("<li><h2>We're still planning a Meetup</h2></li>");
				}
	     		}
	});
}
