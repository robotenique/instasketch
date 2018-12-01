const mongoose = require('mongoose')

const Submission = mongoose.model('Submission', {
	session_id: {
		type: mongoose.Schema.Types.ObjectId
	},
	drawing_id: {
		type: mongoose.Schema.Types.ObjectId
	},
	comments: {
		type: String
	}
})

module.exports = { Submission }
