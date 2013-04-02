duarts.on('push', function(path) {
  var match = path.match(/\/event\/([a-z0-9]+)/)
  if (match && match.length) {
    $.getJSON('/eventlocation/' + match[1], function (data) {
      var loc = data.location.coordinate;
      if (loc) {
        var map = new GMaps({
          div: '#map',
          lat: loc.lat || 36.0001922,
          lng: loc.lng || -78.93740
        });
        map.addMarker({
          lat: loc.lat || 36.0001922,
          lng: loc.lng || -78.937401,
          title: loc.markerName,
          click: function(e) {
          }
        });
      }

    });
  }
});