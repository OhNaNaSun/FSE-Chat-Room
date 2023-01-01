const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
	message: {
		required: true,
		type: String,
	},
	username: {
		type: String,
		required: true,
	},
	sentTime: {
		required: true,
		type: String,
	},
})

module.exports = mongoose.model('ChatMessageData', dataSchema)
