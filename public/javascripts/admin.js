var templates = {};

function tmpl(templateName) {
  var path = '/javascripts/templates/' + templateName + '.html';

  return (function(context) {
    if (!templates[path]) {
      $.ajax({
        url: path,
        async: false
      }).then(function(contents) {
        return templates[path] = _.template(contents);
      });
    }
    return templates[path](context);
  });
}

$(function() {
  var deleteItems = [];
  $('#add').click(function() {
    $('.items').append(tmpl('adminItem'));
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
      $.post(location.pathname, data, function(data) {
      });
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
});
