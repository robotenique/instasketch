const mongoose = require('mongoose')

const Drawing = mongoose.model('Drawing', {
	student_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	title: {
		type: String
	},
	submitted: {
		type: Boolean
	},
	min_since_edit: {
		type: Number
	},
	svg: {
		type: String,
		required: true
	},
	session_id: {
		type: mongoose.Schema.Types.ObjectId
	}
})

module.exports = { Drawing }
