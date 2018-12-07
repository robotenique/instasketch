const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
	teacher_code: {
		type: String,
		required: true,
		minlength: 1,
	},
	email: {
		type: String,
		required: true,
		minlength: 1,
		unique: true,
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

// This function runs before saving teacher to database
TeacherSchema.pre('save', function (next) {
	const student = this;

	// check to make sure we don't hash again
	if (student.isModified('password')) {
		bcrypt.genSalt(10, (error, salt) => {
			bcrypt.hash(student.password, salt, (error, hash) => {
				student.password = hash;
				next()
			})
		})
	} else {
		next();
	}
});

// created the find method: Given email (unique), compare the passwords
TeacherSchema.statics.findByEmailPassword = function (email, password) {
	const Teacher = this // We need to use fucntion here

	return Teacher.findOne({
		email: email
	}).then((teacher) => {
		if (!teacher) {
			return Promise.reject();
		}

		return new Promise((resolve, reject) => {
			bcrypt.compare(password, teacher.password, (error, result) => {
				if (result) {
					resolve(teacher);
				} else {
					reject();
				}
			})
		})

	})
}

const Teacher = mongoose.model('Teacher', TeacherSchema);

module.exports = { Teacher }
