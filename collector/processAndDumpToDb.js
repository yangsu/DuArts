var fs = require('fs');
var _ = require('underscore');
var async = require('async');
var mongoose = require('mongoose');

mongoose.connect('colab-sbx-03.oit.duke.edu', 'duarts');

var schema = mongoose.Schema({}, { strict: false });

var Event = mongoose.model('Event', schema);


// argv[0] = 'node', argv[1] = 'processAndDumpToDb.js'
// argv[2] is the input file
var inputFile = process.argv[2];

try {
    var markers = JSON.parse(fs.readFileSync('../data/markersloc.json', 'ascii'));

    console.log('Reading ' + inputFile + '...');
    var json = JSON.parse(fs.readFileSync(inputFile, 'ascii'));

    var events = _.map(json.events, function(e) { return e.event; });

    var eventCbs = _.map(events, function(e) {
        return function(cb) {
            console.log('Saving ' + e.guid);
            var loc = e.location;
            if (loc && loc.link && loc.link.indexOf('=') >= 0) {
                var markerId = loc.link.split('=').slice(-1)[0];
                var marker = markers[markerId];
                if (!!marker) {
                    e.location.coordinate = marker;
                }
            }

            var xprop = e.xproperties;
            if (xprop && xprop.X_BEDEWORK_IMAGE) {
                e.image = xprop.X_BEDEWORK_IMAGE.values.text;
            }

            Event.update({ guid: e.guid }, { $set: e }, { upsert: true }, cb);
        };
    });

    async.series(eventCbs, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('Saved ' + data.length + ' entries');
        }
        mongoose.connection.close();
        process.exit(0);
    });

    console.log('Parsed ' + events.length + ' events');

} catch (e) {
    console.log(e);
}