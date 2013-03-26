duarts.on('push', function(path) {
  if (path == '/calendar') {
    $('#calendar').datepicker();
  }

  $.getJSON('/events', function(events) {
    var transformed = _.map(events, function (event) {
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
        description: event.description
      };
    });

  });
});
