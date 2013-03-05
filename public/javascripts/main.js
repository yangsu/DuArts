
window.duarts = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function() {
    console.log('Hello from Backbone!');
  },
  triggerRoute: function() {
    var path = window.location.pathname;
    duarts.trigger('push', path);
  }
};

_.extend(duarts, Backbone.Events);

$(document).ready(function() {
  duarts.init();
  duarts.triggerRoute();
  new FingerBlast('body');
});
