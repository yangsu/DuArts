var _ = require('underscore');
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
