var _ = require('underscore');

var parseDate = function(datestring) {
  var chunks = datestring.split('');
  chunks.splice(-5, 0, ':');
  chunks.splice(-3, 0, ':');
  chunks.splice(6, 0, '-');
  chunks.splice(4, 0, '-');
  return new Date(chunks.join(''));
};

function wrapError(res, cb) {
  return function(err, data) {
    if (err) {
      res.json(err);
    } else {
      cb(data);
    }
  };
}

exports.wrapError = wrapError;

exports.returnData = function(res) {
  return wrapError(res, function(data) {
    res.json(data);
  });
};

var defaultLimit = 100;

exports.parseOptions = function(params) {
  return {
    all: params.all || false,
    skip: params.skip || 0,
    limit: params.limit || defaultLimit
  };
};

var minute = 1000 * 60;
var hour = minute * 60;
var day = hour * 24;
var week = day * 7;

function timeInEDT(d) {
  d = d || new Date;
  var utc = d.getTime() + (d.getTimezoneOffset() * minute);
  return new Date(utc + (hour * -4));
}
exports.timeInEDT = timeInEDT;

exports.timeNextWeek = function() {
  var current = timeInEDT();
  return new Date(current.getTime() + week);
};

exports.divideDate = function(data) {
  var d = new Date;
  var now = Date.now();

  return _.chain(data)
    .map(function(event) {
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
        var diffend = event.end.milis - now;

        return diffend >= 0;
      })
      .sortBy(function(event) {
        return event.start.milis;
      })
      .groupBy(function(event) {
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
      .sortBy(function(eventlist) {
        var returnval = 0;
        switch (eventlist.header) {
          case 'Today':
            returnval = -1;
            break;
          case 'This Week':
            returnval = 0;
            break;
          case 'Ongoing':
            returnval = 1;
            break;
        }
        return returnval;
      })
      .value();
};
