var mongoose = require('mongoose');

console.log('Init connection ... ');

mongoose.connect('localhost', 'duarts');

var emptySchema = mongoose.Schema({}, { strict: false });

console.log('Getting Events Collection ... ');
var Event = mongoose.model('Event', emptySchema);

exports.Event = Event;