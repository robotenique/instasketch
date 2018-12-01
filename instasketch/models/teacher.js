const mongoose = require('mongoose')

const Teacher = mongoose.model('Teacher', {
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
	teacher_code: {
		type: String
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

module.exports = { Teacher }
