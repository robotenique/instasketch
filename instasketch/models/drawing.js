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
	drawing_svg: {
		type: String,
		required: true

	}
})

module.exports = { Drawing }
