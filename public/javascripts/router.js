window.addEventListener('push', function() {
  var path = window.location.pathname;
  duarts.trigger('push', path);
});
