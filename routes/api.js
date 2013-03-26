var _ = require('underscore');
var async = require('async');
var Event = require('../db.js').Event;

var chunkSize = 10;

exports.events = function (req, res) {
    var skip = req.params.skip || 0;

    var query = Event.find({}, null, {
        limit: chunkSize,
        skip: skip
    })
    .sort({'start.shortdate': -1})
    .execFind(function (err, data) {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
};
