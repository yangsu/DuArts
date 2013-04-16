
window.duarts = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function() {
  },
  triggerRoute: function() {
    var path = window.location.pathname;
    duarts.trigger('push', path);
  }
};

_.extend(duarts, Backbone.Events);

window.addEventListener('push', duarts.triggerRoute);

duarts.on('push', function(path) {
  if (path == '/') {
  }
});

$(document).ready(function() {
  duarts.init();
  duarts.triggerRoute();
  // new FingerBlast('body');

  var genN = function(selector) {
    var e = $(selector);
    return function() {
      e.toggleClass('hidden');
    };
  };
  $('a.expand').each(function(i, a) {
    var $a = $(a);
    var targetSelector = $a.data('target');
    $a.click(genN(targetSelector));
  });
});
