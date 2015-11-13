var express 		= require('express'),
	passport 		= require('passport'),
	bodyParser		= require('body-parser'),
	cookieParser 	= require('cookie-parser'),
	session      	= require('express-session'),
	configDB 		= require('./lib/configDB'),
	mongoose 		= require('mongoose'),
	morgan 			= require('morgan');

var app = express(); 


mongoose.connect(configDB.url);



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended' : false}));

app.use(express.static(__dirname+'/app'));

app.use(morgan('dev'));
app.use(cookieParser());

app.use(session({ secret: 'thisismysecretkeypleasedonotcopy', resave: false, saveUninitialized: false}));

app.use(passport.initialize());
app.use(passport.session());



require('./lib/routes')(app,passport);

app.listen(3000, function(){
	console.log('Magic happening at port 3000');
});