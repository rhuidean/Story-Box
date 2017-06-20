var Users = require('../controllers/users');

module.exports = function(app){
	app.get('/users', Users.index);
	app.post('/users',Users.create);
	app.post('/sessions',Users.login);
	app.put('/users',Users.addFriend);
	// app.patch('/users',Users.deleteFriend);
}