const mongoose = require('mongoose')
const validator = require('validator');
// TODO: Add the validators, and mark whenever an attribute is required or must be unique

const StudentSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: true,
		minlength: 1,
	},
	last_name: {
		type: String,
		required: true,
		minlength: 1,
	},
	school: {
		type: String,
		required: true,
		minlength: 1,
	},
	teacher_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		minlength: 1,
	},
	email: {
		type: String,
		required: true,
		minlength: 1,
		validate: {
			validator: validator.isEmail,
			message: 'Not valid email.'
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
	province: {
		type: String,
		required: true,
		minlength: 1,
	},
	path: {
		type: String
	}
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = { Student }
