var Users = require('../controllers/users');
var Stories = require('../controllers/stories');
var Ideas = require('../controllers/ideas');
var Comments = require('../controllers/comments');
var Replies = require('../controllers/replies')

module.exports = function(app){
	app.post('/users',Users.create);
	app.post('/sessions',Users.login);
	app.get('/sessions',Users.session);
	app.delete('/sessions',Users.logout);
	app.put('/users/addfriend/:id',Users.addFriend);
	app.patch('/users/deleteFriend/:id',Users.deleteFriend);
	app.post('/stories',Stories.create);
	app.get('/stories',Stories.index);
	app.delete('/stories/:id',Stories.destroy);
	app.put('/stories/:id',Stories.update);
	app.post('/ideas',Ideas.create);
	app.get('/ideas',Ideas.index);
	app.delete('/ideas/:id',Ideas.destroy);
	app.put('/ideas/:id',Ideas.update);
	app.post('/comments',Comments.create);
	app.get('/comments',Comments.index);
	app.delete('/comments/:id',Comments.destroy);
	app.put('/comments/:id',Comments.update);
	app.post('/replies',Replies.create);
	app.get('/replies',Replies.index);
	app.delete('/replies/:id',Replies.destroy);
	app.put('/replies/:id',Replies.update);
}