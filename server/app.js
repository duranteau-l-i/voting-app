const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();

const index = require('./routes/index');
const userRoute = require('./routes/user');
const pollRoute = require('./routes/poll');

const mongoose = require('mongoose');
const db = process.env.MONGODB;
<<<<<<< HEAD
mongoose.connect('mongodb://ibrahim:votingapp-db@ds151348.mlab.com:51348/votingapp', {
=======
mongoose.connect(db, {
>>>>>>> f3cdd8e50568858e4b5af6b79e574bfd41dec04c
  useNewUrlParser: true,
  useFindAndModify: false,
});

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//Static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', index);
app.use('/auth', userRoute);
app.use('/api', pollRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.sendFile(path.join(__dirname, 'dist/index.html'), err);
});

module.exports = app;
