import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import swig from 'swig'
import path from 'path'
import Calls from 'src/server/models/calls'
import http from 'http'
import socketio from 'socket.io'
import api from 'src/server/api'
import Userprofiles from 'src/server/models/userprofiles'

const passport = 
				require('passport');
				require('src/server/passport')(passport);


const app = express()
const server = http.createServer(app)
const io = socketio(server)
/*
*configuracion de zona horaria
*/

//process.env.TZ = ‘UTC+5’;


/* esto no debe estar harcodeado sino sacarlo de una variable DE ENTORNO l
   HAY Q SACARLO A UN ARCHIVO DE CONFIGURACION LA URL DE MONGOOSE
*/
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/bengala', function(err, res){
	if(err) throw err;
	console.log("conectado con exito a la base de datos");
})


// *** view engine *** //
/*
var swig_engine = new swig.Swig();
app.engine('html', swig_engine.renderFile);
app.set('view engine', 'html');
*/
// *** static directory *** //
app.set('views', path.join(__dirname, 'views'));

//antes de configurar los archivos estaticos se indica los parsers

app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
	//esta clave se deberia proteger importandola desde otro lado
	secret: '20554571230bengala@',
	resave: false,
	saveUninitialized: false
}))
app.use(express.static('public'))

app.use(passport.initialize())
app.use(passport.session())



app.get('/auth/twitter', passport.authenticate('twitter'))
app.get('/auth/twitter/callback', passport.authenticate('twitter', {
//	successRedirect : '/welcome',
	successRedirect : '/',
	failureRedirect : '/'
}));

app.get('/auth/facebook', passport.authenticate('facebook'))
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
//	successRedirect : '/welcome',
	successRedirect : '/',
	failureRedirect : '/'
}));


app.get('/auth/linkedin', passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] }))
app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
//	successRedirect : '/welcome',
	successRedirect : '/',
	failureRedirect : '/'
}))



app.get('/logout', (req, res) =>{
	req.logout()
	res.redirect('/')
})


app.use('/api', api)

app.get('*', function (req, res){
	res.sendFile(path.join(__dirname, '../../public', 'index.html'))
})
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

io.on('connection', (socket)=>{
	socket.on('message', (msg)=>{
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
server.listen(process.env.PORT || 3000, () => console.log("servidor iniciado"))
/*
PORT=80 LINKEDIN_SECRET_KEY=sUuJfZcShRm6MbrX LINKEDIN_API_KEY=771w9ponelb7k0 FACEBOOK_APP_ID=715593598509472 FACEBOOK_APP_SECRET=4b82d62979632cb84e84aca91a1693a8  TWITTER_CONSUMER_KEY=4EUcaY9Er9G0ACtZ9DwjAjvOS TWITTER_CONSUMER_SECRET=3gHfGvQXFCOONrFLdBInVY2Jd98flwEdXimwLVJxEJSR1HySGG npm run start
** con los accesos a S3 AWS
PORT=80 NKEDIN_SECRET_KEY=sUuJfZcShRm6MbrX LINKEDIN_API_KEY=771w9ponelb7k0 FACEBOOK_APP_ID=715593598509472 FACEBOOK_APP_SECRET=4b82d62979632cb84e84aca91a1693a8  TWITTER_CONSUMER_KEY=4EUcaY9Er9G0ACtZ9DwjAjvOS TWITTER_CONSUMER_SECRET=3gHfGvQXFCOONrFLdBInVY2Jd98flwEdXimwLVJxEJSR1HySGG AWS_ACCESS_KEY_ID=AKIAJV6K6JBOZHBJGRIQ AWS_SECRET_ACCESS_KEY=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 npm run serve

*/