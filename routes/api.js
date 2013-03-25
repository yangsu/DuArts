var _ = require('underscore');
var async = require('async');
var mongoose = require('mongoose');

mongoose.connect('localhost', 'duarts');

var schema = mongoose.Schema({}, { strict: false });

var Event = mongoose.model('Event', schema);

var chunkSize = 10;

exports.events = function (req, res) {
    var skip = req.params.skip || 0;

    Event.find({}, null, {
        limit: chunkSize,
        skip: skip
    }, function (err, data) {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
};