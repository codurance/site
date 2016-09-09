function getLsccMeetups(){
	var $textElement = $('<textarea/>');
	var apiEndpoint = 'https://api.meetup.com/Restarters-London/events?photo-host=public&page=3&sig_id=70197872&fields=plain_text_description&sig=a22300fd35fe388b3d8396babea82e4a5cb7e43e';
	var source   = (($textElement.html($("#entry-template").html())).text());
	var template = Handlebars.compile(source);
	console.log("getting lscc meetups");
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
			
	     		}
	});
}
