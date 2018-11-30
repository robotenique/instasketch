const mongoose = require('mongoose')
// TODO: Add the validators, and mark whenever an attribute is required or must be unique
const Student = mongoose.model('Student', {
	first_name: {
		type: String
	},
	last_name: {
		type: String
	},
	school: {
		type: String
	},
	teacher_id: {
		type: mongoose.Schema.Types.ObjectId
	},
	email: {
		type: String
	},
	password: {
		type: String
	},
	province: {
		type: String
	},
	path: {
		type: String
	}
})

module.exports = { Student }
