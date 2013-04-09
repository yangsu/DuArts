var async = require('async');
var fs = require('fs');
var _ = require('underscore');

var db = require('./db');

var venues = JSON.parse(fs.readFileSync('data/venues.json', 'ascii'));
var orgs = JSON.parse(fs.readFileSync('data/orgs.json', 'ascii'));
var galleries = JSON.parse(fs.readFileSync('data/galleries.json', 'ascii'));
var features = JSON.parse(fs.readFileSync('data/features.json', 'ascii'));

var save = function(model, data) {
  return function(cb) {
    async.parallel(_.map(data, function(item) {
      return function(cb) {
        db[model].update({
          title: item.title
        }, {
          $set: item
        }, {
          upsert: true
        }, cb);
      };
    }), cb);
  };
};
async.parallel({
  venues: save('Venue', venues),
  orgs: save('Organization', orgs),
  galleries: save('Gallery', galleries),
  features: save('Feature', features)
}, function(err, data) {
  console.log(err, data);
  process.exit(0);
});
