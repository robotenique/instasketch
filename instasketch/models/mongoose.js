const mongoose = require('mongoose')

// You need to install mongodb on your PC!
mongoose.connect('mongodb://team07:instasketch-07@instasketch-shard-00-00-zrvm1.mongodb.net:27017,instasketch-shard-00-01-zrvm1.mongodb.net:27017,instasketch-shard-00-02-zrvm1.mongodb.net:27017/test?ssl=true&replicaSet=instasketch-shard-0&authSource=admin&retryWrites=true', {
    useNewUrlParser: true
});

mongoose.connection.once('open', function () {
    console.log('Connected');
}).on('error', function (error) {
    console.log('CONNECTION ERROR:', error);
});

let db = mongoose.connection;
module.exports = { mongoose }
