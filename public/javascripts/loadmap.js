duarts.on('push', function(path) {
  if (/\/(venues|galleries|event)\/([a-z0-9]+)/.test(path)) {
    $.getJSON(path + '/location', function(loc) {
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