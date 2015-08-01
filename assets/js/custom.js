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

  $(".case-study-carousel").owlCarousel({

      navigation : true, // Show next and prev buttons
      slideSpeed : 300,
      pagination: false,
      paginationSpeed : 400,
      singleItem:true

      // "singleItem:true" is a shortcut for:
      // items : 1,
      // itemsDesktop : false,
      // itemsDesktopSmall : false,
      // itemsTablet: false,
      // itemsMobile : false

  });

  $(".dropdown").click(function(){
    return true;
  });

});
