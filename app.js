var _ = require('underscore')
  , async = require('async');

var express = require('express')
  , routes = require('./routes')
  , http = require('http');

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
app.get('/404', routes.notfound);
app.get('/calendar', routes.calendar);
app.get('/aroundme', routes.aroundme);
app.get('/events', routes.events);
app.get('/markers', routes.markers);
app.get('/marker/:mid', routes.marker);
app.get('/calendar', routes.calendar);
app.get('/venues', routes.venues);
app.get('/orgs', routes.orgs);
app.get('/search', routes.search);
app.get('/:page', routes.page);
app.get('/event/:guid', routes.event);




http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
