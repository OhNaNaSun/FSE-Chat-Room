var express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')
var router = express.Router()
const Model = require('../db/models/model')
const initializePassport = require('../passport-config')
initializePassport(passport, async (username) => {
	const data = await Model.findOne({ username })
	return data
})
router.get('/login', function (req, res, next) {
	res.render('login', { title: 'Chat Room Login Page' })
})
router.get('/', function (req, res, next) {
	res.render('chatRoom.ejs', { title: 'Chat Room Page' })
})
router.post('/register', async (req, res) => {
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
router.post('/login', function (req, res, next) {
	passport.authenticate('local', function (err, user, info) {
		if (err) {
			return next(err)
		}
		if (!user) {
			return res.status(200).json(info)
		}
		return res.status(200).json({ username: user })
	})(req, res, next)
})

module.exports = router
