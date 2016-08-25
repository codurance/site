function initMap () {
    var coordinates = {'lat': 51.523876,'lng': -0.100533};
    var map = new google.maps.Map(document.getElementById('map'), {
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

