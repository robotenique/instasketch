const mongoose = require('mongoose')
const validator = require('validator');

const TeacherSchema = new mongoose.Schema({
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
		minlength: 1,
	},
	teacher_code: {
		type: String,
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

const Teacher = mongoose.model('Teacher', TeacherSchema);

module.exports = { Teacher }
