
/*
 * GET home page.
 */

var fs = require('fs');
var _ = require('underscore');

var json = JSON.parse(fs.readFileSync('data/month.pretty.json', 'ascii'));
var eventData = json.events;
var events = _.chain(eventData).map(function(event) {
  event = event.event;
  return {
    guid: event.guid,
    title: event.summary,
    image: event.xproperties && event.xproperties.X_BEDEWORK_IMAGE && event.xproperties.X_BEDEWORK_IMAGE.values && event.xproperties.X_BEDEWORK_IMAGE.values.text,
    location: event.location && event.location.link && event.location.link.indexOf('=') >= 0 && event.location.link.split('=').slice(-1)[0],
    date: event.start.shortdate
  };
}).sortBy(function(event) {
  return event.date;
})
// .reverse()
.slice(0, 15)
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

var markers = JSON.parse(fs.readFileSync('data/markersloc.json', 'ascii'));

exports.marker = function(req, res) {
  res.json(markers[req.params.mid]);
};

exports.events = function(req, res) {
  res.json(events);
};

exports.markers = function(req, res) {
  res.json(markers);
};

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
    path: 'events',
    title: 'Duke Arts',
    page: req.params.page,
    data: data
  });
};

exports.event = function(req, res) {
  var event = map[req.params.guid];
  res.render('eventPage', {
    title: 'Duke Arts',
    event: event,
    loc: (!!event.location && !!event.location.link) ? markers[event.location.link.split('=').slice(-1)[0]] : null
  });
};

exports.calendar = function(req, res) {
  res.render('calendar', {
    path: 'calendar',
    title: 'Duke Arts'
  });
};

exports.aroundme = function(req, res) {
  res.render('aroundme', {
    path: 'aroundme',
    title: 'Around Me',
    events: events,
    markers: markers
  });
};

exports.venues = function(req, res) {
  res.render('venues', {
    path: 'venues',
    title: 'Duke Arts'
  });
};

exports.orgs = function(req, res) {
  res.render('orgs', {
    path: 'orgs',
    title: 'Duke Arts'
  });
};

exports.search = function(req, res) {
  res.render('search', {
    title: 'Duke Arts'
  });
};

exports.pageaud = function(req, res) {
  res.render('pageaud', {
    title: 'Duke Arts'
  });
};
