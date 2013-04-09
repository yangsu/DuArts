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

  $('#add').click(function() {
    $('.items').append(tmpl('adminItem'));
  });
  $('#save').click(function() {
    $('.items form').each(function(i, e) {
      var $e = $(e);
      var data = $e.serializeArray();
      data = _.reduce(data, function(memo, item) {
        memo[item.name] = item.value;
        return memo;
      }, {});
      // if ($e.data('id')) {
      //   data._id = $e.data('id');
      // }
      $.post(location.pathname, data, function(data) {
      });
    });

  });
});
