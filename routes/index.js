var fs = require('fs');
var _ = require('underscore');
var async = require('async');
var db = require('../db');
var Event = db.Event;
var util = require('../util');
var api = require('./api');


exports.index = function(req, res) {
  async.parallel({
    events: function(cb) {
      api.eventsApi({
        options: util.parseOptions(req.query),
        callback: cb
      });
    },
    features: function(cb) {
      api.eventsApi({
        query: { feature: 'true' },
        filter: { summary: 1, image: 1 },
        options: util.parseOptions(req.query),
        callback: cb
      });
    }
  }, util.wrapError(res, function(data) {
    res.render('index', {
      path: 'events',
      title: 'Duke Arts',
      page: 'home',
      data: util.divideDate(data.events),
      features: data.features
    });
  }));
};

exports.features = function(req, res) {
  api.eventsApi({
    options: util.parseOptions(req.query),
    callback: util.wrapError(res, function(events) {
      res.render('adminfeatures', {
        title: 'Duke Arts',
        page: 'features',
        events: events
      });
    })
  });
};

exports.notfound = function(req, res) {
  res.render('404', { title: 'Express' });
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
    .exec(util.wrapError(res, function(data) {
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
      _id: req.params.id
    })
    .lean()
    .exec(util.wrapError(res, function(data) {
      res.render(template, {
        path: path,
        title: 'Duke Arts',
        data: data
      });
    }));
  };
}

function itemLocationEndpoint(model, path, template) {
  return function(req, res) {
    db[model].findOne({
      _id: req.params.id
    })
    .lean()
    .exec(util.wrapError(res, function(item) {
      db.Marker.findOne({
        mrkId: item.location
      })
      .lean()
      .exec(util.wrapError(res, function(location) {
        res.json(location);
      }));
    }));
  };
}

exports.venues = listEndpoint('Venue', 'venues', 'list');
exports.venuePage = itemEndpoint('Venue', 'venues', 'item');
exports.venueLocation = itemLocationEndpoint('Venue', 'venues', 'item');
exports.galleries = listEndpoint('Gallery', 'galleries', 'list');
exports.galleryPage = itemEndpoint('Gallery', 'galleries', 'item');
exports.galleryLocation = itemLocationEndpoint('Gallery', 'galleries', 'item');
exports.orgs = listEndpoint('Organization', 'orgs', 'list');
exports.orgPage = itemEndpoint('Organization', 'orgs', 'item');

exports.search = function(req, res) {
  res.render('search', {
    title: 'Duke Arts'
  });
};

exports.admin = function(req, res) {
  res.render('admin', {
    title: 'Duke Arts Admin'
  });
};
exports.adminPage = function(req, res) {
  var resource = req.params.resource;
  if (db[resource]) {
    db[resource].find({}).lean().exec(util.wrapError(res, function(data) {
      res.render('adminpage', {
        title: 'Duke Arts Admin',
        resource: resource,
        data: data
      });
    }));
  } else {
    res.send(400);
  }
};

exports.adminSave = function(req, res) {
  var item = req.body;
  var id = req.params.id;
  var resource = req.params.resource;
  if (db[resource]) {
    db[resource].update({
      _id: id
    }, {
      $set: item
    }, {
      upsert: true
    }, util.wrapError(res, function(data) {
      res.json(data);
    }));
  } else {
    res.send(400);
  }
};

exports.adminDelete = function(req, res) {
  var resource = req.params.resource;
  var id = req.params.id;

  if (db[resource]) {
    db[resource].remove({
      _id: id
    }, util.wrapError(res, function(data) {
      res.json(data);
    }));
  } else {
    res.send(400);
  }
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
