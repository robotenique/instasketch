const mongoose = require('mongoose')

const Submission = mongoose.model('Submission', {
	session_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	drawing_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	comments: {
		type: String
	},
	marked: {
		type: Boolean
	}
})

module.exports = { Submission }
