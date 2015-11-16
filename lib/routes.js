'use strict'

var path = require('path');
var userCalls = require('./models/user');

module.exports = function(app, passport){
	//this function check if an user was logged in
	function loggedIn(req,res,next){
		//NOTE: Once the user is logged in information about the user is stored in req.user
		if (req.user){
			//go to next task
			next();
		}else{
			//send status 401 (unauthorized)	
			res.sendStatus(401);
		}
	}

	app.get('/', function(req,res){
		res.sendFile(path.join(__dirname,"../index.html"));
	});

	
	app.post('/login', 	passport.authenticate('login'), function(req,res){
		if(req.user){
			res.send(req.user);
		}else{
			res.sendStatus(401);
		}
	});



	app.get('/signin', function(req,res){
		
	})
	.post('/signin', function(req,res){
		userCalls.saveNewUser(req,res);
	});

	app.get('/logout', function(req,res){
		
		req.logout();
		res.send(200);
		
	});

	app.get('/dashboard',loggedIn ,function(req,res,next){
		res.send({'access': req.user.accesslevel});
		
	});


}