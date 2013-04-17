duarts.on('push', function(path) {
  if (path == '/calendar') {
    $('.toggle').on('toggle', function(e) {
      var $e = $(e.currentTarget);
      var isFeature = $e.hasClass('active');
      var id = $e.data('id').replace(/\W+/g, '');

      $.ajax({
        type: 'POST',
        url: '/event/' + id,
        data: {
          feature: isFeature
        }
      });
    });
  }
});
