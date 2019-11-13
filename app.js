/* MIDDLEWARES */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var logger = require('morgan');
var favicon = require('serve-favicon');

/* ROUTES */
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
var adminRouter = require('./routes/admin');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var listingRouter = require('./routes/listing');
var favoryRouter = require('./routes/favory');
var aboutRouter = require('./routes/about');
var testRouter = require('./routes/test');
var disconnectRouter = require ('./routes/disconnect');
var pageEditorRouter = require ('./routes/pageEditor');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: [ '7kIPPzPn5aTf8ER4WV7X94gC036wf5jP' ]
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.png')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/admin', adminRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/listing', listingRouter);
app.use('/favory', favoryRouter);
app.use('/about', aboutRouter);
app.use('/test', testRouter);
app.use('/disconnect',disconnectRouter);
app.use('/pageEditor', pageEditorRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
