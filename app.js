var _ = require('underscore')
  , async = require('async');

var express = require('express')
  , http = require('http');

var routes = require('./routes')
  , api = require('./routes/api');

var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

app.get('/', routes.index);

app.get('/calendar', routes.calendar);
app.get('/aroundme', routes.aroundme);
app.get('/calendar', routes.calendar);

app.get('/venues', routes.venues);
app.get('/venues/:id', routes.venuePage);
app.get('/venues/:id/location', routes.venueLocation);
app.get('/performances', routes.performances);
app.get('/performances/:id', routes.performancePage);
app.get('/performances/:id/location', routes.performanceLocation);
app.get('/studios', routes.studios);
app.get('/studios/:id', routes.studioPage);
app.get('/studios/:id/location', routes.studioLocation);
app.get('/galleries', routes.galleries);
app.get('/galleries/:id', routes.galleryPage);
app.get('/galleries/:id/location', routes.galleryLocation);
app.get('/orgs', routes.orgs);
app.get('/orgs/:id', routes.orgPage);

app.get('/admin', routes.admin);
app.get('/admin/features', routes.features);
app.get('/admin/:resource', routes.adminPage);
app.post('/admin/:resource', routes.adminCreate);
app.post('/admin/:resource/:id', routes.adminSave);
app.delete('/admin/:resource/:id', routes.adminDelete);

app.get('/event/:id', routes.event);
app.post('/event/:id', routes.postEvent);
app.get('/event/:id/location', routes.eventlocation);

app.get('/events.json', api.events);
app.get('/events.json/:skip', api.events);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
