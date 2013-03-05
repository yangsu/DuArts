duarts.on('push', function(path) {
  if (path == '/calendar') {
    $('#calendar').datepicker();
  }
});
