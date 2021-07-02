window.refreshGap = true;

console.log('lol');

window.initMaps = () => {

    document.querySelectorAll('.map-block__map').forEach(map => {

        let address = map.getAttribute('data-marker-address');
        let markerURL = map.getAttribute('data-marker-url');
        let zoomLevel = parseInt(map.getAttribute('data-zoom-level'));
        let stylesArray = [
            {
                stylers: [
                    {
                        lightness: -5
                    }
                ]
            }
        ];

        // https://developers.google.com/maps/documentation/javascript/geocoding
        let geocoder = new google.maps.Geocoder();

        geocoder.geocode({'address': address}, (results, status) => {
            if (status === 'OK') {
                let coordinates = {
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()
                }

                let mapInstance = new google.maps.Map(map, {
                    center: coordinates,
                    zoom: zoomLevel,
                    styles: stylesArray,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                    scrollwheel: false
                });

                // https://developers.google.com/maps/documentation/javascript/markers?hl=de
                let marker = new google.maps.Marker({
                    position: coordinates,
                    map: mapInstance,
                    title: address,
                    icon: markerURL
                });
            }
        });
    })
}
