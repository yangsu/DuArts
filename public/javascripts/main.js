
window.duarts = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Templates: {},
  triggerRoute: function() {
    var path = window.location.pathname;
    duarts.trigger('push', path);
  },
  template: function(templateName) {
    var path = '/javascripts/templates/' + templateName + '.html';

    return (function(context) {
      if (!duarts.Templates[path]) {
        $.ajax({
          url: path,
          async: false
        }).then(function(contents) {
          return duarts.Templates[path] = _.template(contents);
        });
      }
      return duarts.Templates[path](context);
    });
  }
};

_.extend(duarts, Backbone.Events);

window.addEventListener('push', duarts.triggerRoute);

duarts.on('push', function(path) {
  if (path == '/' || /^\/(venues|galleries)$/.test(path)) {
    var index = 0;
    var sliders = $('.slider ul');
    var count = sliders.children().length;
    var sliderWidth = sliders.find('li').get(0).offsetWidth;
    setInterval(function() {
      index = (index + 1) % count;
      var offsetX = (-index) * sliderWidth;
      sliders.css({
        '-webkit-transition-duration': '.5s',
        webkitTransform: 'translate3d(' + offsetX + 'px,0,0)'
      });
    }, 3000);
  }
});

$(function() {
  duarts.triggerRoute();
});
