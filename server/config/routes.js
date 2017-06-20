var Users = require('../controllers/users');
var Posts = require('../controllers/posts')

module.exports = function(app){
	app.get('/users', Users.index);
	app.post('/users',Users.create);
	app.post('/sessions',Users.login);
	app.put('/users/addfriend/:id',Users.addFriend);
	app.patch('/users/deleteFriend:/:id',Users.deleteFriend);
	app.post('/stories',Stories.create);
	app.get('/stories',Stories.index);
	app.delete('/stories:/id',Stories.destroy);
	app.put('/stories/:id',Stories.update)


	// app.patch('/users',Users.deleteFriend);
}