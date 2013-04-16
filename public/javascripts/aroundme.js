duarts.on('push', function(path) {
  if (path == '/aroundme') {
    $('#map').css('height', ($(window).height() - 43) + 'px');

    var map = new GMaps({
      div: '#map',
      lat: 36.0001922,
      lng: -78.937401
    });

    var infoWindow = new google.maps.InfoWindow({});

    GMaps.geolocate({
      success: function(position) {
        var lat = position.coords.latitude,
            lng = position.coords.longitude;
        map.setCenter(lat, lng);
        map.drawOverlay({
          lat: lat,
          lng: lng,
          content: '<div class="me-marker"></div>'
        });
      },
      error: function(error) {
        alert('Geolocation failed: '+error.message);
      },
      not_supported: function() {
        alert("Your browser does not support geolocation");
      },
      always: function() {
        // alert("Done!");
      }
    });

    $.getJSON('/events.json', function(events) {
      var es = _.chain(events)
        .map(function(event) {
          return {
            id: event._id,
            name: event.summary,
            location: event.location,
            start: event.start.date,
            end: event.end.date
          };
        })
        .filter(function(event) {
          return event.location && event.location.coordinate;
        })
        .value();
      _.each(es, function(event) {
        var coord = event.location.coordinate;
        map.addMarker({
          lat: coord.lat,
          lng: coord.lng,
          title: coord.markerName,
          click: function(point) {
            var start = new Date(event.start);
            var end = new Date(event.end);
            var now = new Date();
            var day = 1000*60*60*24;

            var dateLabel;

            if (start.getTime() <= now.getTime() - day &&
                end.getTime() >= now.getTime() + day) {
                dateLabel = 'ongoing';
            } else {
                dateLabel = start.toLocaleDateString() + ' - ' + start.toLocaleTimeString();
            }

            infoWindow.setContent(event.name + '<br>' + dateLabel + '<br><a href="/event/'+ event.id + '" data-transition="slide-in">Go to Event Page</a>');
            infoWindow.setPosition(point.position);
            infoWindow.open(map.map);
          }
        });
      });
    });
  }
});

