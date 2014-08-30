var Contact = function () {

    return {
        
        //Map
        initMap: function () {
			var map;
			$(document).ready(function(){
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
			});
        }

    };
}();