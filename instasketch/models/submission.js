const mongoose = require('mongoose')

const Submission = mongoose.model('Submission', {
	session_id: {
		type: ObjectID
	}
	drawing_id: {
		type: ObjectID
	}
	comments: {
		type: String
	}
})

module.exports = { Submission }