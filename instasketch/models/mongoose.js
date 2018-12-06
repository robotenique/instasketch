const mongoose = require('mongoose')

//const mongoURI = 'mongodb://team07:instasketch-07@instasketch-shard-00-00-zrvm1.mongodb.net:27017,instasketch-shard-00-01-zrvm1.mongodb.net:27017,instasketch-shard-00-02-zrvm1.mongodb.net:27017/test?ssl=true&replicaSet=instasketch-shard-0&authSource=admin&retryWrites=true';
// "mongodb://localhost:27017/instasketch"

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/instasketch';

mongoose.connect("mongodb://localhost:27017/instasketch", {
    useNewUrlParser: true
});

mongoose.connection.once('open', function () {
    console.log('Connected');
}).on('error', function (error) {
    console.log('CONNECTION ERROR:', error);
});

module.exports = { mongoose }
