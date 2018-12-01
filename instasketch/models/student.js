const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require("bcrypt");
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
		unique: true, // "Sorry, this e-mail is already in use"
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

// This function runs before saving user to database
StudentSchema.pre('save', function (next) {
	const student = this;

	// check to make sure we don't hash again
	if (student.isModified('password')) {
		bcrypt.genSalt(10, (error, salt) => {
			bcrypt.hash(student.password, salt, (error, hash) => {
				console.log("Password before:", student.password);
				student.password = hash;
				console.log("Password After:", student.password);
				next();
			});
		})
	} else {
		next();
	}
});

// created the find method: Given email (unique), compare the passwords
StudentSchema.statics.findByEmailPassword = function (email, password) {
	const Student = this // We need to use fucntion here

	return Student.findOne({
		email: email
	}).then((student) => {
		if (!student) {
			return Promise.reject();
		}

		return new Promise((resolve, reject) => {
			bcrypt.compare(password, student.password, (error, result) => {
				/* console.log("Comparing the things received...");
				console.log(result);
				console.log(error); */
				if (result) {
					resolve(student);
				} else {
					reject();
				}
			})
		})

	})
}

const Student = mongoose.model('Student', StudentSchema);

module.exports = { Student }
