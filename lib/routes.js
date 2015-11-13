'use strict'

var path = require('path');
var userCalls = require('./models/user');

module.exports = function(app, passport){
	app.get('/', function(req,res){
		res.sendfile(path.join(__dirname,"../index.html"));
	});

	
	app.get('',function(req,res){

	})
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

	});

	app.get('/profile', function(req,res){

	});


}