const bcrypt = require("bcrypt");
bcrypt.genSalt(10, (error, salt) => {
    bcrypt.hash(student.password, salt, (error, hash) => {
        student.password = hash;
        next();
    });
});