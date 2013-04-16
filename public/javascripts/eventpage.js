duarts.on('push', function(path) {
  if (/\/event\/([a-z0-9]+)/.test(path)) {
    $.getJSON(path + '/location', function(data) {
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
