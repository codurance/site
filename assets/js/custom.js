var Contact = function () {

    return {

        //Map
        initMap: function () {
					var map;
					$(document).ready(function(){
						if ( $( "#map" ).length ) {
							map = new GMaps({
								div: '#map',
								lat: 51.5175641,
								lng: -0.097832
							  });
							var marker = map.addMarker({
								lat: 51.5175641,
								lng: -0.097832,
					            title: 'Codurance Ltd'
					          });
						}

					});
        }

    };
}();

$(document).ready(function() {  
    console.log("The document is ready sir!");
  $('.owl-carousel').owlCarousel({
    loop:true,
    autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            margin: 20
        },
        600:{
            items:3,
            margin: 30
        },
        1000:{
            items:6,
            margin: 40
        }
    }
  });

    $('#services-button').click(function(){
	var scrollableElement = getFirstScrollableElement(['html','body']);
	
	scrollableElement.animate({
	    scrollTop: $('#services').offset().top
	}, 600);
    });

    function getFirstScrollableElement(elements){
	var element;

	while(element = elements.pop()){
	    $element = $(element);

	    if($element.scrollTop() > 0) return $element;

	    if($element.scrollTop(1).scrollTop() > 0) return $element.scrollTop(0);
	}

	return $();
    }
});
