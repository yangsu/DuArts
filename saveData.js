var async = require('async');
var fs = require('fs');
var _ = require('underscore');

var db = require('./db');

var venues = JSON.parse(fs.readFileSync('data/venues.json', 'ascii'));
var orgs = JSON.parse(fs.readFileSync('data/orgs.json', 'ascii'));
var galleries = JSON.parse(fs.readFileSync('data/galleries.json', 'ascii'));
var features = JSON.parse(fs.readFileSync('data/features.json', 'ascii'));
var markers = JSON.parse(fs.readFileSync('data/markersloc.json', 'ascii'));

var save = function(model, data, key) {
  return function(callback) {
    async.parallel(_.map(data, function(item) {
      var query = {};
      query[key] = item[key];

      return function(cb) {
        db[model].update(query, {
          $set: item
        }, {
          upsert: true
        }, cb);
      };
    }), callback);
  };
};
async.parallel({
  venues: save('Venue', venues, 'title'),
  orgs: save('Organization', orgs, 'title'),
  galleries: save('Gallery', galleries, 'title'),
  features: save('Feature', features, 'title'),
  markers: save('Marker', markers, 'mrkId')
}, function(err, data) {
  console.log(err, data);
  process.exit(0);
});
