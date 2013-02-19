
/*
 * GET home page.
 */

var fs = require('fs');
var _ = require('underscore');

var text = fs.readFileSync('data/month.pretty.json', 'ascii');
var json = JSON.parse(text);
var eventData = json.events;
var events = _.chain(eventData).map(function(event) {
  event = event.event;
  return {
    guid: event.guid,
    title: event.summary,
    date: event.start.shortdate
  };
}).sortBy(function(event) {
  return event.date;
})
.reverse()
.value();

var map = _.reduce(eventData, function(memo, event) {
  event = event.event;
  memo[event.guid] = event;
  return memo;
}, {});

var data = [{
  header: 'This Month',
  events: events
}];

exports.index = function(req, res) {
  res.render('index', {
    title: 'Express',
    page: 'home',
    data: data
  });
};

exports.notfound = function(req, res) {
  res.render('404', { title: 'Express' });
};

exports.page = function(req, res) {
  res.render('index', {
    title: 'Duke Arts',
    page: req.params.page,
    data: data
  });
};

exports.event = function(req, res) {
  res.render('eventPage', {
    title: 'Duke Arts',
    event: map[req.params.guid]
  });
};
