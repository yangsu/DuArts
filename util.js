var _ = require('underscore');

var parseDate = function (datestring) {
  var chunks = datestring.split('');
  chunks.splice(-5, 0, ':');
  chunks.splice(-3, 0, ':');
  chunks.splice(6, 0, '-');
  chunks.splice(4, 0, '-');
  return new Date(chunks.join(''));
};

var day = 1000*60*60*24;
var week = 1000*60*60*24*7;

exports.divideDate = function (data) {
  var d = new Date;
  var now = Date.now();

  return _.chain(data)
    .map(function(event) {
      event = event.toObject();
      event.start.milis = new Date(event.start.date).getTime();
      event.end.milis = new Date(event.end.date).getTime();

      return {
        _id: event._id,
        start: event.start,
        end: event.end,
        summary: event.summary,
        description: event.description,
        location: event.location
      };
    })
    .filter(function(event) {
      var diffstart = now - event.start.milis;
      var diffend = event.end.milis - now;

      return (diffstart >= 0 && diffend >= 0);
    })
    .sortBy(function (event) {
      return event.start.milis;
    })
    .groupBy(function (event) {
      var diffstart = now - event.start.milis;
      var diffend = event.end.milis - now;

      if (diffend <= day) {
        return 'Today';
      } else if (diffstart < 0 && diffend < week) {
        return 'This Week';
      } else {
        return 'Ongoing';
      }
    }).map(function(events, group) {
      return {
        header: group,
        events: events
      };
    })
    .value();
};