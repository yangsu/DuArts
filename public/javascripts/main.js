
window.duarts = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function() {
    console.log('Hello from Backbone!');
  }
};

_.extend(duarts, Backbone.Events);

$(document).ready(function() {
  duarts.init();
  new FingerBlast('body');
});
