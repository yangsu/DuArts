duarts.on('push', function(path) {
  if (/admin/.test(path)) {
    var deleteItems = [];
    $('#add').click(function() {
      $('.items').append(duarts.template('adminItem'));
    });
    $('.button-negative').click(function(e) {
      var $e = $(e.currentTarget).parent();
      var id = $e.data('id').replace(/\W+/g, '');
      deleteItems.push(id);
      $e.hide('slow');
    });
    $('#save').click(function() {
      $('.items form').each(function(i, e) {
        var $e = $(e);
        var data = $e.serializeArray();
        data = _.reduce(data, function(memo, item) {
          memo[item.name] = item.value;
          return memo;
        }, {});
        if (_.any(data, function(value, key) {
          return value.length > 0;
        })) {
          $.post(location.pathname, data, function(data) {
          });
        }
      });

      _.each(deleteItems, function(id) {
        $.ajax({
          type: 'DELETE',
          url: location.pathname + '/' + id,
          success: function(d) {
          }
        });
      });
      deleteItems = [];
    });
  }
});
