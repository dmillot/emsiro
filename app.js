/* MIDDLEWARES */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');

/* ROUTES */
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var adminRouter = require('./routes/admin/admin');
var listingRouter = require('./routes/listing');
var favoryRouter = require('./routes/favory');
var aboutRouter = require('./routes/about');
var pageEditorRouter = require('./routes/pageEditor');
var pageManageRouter = require('./routes/admin/pages');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret : '7kIPPzPn5aTf8ER4WV7X94gC036wf5jP',
  name : 'sessionId',
  saveUninitialized : true,
  resave : true
}));

// session middleware
app.use(function (req, res, next) {
  // variable locals.session will be available on all pages
  res.locals.session = req.session.userId;
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.png')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/admin', adminRouter);
app.use('/listing', listingRouter);
app.use('/favory', favoryRouter);
app.use('/about', aboutRouter);
app.use('/pageEditor', pageEditorRouter);
app.use('/pages',pageManageRouter);

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
