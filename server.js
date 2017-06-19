var express = require('express');
var bp = require('body-parser');
var app = express();

var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({secret: 'socyi3ck', saveUninitialized: true, resave: true}));

app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/bower_components'));

app.use(bp.json());

require('./server/config/mongoose');
require('./server/config/routes')(app);

app.listen(8000,function(){
	console.log('listening on port 8000');
})