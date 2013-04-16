duarts.on('push', function(path) {
  if (path == '/calendar') {
    var input = $('#calendar').pickadate({
      clear: false,
      today: false,
      onSelect: displayEventsForDate,
      onStart: displayEventsForDate
    });
    var calendar = input.data('pickadate');
    var eventsContainer = $('#events');

    var dateToEvent;
    $.getJSON('/events', function(events) {
      dateToEvent = _.reduce(events, function(memo, event) {
        var date = event.start.shortdate;
        if (memo[date]) {
          memo[date].push(event);
        } else {
          memo[date] = [event];
        }
        return memo;
      }, {});
      var d = new Date;
      calendar.setDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
      displayEventsForDate();
    });

    function displayEventsForDate() {
      if (!dateToEvent) return;
      var date = calendar.getDate('m/d/yy');

      var events = dateToEvent[date];
      var content = duarts.template('calendarEventList')({
        date: date,
        events: events
      });
      eventsContainer.html(content);
    }
  }
});
