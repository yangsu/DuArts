var _ = require('underscore');
var async = require('async');
var Event = require('../db.js').Event;

var util = require('../util');

var chunkSize = 100;

exports.events = function (req, res) {
  var skip = req.params.skip || 0;
  var date = (new Date).toUTCString();
  var query = Event.find({
    $and: [
      { 'categories.category.value': 'Arts' },
      {
        $or: [{
          'start.date': { $gte: date }
        }, {
          'end.utcdate': { $lte: date }
        }]
      }
    ]
  }, null, {
        limit: chunkSize,
        skip: skip
    })
    .sort({'start.utcdate': -1})
    .execFind(function (err, data) {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
};

exports.eventlocation = function (req, res) {
    var id = req.params.id;

    var query = Event.findOne({
        _id: id
    }, 'location', null, function (err, data) {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
};
