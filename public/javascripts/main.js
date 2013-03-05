
window.duarts = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function() {
    console.log('Hello from Backbone!');
  }
};

$(document).ready(function() {
  duarts.init();
  new FingerBlast('body');
});
