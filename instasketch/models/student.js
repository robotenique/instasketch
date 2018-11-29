const mongoose = require('mongoose')

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
		type: ObjectID
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