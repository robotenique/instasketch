const mongoose = require('mongoose')

const Session = mongoose.model('Session', {
	teacher_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	title: {
		type: String,
		required: true
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
		type: Boolean,
		required: true
	}
})

module.exports = { Session }
