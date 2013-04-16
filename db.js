var mongoose = require('mongoose');

console.log('Init connection ... ');

mongoose.connect('colab-sbx-03.oit.duke.edu', 'duarts');

var emptySchema = mongoose.Schema({}, { strict: false });

var Event = mongoose.model('Event', emptySchema);
var Venue = mongoose.model('Venue', emptySchema);
var Organization = mongoose.model('Organization', emptySchema);
var Gallery = mongoose.model('Gallery', emptySchema);
var Marker = mongoose.model('Marker', emptySchema);

module.exports = {
  Event: Event,
  Venue: Venue,
  Organization: Organization,
  Gallery: Gallery,
  Marker: Marker,
  artsQuery: {
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
  }
};
