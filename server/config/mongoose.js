var mongoose = require('mongoose');
var fs = require('fs');

mongoose.connect('mongodb://localhost/project_social');
mongoose.Promise = global.Promise;

var models_path = __dirname + '/../models';

fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf('.js') != -1){
		console.log('loading ' + file + '...');
		require(models_path + '/' +file);
	}
});


// MongoError: failed to connect to server [localhost:27017] on first connect [MongoError: connect ECONNREFUSED 127.0.0.1:27017] mongod or mongo not running