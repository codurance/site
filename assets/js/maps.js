function initMap () {
    var map = document.getElementById('map');
    var lat = parseFloat(map.getAttribute('data-lat'));
    var lon = parseFloat(map.getAttribute('data-lon'));
    var coordinates = {'lat': lat,'lng': lon};
    var map = new google.maps.Map(map, {
        zoom: 17,
        center: coordinates,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var marker = new google.maps.Marker({
        position: coordinates,
        map: map,
        title: 'Codurance Ltd'
    });
}

