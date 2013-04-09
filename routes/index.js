
/*
 * GET home page.
 */

var fs = require('fs');
var _ = require('underscore');
var async = require('async');
var db = require('../db');
var Event = db.Event;
var util = require('../util');

var wrapError = function(res, cb) {
  return function(err, data) {
    if (err) {
      res.json(err);
    } else {
      cb(data);
    }
  }
};

var markers = JSON.parse(fs.readFileSync('data/markersloc.json', 'ascii'));

exports.index = function(req, res) {
  async.parallel({
    events: function(cb) {
      var date = new Date;
      var limit = new Date(Date.now() + 1000*60*60*24*7);

      Event.find({
        $and: [
          db.artsQuery,
          {
            $or: [{
              'start.date': { $gte: date }
            }, {
              'end.date': { $lte: limit }
            }]
          }
        ]
      }, null, {
        limit: 150,
        skip: 0
      })
      .sort({'start.utcdate': -1})
      .exec(cb);
    },
    features: function(cb) {
      db.Feature.find({}).lean().exec(cb);
    }
  }, wrapError(res, function(data) {
    res.render('index', {
      path: 'events',
      title: 'Duke Arts',
      page: 'home',
      data: util.divideDate(data.events),
      features: data.features
    });
  }));
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
  }, function(err, data) {
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

function listEndpoint(model, path, template) {
  return function(req, res) {
    db[model].find({})
    .sort('title')
    .lean()
    .exec(wrapError(res, function(data) {
      res.render(template, {
        path: path,
        title: 'Duke Arts',
        data: data
      });
    }));
  };
}
function itemEndpoint(model, path, template) {
  return function(req, res) {
    db[model].findOne({
      title: req.params.title
    })
    .sort('title')
    .lean()
    .exec(wrapError(res, function(data) {
      res.render(template, {
        path: path,
        title: 'Duke Arts',
        data: data
      });
    }));
  };
}

exports.venues = listEndpoint('Venue', 'venues', 'list');
exports.venuePage = itemEndpoint('Venue', 'venues', 'item');
exports.galleries = listEndpoint('Gallery', 'galleries', 'list');
exports.galleryPage = itemEndpoint('Gallery', 'galleries', 'item');
exports.orgs = listEndpoint('Organization', 'orgs', 'list');
exports.orgPage = itemEndpoint('Organization', 'orgs', 'item');

exports.search = function(req, res) {
  res.render('search', {
    title: 'Duke Arts'
  });
};


exports.event = function(req, res) {
  Event.findOne({
    _id: req.params.id
  }, null, null, function(err, data) {
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
