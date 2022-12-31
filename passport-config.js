const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy

function initialize(passport, getUserByUsername, getUserById) {
	async function authenticateUser(username, password, done) {
		const user = await getUserByUsername(username)
		if (user === null) {
			return done(null, false, { message: 'No user found' })
		}
		try {
			if (await bcrypt.compare(password, user.password)) {
				return done(null, user)
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
	passport.serializeUser((user, done) => {
		done(null, user.id)
	})
	passport.deserializeUser(async (id, done) => {
		return done(null, await getUserById(id))
	})
}
module.exports = initialize
