duarts.on('push', function(path) {
  if (/admin/.test(path)) {
    new FingerBlast('.admin');
  }
  if (/\/admin\/(Venue|Organization|Gallery|Performance|Studio)/.test(path)) {
    var deleteItems = [];
    var add = function() {
      $('.items').append(duarts.template('adminItem'));
    };
    $('#add').on({
      'click': add,
      'touchend': add
    });
    var negative = function(e) {
      var $e = $(e.currentTarget).parent();
      var id = $e.data('id').replace(/\W+/g, '');
      deleteItems.push(id);
      $e.hide('slow');
    };
    $('.button-negative').on({
      'click': negative,
      'touchend': negative
    });

    var save = function() {
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
          var id = $e.data('id');
          id = !!id ? ('/' + id.replace(/\W+/g, '')) : '';
          $.post(location.pathname + id, data, function(data) {
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
    };
    $('#save').on({
      'click': save,
      'touchend': save
    });
  }
});
