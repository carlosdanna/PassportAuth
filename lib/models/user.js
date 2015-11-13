var mongoose = require('mongoose');
var crypto 		= 	require('crypto');
var passport 	=	require('passport');
var LocalStrategy = require('passport-local').Strategy;


var userCalls = {};

//This is the key usde for password and token encryption 
//DO NOT MODIFY
var key = 'c0n.3E,!;36Rde|0m0Nos.20.yE.15';

//this function encrypts the password
function encrypt(data,key){
	var cipher = crypto.createCipher('aes256', key);
	var crypted = cipher.update(data, 'utf-8', 'hex');
	crypted += cipher.final('hex');
	return crypted;
}

//this function decrypts the password
function decrypt(data,key){
	var decipher = crypto.createDecipher('aes256', key);
    var decrypted = decipher.update(data, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}


var schema = mongoose.Schema;

var userSchema = new schema({
	'_id'			: schema.ObjectId,
	'email'			: String,
	'password' 		: String,
	'accesslevel'	: Number,
	'active'		: Boolean
});

var User = mongoose.model('users', userSchema);


userCalls.saveNewUser = function(req,res){
	var response = {} ;
	User.findOne({'email': req.body.email}, function(err,data){
		if (err){
			response = {'error': true, 'message': 'Something really bad happened'};
			res.send(response);
		}else{
			if (data != null)
			{
				response = {'error': true, 'message': 'This E-mail was already entered'};
				res.send(response);
			}else{
				var newUser  = new User({
					_id 		: mongoose.Types.ObjectId(),
					email : req.body.email,
					password : encrypt(req.body.password,key),
					accesslevel : 0,
					active : true
				});
				newUser.save(function(err){
					if(err){
						response = {'error': true, 'message': 'Something really bad happened'};
						res.send(response);
					}else{
						response = {'error': false, 'message': 'data saved'};		
						res.send(response);
					}
				});
				
			}
		}
			
	});
}


passport.use('login',new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password'
	},
	function(username, password,done){
		
		User.findOne({'email': username}, function(err,data){
			if(err){
				return done(err);
			}else{
				if(!data){ 	return done(null, false, {	message: 'Incorrect username'});	}
				if (password != decrypt(data.password,key)){	return done(null, false, {message: 'Incorrect password'}); 	}	
				return done(null,data);
			}
		});
			
	}

));

passport.serializeUser(function(user,done){
	done(null,user);
});

passport.deserializeUser(function(user, done){
	done(null, user);
});

	



	

module.exports = userCalls;