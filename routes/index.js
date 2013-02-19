
/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('index', {
    title: 'Express',
    page: 'home'
  });
};

exports.notfound = function(req, res) {
  res.render('404', { title: 'Express' });
};

exports.page = function(req, res) {
  console.log(req.params);
  res.render('index', {
    title: 'Duke Arts',
    page: req.params.page
  });
};
