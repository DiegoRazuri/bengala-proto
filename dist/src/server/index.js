'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _swig = require('swig');

var _swig2 = _interopRequireDefault(_swig);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _calls = require('src/server/models/calls');

var _calls2 = _interopRequireDefault(_calls);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _api = require('src/server/api');

var _api2 = _interopRequireDefault(_api);

var _userprofiles = require('src/server/models/userprofiles');

var _userprofiles2 = _interopRequireDefault(_userprofiles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var passport = require('passport');
require('src/server/passport')(passport);

var app = (0, _express2.default)();
var server = _http2.default.createServer(app);
var io = (0, _socket2.default)(server);
/*
*configuracion de zona horaria
*/

//process.env.TZ = ‘UTC+5’;

/* esto no debe estar harcodeado sino sacarlo de una variable DE ENTORNO l
   HAY Q SACARLO A UN ARCHIVO DE CONFIGURACION LA URL DE MONGOOSE
*/
_mongoose2.default.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/bengala', function (err, res) {
	if (err) throw err;
	console.log("conectado con exito a la base de datos");
});

// *** view engine *** //
/*
var swig_engine = new swig.Swig();
app.engine('html', swig_engine.renderFile);
app.set('view engine', 'html');
*/
// *** static directory *** //
app.set('views', _path2.default.join(__dirname, 'views'));

//antes de configurar los archivos estaticos se indica los parsers

app.use((0, _cookieParser2.default)());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _expressSession2.default)({
	//esta clave se deberia proteger importandola desde otro lado
	secret: '20554571230bengala@',
	resave: false,
	saveUninitialized: false
}));
app.use(_express2.default.static('public'));

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', {
	//	successRedirect : '/welcome',
	successRedirect: '/',
	failureRedirect: '/'
}));

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
	//	successRedirect : '/welcome',
	successRedirect: '/',
	failureRedirect: '/'
}));

app.get('/auth/linkedin', passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] }));
app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
	//	successRedirect : '/welcome',
	successRedirect: '/',
	failureRedirect: '/'
}));

app.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

app.use('/api', _api2.default);

app.get('*', function (req, res) {
	res.sendFile(_path2.default.join(__dirname, '../../public', 'index.html'));
});
/*
app.get('/', (req, res)=>{
	res.render('index',{
			title : 'bengala',
			user : req.user

		});

});
*/

/*
* DEBERIA ENVIAR EL PUERTO POR VARIABLE DE ENTORNO AL LADO DEL CLIENTE 
PORQ ESTA SETEADO CON LOCALHOST:3000 EN LA CHATAPP
*/

io.on('connection', function (socket) {
	socket.on('message', function (msg) {
		// aca deberia controlar el error
		io.sockets.emit('message', msg);
	});
	//luego tengo q hacer el envio pero cuando es una nueva ws
});

/*
io.on('connection', (socket)=>{
	socket.on('join', (user_id)=>{
//linea agregada
		socket.join(user_id)

		socket.on('message', (msg)=>{
			socket.join(msg.ws_id)
			io.to(msg.ws_id).emit('message', msg)
		})
		socket.join(msg.ws_id)
		io.to(msg.ws_id).emit('message', msg)

	});
	//luego tengo q hacer el envio pero cuando es una nueva ws
});
*/
server.listen(process.env.PORT || 3000, function () {
	return console.log("servidor iniciado");
});
/*
PORT=80 LINKEDIN_SECRET_KEY=sUuJfZcShRm6MbrX LINKEDIN_API_KEY=771w9ponelb7k0 FACEBOOK_APP_ID=715593598509472 FACEBOOK_APP_SECRET=4b82d62979632cb84e84aca91a1693a8  TWITTER_CONSUMER_KEY=4EUcaY9Er9G0ACtZ9DwjAjvOS TWITTER_CONSUMER_SECRET=3gHfGvQXFCOONrFLdBInVY2Jd98flwEdXimwLVJxEJSR1HySGG npm run start
** con los accesos a S3 AWS
PORT=80 NKEDIN_SECRET_KEY=sUuJfZcShRm6MbrX LINKEDIN_API_KEY=771w9ponelb7k0 FACEBOOK_APP_ID=715593598509472 FACEBOOK_APP_SECRET=4b82d62979632cb84e84aca91a1693a8  TWITTER_CONSUMER_KEY=4EUcaY9Er9G0ACtZ9DwjAjvOS TWITTER_CONSUMER_SECRET=3gHfGvQXFCOONrFLdBInVY2Jd98flwEdXimwLVJxEJSR1HySGG AWS_ACCESS_KEY_ID=AKIAJV6K6JBOZHBJGRIQ AWS_SECRET_ACCESS_KEY=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 npm run serve

*/