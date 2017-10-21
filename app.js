var express = require('express');
var path    = require('path');
var favicon = require('serve-favicon');
var logger  = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var basicAuth       = require('basic-auth-connect'); // Basic 認証
var index           = require('./routes/index');

var app = express();


//////// BASIC 認証 ///////////////////////////
//app.use(basicAuth('tabitabi','bitabita')); //全て非公開
//以下のページは非公開
app.all('/admin', basicAuth(function(user, password) {
    return user === 'tabitabi' && password === 'bitabita';
}));

// app.all('/dev', basicAuth(function(user, password) {
//     return user === 'tabitabi' && password === 'bitabita';
// }));

// app.all('/v', basicAuth(function(user, password) {
//     return user === 'tabitabi' && password === 'bitabita';
// }));

app.all('/s', basicAuth(function(user, password) {
    return user === 'tabitabi' && password === 'bitabita';
}));
//////////////////////////////////////////////



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
