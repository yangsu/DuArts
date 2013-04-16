var _ = require('underscore');
var async = require('async');
var db = require('../db');
var Event = db.Event;

var util = require('../util');

function eventsApi(options) {
  var current = util.timeInEDT();
  var nextWeek = util.timeNextWeek();

  var query = _.extend(options.query || {}, db.artsQuery, {
    'start.date': { $gte: current }
  });
  if (!options.options.all) {
    _.extend(query, {
      'end.date': { $lte: nextWeek }
    });
  }
  var filter = options.filter || {};
  var opts = _.extend(options.options || {}, {
    lean: true
  });

  Event.find(query, filter, opts)
    .sort({'start.utcdate': 1})
    .execFind(options.callback);
}

exports.eventsApi = eventsApi;
exports.events = function(req, res) {
  eventsApi({
    options: util.parseOptions(req.query),
    callback: util.returnData(res)
  });
};

exports.eventlocation = function(req, res) {
  var id = req.params.id;
  var query = Event.findOne({
    _id: id
  }, 'location', null, util.returnData(res));
};

exports.postEvent = function(req, res) {
  var id = req.params.id;

  Event.update({
    _id: id
  }, { $set: req.body }, {}, util.wrapError(res, function(data) {
    res.json(data);
  }));
};
