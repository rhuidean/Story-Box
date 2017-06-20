var Users = require('../controllers/users');

module.exports = function(app){
	app.get('/users', Users.index);
	app.post('/users',Users.create);
	app.post('/sessions',Users.login);
	app.put('/users/addfriend/:id',Users.addFriend);
	app.patch('/users/deleteFriend:/:id',Users.deleteFriend);
	// app.patch('/users',Users.deleteFriend);
}