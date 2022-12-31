var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')
var routes = require('./routes/index')
const Model = require('./db/models/model')
//db
const mongoose = require('mongoose')
require('dotenv').config()
const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString)
const database = mongoose.connection
database.on('error', (error) => {
	console.log(error)
})

database.once('connected', () => {
	console.log('Database Connected')
})
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

// passport setup
app.use(flash())
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
)
app.use(passport.initialize())
app.use(passport.session())
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found')
	err.status = 404
	next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500)
		res.render('error', {
			message: err.message,
			error: err,
		})
	})
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500)
	res.render('error', {
		message: err.message,
		error: {},
	})
})

module.exports = app
