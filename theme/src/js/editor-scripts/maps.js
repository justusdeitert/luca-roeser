window.refreshGap = true;

window.googleMapInstances = {};

window.initMaps = () => {

    document.querySelectorAll('.map-block__map').forEach(map => {

        let address = map.dataset.markerAddress;
        let markerURL = map.dataset.markerUrl;
        let zoomLevel = parseInt(map.dataset.zoomLevel);
        let mapId = map.dataset.mapId;

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

                window.googleMapInstances[mapId] = new google.maps.Map(map, {
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
                    map: window.googleMapInstances[mapId],
                    title: address,
                    icon: markerURL
                });
            }
        });
    })
}
