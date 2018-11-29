const mongoose = require('mongoose')

const Submission = mongoose.model('Submission', {
	session_id: {
		type: String //for now
	},
	drawing_id: {
		type: String //for now
	},
	comments: {
		type: String
	}
})

module.exports = { Submission }
