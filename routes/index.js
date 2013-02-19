
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
    title: event.summary,
    date: event.start.shortdate
  };
}).sortBy(function(event) {
  return event.date;
})
.reverse()
.value();

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
  console.log(req.params);
  res.render('index', {
    title: 'Duke Arts',
    page: req.params.page,
    data: data
  });
};
