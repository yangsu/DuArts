duarts.on('push', function(path) {
  var transformed;
  if (path == '/calendar') {
    $('#calendar').datepicker({
       onSelect: function(){
       var dateclick = $('#calendar').datepicker("getDate");
       alert(dateclick);
       }
    });
  }

/*  $('#calendar').bind('onSelect', function() {
     var dateclick = $('#calendar').datepicker("getDate");
     alert(dateclick);
  });
*/

  $.getJSON('/events', function(events) {
     transformed = _.map(events, function (event) {
      return {
        id: event._id,
        name: event.summary,
        date: {
          start: {
            date: event.start.shortdate,
            time: event.start.time
          },
          end: {
            date: event.end.shortdate,
            time: event.end.time
          }
        },
        description: event.description,
        loc: {
            address: event.location.address,
            link: event.location.link
        }
      };
    });

  });

});