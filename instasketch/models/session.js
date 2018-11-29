const mongoose = require('mongoose')

const Session = mongoose.model('Session', {
	session_id: {
		type: Number
	},
	teacher_id: {
		type: mongoose.Schema.Types.ObjectId
	},
	title: {
		type: String
	},
	date: {
		type: Date
	},
	marked_submissions: {
		type: Number
	},
	total_submissions: {
		type: Number
	},
	open: {
		type: Boolean
	}
})

module.exports = { Session }
