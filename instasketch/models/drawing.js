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
	creation_date: { // Be aware of this: https://mongoosejs.com/docs/schematypes.html#dates
		type: Date,
		required: true
	},
	svg: {
		type: String,
		required: true
	}
})

module.exports = { Drawing }
