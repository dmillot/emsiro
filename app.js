var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
<<<<<<< HEAD
var apiRouter = require('./routes/api');
var adminRouter = require('./routes/admin');
=======
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
>>>>>>> 603ec0cd128396ae9cdc97e6068056c04ce63c11
var listingRouter = require('./routes/listing');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
<<<<<<< HEAD
app.use('/api', apiRouter);
app.use('/admin',adminRouter);
=======
app.use('/login',loginRouter);
app.use('/signup',signupRouter);
>>>>>>> 603ec0cd128396ae9cdc97e6068056c04ce63c11
app.use('/listing', listingRouter);


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
