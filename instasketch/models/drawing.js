const mongoose = require('mongoose')

const Drawing = mongoose.model('Drawing', {
	student_id: {
		type: mongoose.Schema.Types.ObjectId
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
	path: {
		type: String
	}
})

module.exports = { Drawing }
