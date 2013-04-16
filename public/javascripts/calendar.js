$(function() {
  var calendar = $('#calendar');
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
    displayEventsForDate(new Date);
  });

  function toShortDate(date) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear().toString().slice(-2);
    return month + '/' + day + '/' + year;
  }

  function displayEventsForDate(date) {
    if (!dateToEvent) return;

    date = toShortDate(date);
    var events = dateToEvent[date];
    var content = duarts.template('calendarEventList')({
      date: date,
      events: events
    });
    eventsContainer.html(content);
  }

  $('#calendar').datepicker({
    onSelect: function() {
      var date = calendar.datepicker('getDate');
      displayEventsForDate(date);
    }
  });

});

