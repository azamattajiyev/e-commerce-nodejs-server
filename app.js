var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts')
var router = require('./routes');
const cors = require("cors");
var cookieParser = require('cookie-parser');
require('dotenv').config();
const bodyParser = require('body-parser')
const path = require('path')
var logger = require('morgan');

var app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts)
app.set('layout', 'admin','empty','error','auth');
app.use(session({
  name: 'myCookie',
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true,
  unset: 'destroy',
}));
app.use(cookieParser());

// const db = require("./models");
// db.sequelize.sync({})// force: true
// .then(() => {
//   console.log("Drop and re-sync db.");
// }).catch((err) => {
//   console.log("Failed to sync db: " + err.message);
// });

app.use('/', router);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // err.status=err.status || 500;
  // res.status(err.status || 500);
  const lang = req.params.lang;

  if (err.status!=500) {
    res.render('pages/error/404', {
      lang,
      layout:'./layouts/error',
      extractScripts: true,
      status:err.status,
      message:err.message,
    })
  } else {
    res.render('pages/error/500', {
      lang,
      layout:'./layouts/error',
      extractScripts: true,
      message:err.message,
    })
  }
});

module.exports = app;
