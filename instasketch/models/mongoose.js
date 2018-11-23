const mongoose = require('mongoose')

// You need to install mongodb on your PC!
mongoose.connect('mongodb://localhost:27017/instasketch', {
    useNewUrlParser: true
});

mongoose.connection.once('open', function () {
    console.log('Connected');
    console.log(mongoose.connection)
}).on('error', function (error) {
    console.log('CONNECTION ERROR:', error);
});

let db = mongoose.connection;
module.exports = { mongoose }
