
/*
 * GET home page.
 */

var data = [{
  header: 'This Week',
  events: [{
    title: 'DUI Performance',
    date: '1/22'
  }, {
    title: 'Duke Arts Festival',
    date: '1/23'
  }, {
    title: 'African Diaspora',
    date: '1/29'
  }]
}, {
  header: 'Next Week',
  events: [{
    title: 'Duke Chamber Players Concert',
    date: '1/22'
  }, {
    title: 'Duke Arts Festival',
    date: '1/31'
  }]
}];

exports.index = function(req, res) {
  res.render('index', {
    title: 'Express',
    page: 'home',
    data: data
  });
};

exports.notfound = function(req, res) {
  res.render('404', { title: 'Express' });
};

exports.page = function(req, res) {
  console.log(req.params);
  res.render('index', {
    title: 'Duke Arts',
    page: req.params.page,
    data: data
  });
};
