$(document).ready(function() {
  var map = new GMaps({
    div: '#map',
    lat: 36.0001922,
    lng: -78.937401
  });

  $.getJSON('/markers', function(markers) {
    $.getJSON('/events', function(events) {
      _.each(events, function(event) {
        var loc = event.location;
        if (loc) {
          console.log(markers[loc]);
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
