var express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')
var router = express.Router()
const Model = require('../db/models/model')
const initializePassport = require('../passport-config')
initializePassport(
	passport,
	async (username) => {
		const data = await Model.findOne({ username })
		return data
	},
	async (id) => {
		const data = await Model.findOne({ id })
		return data
	}
)
router.get('/login', checkNotAuthenticated, function (req, res, next) {
	res.render('login', { title: 'Chat Room Login Page' })
})
router.get('/', checkAuthenticated, function (req, res, next) {
	res.render('index.ejs', { username: req.user.username })
})
router.post('/register', checkNotAuthenticated, async (req, res) => {
	const hashedPassword = await bcrypt.hash(req.body.password, 10)
	const data = new Model({
		username: req.body.username,
		password: hashedPassword,
	})
	try {
		const dataToSave = data.save()
		res.status(200).json({ success: true, message: 'Register Success!' })
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
})
router.post('/login', checkNotAuthenticated, function (req, res, next) {
	passport.authenticate('local', function (err, user, info) {
		if (err) {
			return next(err)
		}
		if (!user) {
			return res.status(200).json(info)
		}
		req.login(user, function (err) {
			if (err) return next(err)
			return res.status(200).json(user)
		})
	})(req, res, next)
})
router.delete('/logout', (req, res) => {
	req.logOut(function (err) {
		if (err) {
			return next(err)
		}
	})
	return res.status(200).json({ success: true })
})
function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next()
	}
	res.redirect('/login')
}
function checkNotAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect('/')
	}
	return next()
}
module.exports = router
