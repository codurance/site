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
});
