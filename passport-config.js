const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy

function initialize(passport, getUserByUsername) {
	async function authenticateUser(username, password, done) {
		const user = await getUserByUsername(username)
		if (user === null) {
			return done(null, false, { message: 'No user found' })
		}
		try {
			if (await bcrypt.compare(password, user.password)) {
				console.log('return', user)
				return done(null, user.username)
			} else {
				return done(null, false, { message: 'Password incorrect' })
			}
		} catch (e) {
			return done(e)
		}
	}
	passport.use(
		new LocalStrategy({ usernameField: 'username' }, authenticateUser)
	)
}
module.exports = initialize
