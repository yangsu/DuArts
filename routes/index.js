
/*
 * GET home page.
 */

var fs = require('fs');
var _ = require('underscore');
var async = require('async');
var Event = require('../db').Event;
var util = require('../util');

var venuesData = JSON.parse(fs.readFileSync('data/venues.json', 'ascii'));
var orgsData = JSON.parse(fs.readFileSync('data/orgs.json', 'ascii'));
var galleriesData = JSON.parse(fs.readFileSync('data/orgs.json', 'ascii'));
var features = JSON.parse(fs.readFileSync('data/features.json', 'ascii'));

exports.features = function(req, res) {
  res.render('features', {
    title: 'Express',
    page: 'features',
    features: features
  });
};

var markers = JSON.parse(fs.readFileSync('data/markersloc.json', 'ascii'));

exports.index = function(req, res) {
  var query = Event.find({}, null, {
    limit: 150,
    skip: 0
  })
  .sort({'start.utcdate': -1})
  .execFind(function (err, data) {
    if (err) {
      res.json(err);
    } else {
      // console.log();
      res.render('index', {
        path: 'events',
        title: 'Duke Arts',
        page: 'home',
        data: util.divideDate(data),
        features: features
      });
    }
  });
};

exports.marker = function(req, res) {
  res.json(markers[req.params.mid]);
};

exports.markers = function(req, res) {
  res.json(markers);
};

exports.notfound = function(req, res) {
  res.render('404', { title: 'Express' });
};

exports.page = function(req, res) {
  Event.find({}, null, {
      limit: 50,
      skip: 0
  }, function (err, data) {
      if (err) {
          res.json(err);
      } else {
          res.render('index', {
            path: 'events',
            title: 'Duke Arts',
            page: req.params.page,
            data: [{
              header: 'This Month',
              events: data
            }]
          });
      }
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
    title: 'Around Me'
  });
};

exports.venues = function(req, res) {
  res.render('venues', {
    path: 'venues',
    title: 'Duke Arts',
    data: venuesData
  });
};

exports.venuePage = function(req, res) {
  var title = req.params.venueTitle;
  var venueInfo = _.find(venuesData, function (venue){
    return venue.title == title;
  });
  res.render('venuePage', {
    path: 'venuePage',
    title: 'Duke Arts',
    data: venueInfo
  });
};

exports.galleries = function(req, res) {
  res.render('galleries', {
    path: 'galleries',
    title: 'Duke Arts',
    data: galleriesData
  });
};

exports.galleryPage = function(req, res) {
  var title = req.params.galleryTitle;
  var galleryInfo = _.find(galleriesData, function (gallery){
    return gallery.title == title;
  });
  res.render('galleryPage', {
    path: 'galleryPage',
    title: 'Duke Arts',
    data: galleryInfo
  });
};

exports.orgs = function(req, res) {
  res.render('orgs', {
    path: 'orgs',
    title: 'Duke Arts',
    data: orgsData
  });
};

exports.orgPage = function(req, res) {
  var title = req.params.orgTitle;
  var orgInfo = _.find(orgsData, function (org){
    return org.title == title;
  });
  res.render('orgPage', {
    path: 'orgPage',
    title: 'Duke Arts',
    data: orgInfo
  });
};

exports.search = function(req, res) {
  res.render('search', {
    title: 'Duke Arts'
  });
};


exports.event = function(req, res) {
  Event.findOne({
    _id: req.params.id
  }, null, null, function (err, data) {
      if (err) {
          res.json(err);
      } else {
          res.render('eventPage', {
            title: 'Duke Arts',
            event: data
          });
      }
  });
};
