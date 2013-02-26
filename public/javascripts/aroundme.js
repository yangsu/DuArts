$(document).ready(function() {
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

  $.getJSON('/markers', function(markers) {
    $.getJSON('/events', function(events) {
      _.each(events, function(event) {
        var locId = event.location;
        var loc = markers[locId];
        if (locId && loc) {
          map.addMarker({
            lat: loc.lat,
            lng: loc.lng,
            title: loc.markerName,
            click: function(e) {
              alert('You clicked in this marker');
            }
          });
        }

      });

    });
  });
});
