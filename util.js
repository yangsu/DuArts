var _ = require('underscore');

var parseDate = function (datestring) {
  var chunks = datestring.split('');
  chunks.splice(-5, 0, ':');
  chunks.splice(-3, 0, ':');
  chunks.splice(6, 0, '-');
  chunks.splice(4, 0, '-');
  return new Date(chunks.join(''));
};

var pad = function(number, numDigit) {
  var str = '';
  while (numDigit--) {
    str += '0'
  }
  str += number;
  return str.slice(-numDigit);
};

exports.getShortDate = function() {
  var d = new Date;
  var date = '';
  date += d.getFullYear();
  date += pad(d.getMonth() + 1, 2);
  date += pad(d.getDate(), 2);

  return new RegExp(date);
};

exports.divideDate = function (data) {
  var d = new Date;
  var date = (d.getMonth() + 1) + '/' +
              d.getDate() + '/' +
              d.getFullYear().toString().slice(-2);
  var now = Date.now();

  return _.chain(data)
    .map(function(event) {
      event = event.toObject();
      event.start.milis = parseDate(event.start.utcdate).getTime();

      return {
        _id: event._id,
        start: event.start,
        end: event.end,
        summary: event.summary,
        description: event.description,
        location: event.location
      };
    })
    .sortBy(function (event) {
      return event.start.milis;
    })
    .groupBy(function (event) {
      var start = event.start;
      var week = 1000*60*60*24*7;

      var diff = start.milis - now;

      if (start.shortdate == date) {
        return 'Today';
      } else if (diff >= 0 && diff < week) {
        return 'This Week';
      } else if (diff >= week && diff < 2*week) {
        return 'Next Week';
      } else if (diff < 0 && Math.abs(diff) < week) {
        return 'Past Week';
      } else if (diff < 0 && Math.abs(diff) > week) {
        return 'Past Events';
      } else {
        return 'Near Future';
      }
    }).map(function(events, group) {
      return {
        header: group,
        events: events
      };
    })
    .value();
};