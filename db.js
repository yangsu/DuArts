var mongoose = require('mongoose');

console.log('Init connection ... ');

mongoose.connect('colab-sbx-03.oit.duke.edu', 'duarts');

var emptySchema = mongoose.Schema({}, { strict: false });

console.log('Getting Events Collection ... ');
var Event = mongoose.model('Event', emptySchema);

exports.artsQuery = {
  'categories.category.value': {
    $in: [
      'Arts',
      'Comedy',
      'Concert/Music',
      'Dance Performance',
      'Exhibit',
      'Festival/Fair',
      'Movie/Film',
      'Reading',
      'Theater'
    ]
  }
};

exports.Event = Event;