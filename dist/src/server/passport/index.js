'use strict';

var _userprofiles = require('src/server/models/userprofiles');

var _userprofiles2 = _interopRequireDefault(_userprofiles);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _calls = require('src/server/models/calls');

var _calls2 = _interopRequireDefault(_calls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var LinkedInStrategy = require('passport-linkedin').Strategy;


module.exports = function (passport) {

	passport.serializeUser(function (user, done) {
		return done(null, user);
	});
	passport.deserializeUser(function (user, done) {
		//obtengo el usuario de la base de datos con el id
		done(null, user);
	});

	/*
 *	logica passport twitter
 */
	passport.use(new TwitterStrategy({
		consumerKey: process.env.TWITTER_CONSUMER_KEY,
		consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
		callbackURL: 'http://localhost:3000/auth/twitter/callback'
	}, function (token, tokenSecret, profile, done) {
		//logica si el usuario es nuevo o no, si se le va a registrar, etc.
		//pasamos el metodo done y el usuario ya esta autenticado.
		/*
  		Userprofiles.findOne({ username: profile.id }, function (err, user) {
  			if(err){
  				return done(err);
  			}
  			if(user){
  				return done(null, user)
  			}else{
  				let user = new Userprofiles()
  
  				user.provider = profile.provider;
  				user.photo = profile.photos[0].value;
  				user.name = profile.displayName;
  				user.username = profile.id;
  
  				user.save(function(err){
  					if(err)
  						throw err;
  	      			return done(null, user);
  				})
  			}
  	    });
    
  */
		//ESTE QUERY ES APLICANDO POPULATE

		_userprofiles2.default.findOne({ username: profile.id }).populate({
			path: 'workplaces',
			populate: { path: 'enterprise' }
		}).exec(function (err, user) {
			if (err) {
				return done(err);
			}
			if (user) {
				return done(null, user);
			} else {
				(function () {
					var user = new _userprofiles2.default();

					user.provider = profile.provider;
					user.photo = profile.photos[0].value;
					user.name = profile.displayName;
					user.username = profile.id;

					user.save(function (err) {
						if (err) throw err;
						return done(null, user);
					});
				})();
			}
		});
	}));

	/*
 *	logica passport facebook
 */
	passport.use(new FacebookStrategy({
		clientID: process.env.FACEBOOK_APP_ID,
		clientSecret: process.env.FACEBOOK_APP_SECRET,
		callbackURL: 'http://localhost:3000/auth/facebook/callback',
		profileFields: ['id', 'first_name', 'photos', 'email', 'last_name']
	}, function (token, refreshToken, profile, done) {
		//logica si el usuario es nuevo o no, si se le va a registrar, etc.
		//pasamos el metodo done y el usuario ya esta autenticado.
		/*		Userprofiles.findOne({ username: profile.id }, function (err, user) {
  			if(err){
  				return done(err);
  			}
  			if(user){
  				console.log(user.name)
  				return done(null, user)
  			}else{
  				let user = new Userprofiles()
  
  				user.provider = profile.provider;
  				user.photo = profile.photos[0].value;
  				user.lastname = profile.name.familyName;
  				user.name = profile.name.givenName;
  				user.username = profile.id;
  
  				user.save(function(err){
  					if(err)
  						throw err;
  	      			return done(null, user);
  				})
  			}
  	    });
  */
		// QUERY APLICANDO POPULATE

		_userprofiles2.default.findOne({ username: profile.id }).populate({
			path: 'workplaces',
			populate: { path: 'enterprise' }
		}).exec(function (err, user) {
			if (err) {
				return done(err);
			}
			if (user) {

				/*					console.log(user.workplaces[0].enterprise.companyName)
    					console.log(user.workplaces[0].enterprise._id)
    					console.log(user)
    
    					let e_id = user.workplaces[0].enterprise._id;
    
    					Calls.find({enterprise_id : e_id}, (err, calls) => {
    						if(err){
    							return res.sendStatus(500).json(err)
    						}
    						console.log(calls)
    
    						if(calls){
    							let docs =  user.concat(calls);
    							
    							return done(null, docs)
    						}else{
    */
				return done(null, user);
				//						}
				//					})
			} else {
					(function () {
						var user = new _userprofiles2.default();

						user.provider = profile.provider;
						user.photo = profile.photos[0].value;
						user.lastname = profile.name.familyName;
						user.name = profile.name.givenName;
						user.username = profile.id;

						user.save(function (err) {
							if (err) throw err;
							return done(null, user);
						});
					})();
				}
		});
	}));

	/*
 *	logica passport linkedin
 */
	passport.use(new LinkedInStrategy({
		consumerKey: process.env.LINKEDIN_API_KEY,
		consumerSecret: process.env.LINKEDIN_SECRET_KEY,
		callbackURL: 'http://localhost:3000/auth/linkedin/callback',
		profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline', 'picture-url']
	}, function (token, tokenSecret, profile, done) {
		//logica si el usuario es nuevo o no, si se le va a registrar, etc.
		//pasamos el metodo done y el usuario ya esta autenticado.
		/*		Userprofiles.findOne({ username: profile.id }, function (err, user) {
  			if(err){
  				return done(err);
  			}
  			if(user){
  				return done(null, user)
  			}else{
  				let user = new Userprofiles()
  
  				user.provider = profile.provider;
  				user.position = profile._json.headline;
  				user.photo = profile._json.pictureUrl;
  				user.lastname = profile.name.familyName;
  				user.name = profile.name.givenName;
  				user.username = profile.id;
  
  				user.save(function(err){
  					if(err)
  						throw err;
  	      			return done(null, user);
  				})
  			}
  	    });
  */
		// ESTE QUERY ES APLICANDO POPULATE PARA OBTENER EL LUGAR DE TRABAJO
		_userprofiles2.default.findOne({ username: profile.id }).populate({
			path: 'workplaces',
			populate: { path: 'enterprise' }
		}).exec(function (err, user) {
			if (err) {
				return done(err);
			}
			if (user) {
				return done(null, user);
			} else {
				(function () {
					var user = new _userprofiles2.default();

					user.provider = profile.provider;
					user.position = profile._json.headline;
					user.photo = profile._json.pictureUrl;
					user.lastname = profile.name.familyName;
					user.name = profile.name.givenName;
					user.username = profile.id;

					user.save(function (err) {
						if (err) throw err;
						return done(null, user);
					});
				})();
			}
		});
	}));
};