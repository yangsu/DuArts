duarts.on('push', function(path) {
  if (path == '/aroundme') {
    $('#map').css('height', ($(window).height() - 43) + 'px');

    var map = new GMaps({
      div: '#map',
      lat: 36.0001922,
      lng: -78.937401
    });

    GMaps.geolocate({
      success: function(position) {
        var lat = position.coords.latitude,
            lng = position.coords.longitude;
        map.setCenter(lat, lng);
        map.drawOverlay({
          lat: lat,
          lng: lng,
          content: '<div class="overlay">You are here<div class="overlay_arrow below"></div></div>'
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

    $.getJSON('/events', function(events) {
      var coords = _.chain(events)
        .pluck('location')
        .pluck('coordinate')
        .compact()
        .value();
      _.each(coords, function(coord) {
        map.addMarker({
          lat: coord.lat,
          lng: coord.lng,
          title: coord.markerName,
          click: function(e) {
            alert('You clicked in this marker');
          }
        });
      });
    });
  }
});

