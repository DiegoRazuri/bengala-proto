import bodyParser from 'body-parser'
import express from 'express'
const router = express.Router()
const jsonParser = bodyParser.json()
//ESTA VARIABLE CREO Q NO SE ESTA USANDO
const urlencodedParser = bodyParser.urlencoded({ extended: true })
import Calls from 'src/server/models/calls'
import Enterpriseprofiles from 'src/server/models/enterpriseprofiles'
import Userprofiles from 'src/server/models/userprofiles'
import Relations from 'src/server/models/relations'
import Sells from 'src/server/models/providerQuotations'
import Messages from 'src/server/models/messages'
import WorkingStation from 'src/server/models/workingStations'

import multer from 'multer'
import fs from 'fs'


// CONFIGURACION SERVIDOR DE IMAGENES
var ObjectId = require('mongoose').Types.ObjectId; 
var AWS = require('aws-sdk');
var months = new Array("Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic");

//router.use(bodyParser.json({ type: 'application/*+json' }))
//router.use(bodyParser.urlencoded({ extended: false }));

var s3 = new AWS.S3({params: {Bucket: 'enterpriseprofilebengala'}})

function uploadToS3(destfileName, file_path, callback){
	s3.upload({
		ACL: 'public-read',
		Body: fs.createReadStream(file_path),
		Key: destfileName,
	}).send(callback);
}


// GET ENDPOINT BUSCADOR
router.get('/usersession', jsonParser, function ( req, res ){
	if(!req.user){
		res.json({user:false})
	}

//	res.json(req.user);
	Userprofiles.populate(req.user, {"path": "contacts"}, function (err, user){

		res.json(user);
	});
})

router.get('/search/:word', jsonParser, function (req, res){
	if (!req.body) return res.sendStatus(400)


		console.log(req.params.word)
		let regex = new RegExp(req.params.word, 'i');

/*============********    ADVERTENCIA     ******=========================*/

// HAY UN ESPACIO EN BLANCO EN SEARCHKEYWORDS POR DEFAULT EN EL MOMENTO DE CREACION 
// DE LA EMPRESA Q PERMITE QUE LAS EMPRESAS SEAN
// ENCONTRADAS POR EL BUSCADOR. SI LO QUITO DEJO DE ENCONTRARLAS.
//BUSCAR LA FORMA DE EVIAR ESO Y COMPROBAR SI AL INGRESAR KEYWORDS YA NO ES NECESARIO EL HACK
// O AVERIGUAR COMO MODIFICAR EL QUERY PARA QUE NO GENERE ESE ERROR

		Enterpriseprofiles.aggregate([
			//{$project : { companyName: 1, scores : 1, searchKeywords : 1}},
			//{$match: {searchKeywords: regex}},
			// PRESUMO QUE EN LA CONCATENACION EL VALOR DE BUSSINEESNAME Y DEMAS SON UNDEFINED ENTONCES SE DEBERIAN EXCLUIR AL HACER LA BUSQUEDA DE SER ASI PARA MEJORAR LA PERFORMANCE
			{$project : { fulltextsearch : {$concat : ['$companyName', ' ', '$businessName', ' ', '$industry', ' ', '$searchKeywords', ' ']}, companyName : 1, profileImage : 1, descriptor : 1, scores : 1}},
			{$match: {fulltextsearch: regex}},
			{$unwind: "$scores"},
			{$group: {
				_id: "$_id",
				profileImage: {$first : "$profileImage" },
				//este price debo quitarlo
//				price : {$avg : '$scores.price_rating'},
				//este legalId debo quitarlo
//				client : {$first : '$client'},
				//este scores debo quitarlo
				scores : {$first : '$scores'},
//				employees : {$first : '$employees'},
				descriptor: {$first : "$descriptor" },
				companyName: {$first : "$companyName" },
				total_average : { $avg : { $avg : ["$scores.price_rating", "$scores.quality_rating", "$scores.punctuality_rating", "$scores.customer_support_rating"] } },
			}},
			{ $sort : { total_average : -1 }},


		], (err, enterprise) => {
			if (err){
				return res.sendStatus(500).json(err);
			}
/*
		Enterpriseprofiles.aggregate([
			//{$project : { companyName: 1, scores : 1, searchKeywords : 1}},
			//{$match: {searchKeywords: regex}},
			// PRESUMO QUE EN LA CONCATENACION EL VALOR DE BUSSINEESNAME Y DEMAS SON UNDEFINED ENTONCES SE DEBERIAN EXCLUIR AL HACER LA BUSQUEDA DE SER ASI PARA MEJORAR LA PERFORMANCE
			{$project : { fulltextsearch : {$concat : ['$companyName', ' ', '$businessName', ' ', '$industry', ' ', '$searchKeywords']}, companyName : 1, profileImage : 1, descriptor : 1}},
			{$match: {fulltextsearch: regex}},
//			{$unwind: "$scores"},
			{$group: {
				_id: "$_id",
				profileImage: {$first : "$profileImage" },
				descriptor: {$first : "$descriptor" },
				companyName: {$first : "$companyName" },
//				total_average : { $avg : { $avg : ["$scores.price_rating", "$scores.quality_rating", "$scores.punctuality_rating", "$scores.customer_support_rating"] } },
			}}
//			{ $sort : { total_average : -1 }},


		], (err, enterprise) => {
			if (err){

				return res.sendStatus(500).json(err);
			}
*/
// SE DEBE AGREGAR UN POPULATE EN LA LINEA 66 PARA AGREGAR EL WORKPLACE DEL USUARIO
			Userprofiles.aggregate([
				{$project : { fullname : {$concat : ['$name', ' ', '$lastname']}, photo :1, position:1 }},
				{$match: {fullname: regex}},
			], (err, users) => {
				if (err){
					return res.sendStatus(500).json(err);
				}


	    		let result =  enterprise.concat(users);
				
				res.json(result)

			})

		})
/*
		// ESTUDIAR CUAL DE ESTAS FORMAS TIENE MEJOR PERFORMANCE QUE LA QUE ESTA ACTIVA
			Userprofiles.find({$text : { $search : req.params.word }}, (err, users) =>{
			Userprofiles.find({ name : new RegExp(req.params.word)}, (err, users) =>{

*/

});



//GET ENDPOINT CONVOCATORIAS POR EMPRESA

router.get('/convocatorias/pendientes/:enterprise_id', function (req, res){

	let e_id = req.params.enterprise_id;
	
/*	Calls.find({enterprise_id : e_id}, (err, docs) => {
		if(err){
			return res.sendStatus(500).json(err)
		}
		res.json(docs)
		console.log(docs)
	})
*/
	Calls.
		find({enterprise_id : e_id}).
		populate({ path : 'buyer_incharge' }).
//		populate({ path : 'providers_quotation', model : 'providerQuotation'}).
		populate({ path : 'providers_quotation'}).
		exec( function (err, calls_to_populate ){
			if(err){
				return res.sendStatus(500).json(err)
			}
			let options = {
				path : 'providers_quotation.in_charge',
				model : 'Userprofiles'
			};

			Calls.populate(calls_to_populate, options,function (err, callsFormat){

				let options = {
					path : 'providers_quotation.enterprise_id',
					model : 'Enterpriseprofiles'
				}

				Calls.populate(callsFormat, options, function ( err, callsOutput ){
					if(err)	throw err;
					
					res.json(callsOutput)
					console.log(callsOutput)
				})
			});
		});
});

/*
Sells.
	find({enterprise_id:e_id}).
	populate({ 
		path : 'call_reference'
	}).
	populate({
		path : 'in_charge'
	}).
	exec( function (err, sells){
		if(err){
			return res.sendStatus(500).json(err)
		}
		let options = {
			path : 'call_reference.buyer_incharge',
			model : 'Userprofiles'
		};

		Sells.populate(sells, options, function (err, sellsFormat){

			res.json(sellsFormat)
			console.log(sellsFormat)
		})
	});
*/

//GET ENDPOINT PERFILES EMPRESAS
//RECORDAR RECORDAR RECORDAR EN EL *** GET *** NO SE PUEDE USAR EL BODYPARSER, HAY Q ENVIAR LOS DATOS POR LA URL
router.get('/enterpriseprofile/:enterprise_id', ensureAuth, function (req, res){
/*
	let e_id = req.params.enterprise_id;

	console.log(e_id);

	Enterpriseprofiles.findById(e_id, (err, enterprise) =>{
		
		if(err){
			res.send("hubo un error");
		}

		res.json(enterprise);
		

	});
*/
	let e_id = req.params.enterprise_id;
	let user_id = new ObjectId(e_id);
	
	Enterpriseprofiles.aggregate([
		//{$project : { companyName: 1, scores : 1, searchKeywords : 1}},
		//{$match: {searchKeywords: regex}},
		// PRESUMO QUE EN LA CONCATENACION EL VALOR DE BUSSINEESNAME Y DEMAS SON UNDEFINED ENTONCES SE DEBERIAN EXCLUIR AL HACER LA BUSQUEDA DE SER ASI PARA MEJORAR LA PERFORMANCE
		//{$project : { fulltextsearch : {$concat : ['$companyName', ' ', '$businessName', ' ', '$industry', ' ', '$searchKeywords']}, us: 1, awards: 1, certifications: 1, catalogs: 1, us: 1, providers: 1, client: 1, employees: 1, scores: 1, companyName : 1, profileImage : 1, descriptor : 1, offer :1}},
		

		//{$match: {_id: user_id}},
		{$match: {_id: user_id}},
		{$unwind: "$scores"},
		{$group: {
			_id: "$_id",
			profileImage: {$first : "$profileImage" },
			total_average : { $avg : { $avg : ["$scores.price_rating", "$scores.quality_rating", "$scores.punctuality_rating", "$scores.customer_support_rating"] } },
			companyName: {$first : "$companyName" },
			descriptor: {$first : "$descriptor" },
			price_rating:{$avg : "$scores.price_rating"},
			quality_rating:{$avg : "$scores.quality_rating"},
			punctuality_rating:{$avg : "$scores.punctuality_rating"},
			customer_support_rating:{$avg : "$scores.customer_support_rating"},
			employees : {$first: "$employees"},
			//a estos se le debe aplicar populate
			client : {$first: "$client"},
			provider : {$first: "$provider"},
			offer : {$first: "$offer"},
			us : {$first: "$us"},
			businessName : {$first: "$businessName"},
			legalId : {$first: "$legalId"},
			phone : {$first: "$phone"},
			email : {$first: "$email"},
			web : {$first: "$web"},
			address : {$first: "$address"},
			//a estos creo q no se le debe aplicar populate
			catalogs : {$first: "$catalogs"},
			certifications :{$first: "$certifications"},
			awards :{$first: "$awards"},

		}}


	]).
	exec( function (err, enterprise ) {
		if(err){
			res.send("hubo un error");
		}
		Enterpriseprofiles.populate( enterprise, {"path": "employees"}, function (err, enterprise_w_employees){
			if(err) throw err;
			let options = {
				path : "employees.contacts",
				model : "Userprofiles"
			} 

			Enterpriseprofiles.populate( enterprise_w_employees, options, function (err, enterprise_w_employees_contacts){
				if(err) throw err;
				Enterpriseprofiles.populate( enterprise_w_employees_contacts, {"path": "client"}, function (err, enterprise_w_client){
					if(err) throw err;
				
					Enterpriseprofiles.populate( enterprise_w_client, {"path": "provider"}, function (err, final_result){
						if(err) throw err;

						console.log(final_result);
						res.json(final_result);
					});
				});
			});
			
		});
	/*
		Enterpriseprofiles.populate(enterprise, {"path":"employees"}, function(err, enterprise_w_employees){
			if(err) throw err;
			Enterpriseprofiles.populate(enterprise_w_employees, {})
		}).
			*/
	});

});

//GET ENDPOINT PERFILES USUARIOS
//RECORDAR RECORDAR RECORDAR EN EL *** GET *** NO SE PUEDE USAR EL BODYPARSER, HAY Q ENVIAR LOS DATOS POR LA URL
router.get('/userprofile/:user_id', ensureAuth, function (req, res){

	let u_id = req.params.user_id;

	

	Userprofiles.findById(u_id).
	populate({
		path : 'workplaces',
			populate : { path : 'enterprise' }
	}).
	exec( function (err, user ) {
		if(err){
			res.send("hubo un error");
		}
		console.log(user)
		res.json(user);
	});
/*	Userprofiles.findById(u_id, (err, userprofile) =>{
		
		if(err){
			res.send("hubo un error");
		}

		console.log(userprofile)
		res.json(userprofile);
		

	});
*/
});


//POST ENDPOINT NUEVA CONVOCATORIA

router.post('/nueva_convocatorias', ensureAuth, jsonParser, multer({ dest: 'public/enterpriseprofiles/calls/image_reference/'}).single('upl'), function (req, res){
	if (!req.body) return res.sendStatus(400)

		let c = req.body;
	
		

		let call = new Calls()

		if(req.file){

		    let file_store = "image_reference/" + req.file.filename + ".jpg"
		    let file_path = req.file.path.toString();


		    uploadToS3(file_store, file_path, function (err, data) {
		       /* if (err) {
		            console.error(err);
		            return res.status(500).send('fallo al subir a s3').end();
		        }
*/
				
		        let months = new Array("Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic");

				let f = new Date()
				
				call.opening_day = f.getDate();
				call.opening_month = months[f.getMonth()];
				call.opening_year = f.getFullYear(); 
		        call.buyer_incharge = c.buyer_incharge;
				call.enterprise_id = c.enterprise_id;
				call.closing_date = c.closing_date;
				call.closing_date_viewFormat = c.closing_date_viewFormat;
				call.image_reference = data.Location.replace(/"/g, '&quot;')
				console.log(call.image_reference);
				console.log(call._id)
				console.log(call.enterprise_id)


			// el status_call deberia ser una opcion tipo choices 
				call.status_call = 1
				call.titleCall = c.titleCall
		//		la fecha del deadline debe llegar en el formato adecuado para guardarla
		//		call.deadline = c.deadline
				call.budget = c.budget
				call.description_call = c.description_call
				call.payment_detail = c.payment_detail

				let to_format = c.providers;
				let providers = to_format.split(",")
				
				providers.map((provider, index)=>{
					let quotation = new Sells;
					quotation.enterprise_id = provider
					//quotation.answer_date = 
					//quotation.quantity =
					//quotation.item_name
					//quotation.item_description
					//quotation.attached
					//quotation.price
					quotation.call_reference = call._id
					quotation.save()
					call.providers_quotation.push(quotation._id);
				});
				console.log("se grabo esta info")
				console.log(call)

				call.save(function (err){
					if(err){
						res.sendStatus(500).json(err)
					}
					console.log("convocatoria del mes: ")
					console.log(call.opening_month);
					
					res.json(call)
				})
			})	
				
		}else{
		
	        var months = new Array("Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic");

			let f = new Date()
			
			call.opening_day = f.getDate();
			call.opening_month = months[f.getMonth()];
			call.opening_year = f.getFullYear(); 
		    call.buyer_incharge = c.buyer_incharge
			call.enterprise_id = c.enterprise_id
			call.closing_date = c.closing_date;
			call.closing_date_viewFormat = c.closing_date_viewFormat;
			// el status_call deberia ser una opcion tipo choices 
			call.status_call = 1
			call.titleCall = c.titleCall
	//		la fecha del deadline debe llegar en el formato adecuado para guardarla
	//		call.deadline = c.deadline
			call.budget = c.budget
			call.description_call = c.description_call
			call.payment_detail = c.payment_detail

			let to_format = c.providers;
			let providers = to_format.split(",")
			
			providers.map((provider, index)=>{
				let quotation = new Sells;
				quotation.enterprise_id = provider
				//quotation.answer_date = 
				//quotation.quantity =
				//quotation.item_name
				//quotation.item_description
				//quotation.attached
				//quotation.price
				quotation.call_reference = call._id
				quotation.save()
				call.providers_quotation.push(quotation._id);
			});

			call.save(function (err){
				if(err){
					res.sendStatus(500).json(err)
				}
				res.json(call)
				
			})

		}




});


//POST ENDPOINT CREAR NUEVA EMPRESA

router.post('/nueva_empresa', ensureAuth, jsonParser, multer({ dest: 'public/enterpriseprofiles/display_picture/'}).single('upl'), function (req, res){

	if (!req.body) return res.sendStatus(400)

		let e = req.body;
		console.log(e)
		
	    let file_store = "display_pictures/" + req.file.filename + ".jpg"
	    let file_path = req.file.path.toString();


	    uploadToS3(file_store, file_path, function (err, data) {
	        if (err) {
	            console.error(err);
	            return res.status(500).send('fallo al subir a s3').end();
	        }


			let enterprise = new Enterpriseprofiles()

			/*for (let v in e){
				console.log("el valor es : " + e[v]);
			}*/

			enterprise.companyName = e.companyName
			enterprise.descriptor = e.descriptor
			enterprise.profileImage = data.Location.replace(/"/g, '&quot;')
			//enterprise.bannerImage =
			enterprise.businessName = e.businessName
			enterprise.industry = e.industry
			enterprise.legalId = e.legalId
			enterprise.phone = e.phone
			enterprise.email = e.email
			enterprise.web = e.web
			enterprise.address = e.address
			enterprise.us = e.us
			enterprise.offer = e.offer
/*============********    ADVERTENCIA     ******=========================*/

// EL SETEAR EL ESPACIO EN BLANCO EN SEARCHKEYWORDS PERMITE QUE LAS EMPRESAS SEAN
// ENCONTRADAS POR EL BUSCADOR. SI LO QUITO DEJO DE ENCONTRARLAS.
			enterprise.searchKeywords = " "
			enterprise.account_manager = e.user_id
			enterprise.facebook_URL = e.facebook_URL
			enterprise.twitter_URL = e.twitter_URL
			enterprise.instagram_URL = e.instagram_URL
			enterprise.youtube_URL = e.youtube_URL
			enterprise.facebook_URL = e.facebook_URL
			enterprise.scores = [{
				punctuality_rating : "1",
				quality_rating : "1",
				customer_support_rating : "1",
				price_rating : "1"	
			}]
// PARA AGREGAR CATALOGOS Y CERTIFICACIONES DEBERIA SER COMO UNA VISITA GUIADA Y DAR 
//LA OPCION DE INICIARLA. CLICK EN EL BOTON VA PONIENDO A DISPOSICION LA API
// PARA IR SUBIENDO LA INFO PRIMERO DE CATALOGOS LUEGO DE EMPLEADOS, ETC.
			//enterprise.catalogs = e.catalogs
			//enterprise.employees = e.employees
			//enterprise.certifications = e.certifications
			enterprise.awards = e.awards
			enterprise.employees.push(e.user_id);



			enterprise.save(function (err){
				if(err){
					res.sendStatus(500).json(err)
				}
				Userprofiles.findOne({_id: e.user_id}, function (err, employed){
					if (err){
						res.send("huvo un error buscando al empleado")
					}
					if(employed){
						employed.workplaces.push({
							enterprise: enterprise,
							//status setteado en 1 significa actual
							status: 1
						});
						employed.save()
						let docs = [enterprise, employed]
						res.json(docs)
					}
				});
			})
	            
	    })

});


//POST ENDPOINT NUEVO CATALOGO

router.post('/nuevo_catalogo', ensureAuth, jsonParser, multer({ dest: 'public/enterpriseprofiles/catalogs/'}).single('upl'), function (req, res){
	if (!req.body) return res.sendStatus(400)


	    let file_store = "catalogs/" + req.file.filename + ".jpg"
	    let file_path = req.file.path.toString();


	    uploadToS3(file_store, file_path, function (err, data) {
	        if (err) {
	            console.error(err);
	            return res.status(500).send('fallo al subir a s3').end();
	        }
	        	

	        // la variable del _id deberia llegar por el body-parser
	        //  deberia obtener tmb el id del usuario q califica y grabarlo en el subdoc
			Enterpriseprofiles.findById('56fc44d72203484324d2425b', function(err, enterprise){
				
				let e = req.body;
				
				if(err)
					throw err;
				enterprise.catalogs.push({
					image: data.Location.replace(/"/g, '&quot;'),
					title_item: e.title_item
				});
				enterprise.save(function(err){
					if(err)
						throw err;
					console.log('se actalizaron los datos correctamente')
 				})
			})
	            
	    })
});


//POST ENDPOINT AGREGAR UNA RELACION

router.post('/agregar_cliente', ensureAuth, jsonParser, function (req, res){
// Nota: este endpoint recibe dos _id uno del enterprise y otro del cliente

	if (!req.body) return res.sendStatus(400)

		let c = req.body;

		let provider_id = c.provider_id

		Enterpriseprofiles.findOne({ _id: provider_id }, function (err, provider) {
			if(err){
				res.send("hubo un error")
			}
			if(provider){

				let client_id = c.client_id

				Enterpriseprofiles.findOne({_id: client_id}, function (err, client){
					if (err){
						res.send("huvo un error buscando al cliente")
					}

					if(client){
						
						provider.client.push(client);
						provider.save()

						client.provider.push(provider);
						client.save()


						console.log("se agrego como proveedor: " + client.provider)
						console.log("el cliente se agrego : "+ provider.client)
						
						//debo devolver los datos de la empresa agregada para actualizar los en la 
						// vista
						res.json({
							client : client,
							provider : provider
						})
					
					}else{

						res.send("no existe la empresa que estas agregando como cliente")
					}
				});		

			}else{
				res.send("no existe esa empresa")
			}
	    });
});


//POST ENDPOINT AGREGAR CONTACTO A USERPROFILE

router.post('/agregar_contacto', ensureAuth, jsonParser, function (req, res){
// Nota: este endpoint recibe dos _id uno del usuario q agrega y otro del contacto

	if (!req.body) return res.sendStatus(400)

		let c = req.body;


		let user_id = c.user_id

		Userprofiles.findOne({ _id: user_id }, function (err, userprofile) {
			if(err){
				res.send("hubo un error")
			}
			if(userprofile){

				let contact_id = c.view_user_id

				Userprofiles.findOne({_id: contact_id}, function (err, contact){
					if (err){
						res.send("huvo un error buscando al contacto")
					}

					if(contact){
						
						userprofile.contacts.push(contact);
						userprofile.save()

						contact.contacts.push(userprofile);
						contact.save()

						console.log("el usuario: " + userprofile.contacts)
						console.log("agrego como contacto a : "+ contact.contacts)
					
					}else{

						res.send("no existe el usuario que estas agregando como contacto")
					}
				});		

			}else{
				res.send("no existe ese usuario")
			}
	    });
});

//POST ENDPOINT AGREGAR EMPLEADOS

router.post('/agregar_empleado', ensureAuth, jsonParser, function (req, res){
// Nota: este endpoint recibe dos _id uno del empleado y otro de la empresa

	if (!req.body) return res.sendStatus(400)

		let c = req.body;


		let enterprise_id = c.input_value
		console.log(enterprise_id)

		Enterpriseprofiles.findOne({ _id: enterprise_id }, function (err, enterpriseprofile) {
			if(err){
				res.send("hubo un error")
			}
			if(enterpriseprofile){

				let employed_id = c.input_value_extra

				Userprofiles.findOne({_id: employed_id}, function (err, employed){
					if (err){
						res.send("huvo un error buscando al empleado")
					}

					if(employed){
						
						enterpriseprofile.employees.push(employed);
						enterpriseprofile.save()


						employed.workplaces.push({
							enterprise: enterpriseprofile,
							//status setteado en 1 significa actual
							status: 1
						})
						console.log("buen golpe!")
						employed.save()
// instanciar un workplace 
// extraer los datos de la empresa y grabar el workplace
// luego empujarlo o ver como se graba en el array 

//						client.provider.push(enterpriseprofile);
//						client.save()

//						console.log("se agrego como proveedor: " + client.provider)
//						console.log("el cliente se agrego : "+ enterpriseprofile.client)
					
					}else{

						res.send("no existe el usuario que estas agregando como empleado")
					}
				});		

			}else{
				res.send("no existe esa empresa")
			}
	    });
});

//POST ENDPOINT CALIFICACION DE EMPRESAS

router.post('/score', ensureAuth, jsonParser, function (req, res){

	if (!req.body) return res.sendStatus(400)
// El _ID  QUE SE ESTA GOLPEANDO DEBERIA LLEGAR POR EL BODYPARSE 
		let e_id = req.body.evaluated_enterprise_id
		console.log(e_id)
		Enterpriseprofiles.findById( e_id, (err, enterprise) =>{
			
			if(err){
				res.send("hubo un error");
			}

			let s = req.body;
			console.log(s)
			
			enterprise.scores.push({
				user_id : s.user_id,
				punctuality_rating : s.punctuality_score,
				quality_rating : s.quality_score,
				customer_support_rating : s.customer_support_score,
				price_rating : s.price_score	
			})

			enterprise.save(function(err){
				if(err) return handleError(err)
				console.log('success :o');
			});

			res.json(enterprise)

		});
		
});

/*
*	GET ENDPOINT VENTAS
*/

router.get('/sells/:e_id', ensureAuth, jsonParser, function (req, res){
	
	let e_id = req.params.e_id;

	Sells.
		find({enterprise_id:e_id}).
		populate({ 
			path : 'call_reference'
		}).
		populate({
			path : 'in_charge'
		}).
		exec( function (err, sells){
			if(err){
				return res.sendStatus(500).json(err)
			}
			let options = {
				path : 'call_reference.buyer_incharge',
				model : 'Userprofiles'
			};

			Sells.populate(sells, options, function (err, sellsFormat){

				res.json(sellsFormat)
				console.log(sellsFormat)
			})
		});
});
/*
* POST ENDPOINT ENVIO DE COTIZACIÓN
*/
router.post('/quotation', ensureAuth, jsonParser, multer({ dest: 'public/enterpriseprofiles/catalogs/'}).single('upl'), function (req, res){
	if (!req.body) return res.sendStatus(400)

	let file_store = "catalogs/" + req.file.filename + ".jpg"
    let file_path = req.file.path.toString();
    console.log(req.body)

    uploadToS3(file_store, file_path, function (err, data) {
        if (err) {
            console.error(err);
            return res.status(500).send('fallo al subir a s3').end();
        }
        	
        let q_id = req.body.quotation_id
        // la variable del _id deberia llegar por el body-parser
        //  deberia obtener tmb el id del usuario q califica y grabarlo en el subdoc
		Sells.findById(q_id, function(err, sell){
			
			let q = req.body;
			if(err)
				throw err;

			let date = new Date()

			sell.in_charge = q.in_charge;
			sell.answer_date = date;
			sell.answer_date_viewFormat = date.getDate() + ' ' + months[date.getMonth()] + ' ' +  date.getFullYear()
			sell.attached = data.Location.replace(/"/g, '&quot;');
			sell.quantity = q.quantity;
			sell.item_name = q.item_name;
			sell.price = q.price;
			sell.item_description = q.item_description;

			
			sell.save(function(err){
				if(err)
					throw err;
				console.log('se actalizaron los datos correctamente')
				})
				res.json(sell)
		})
            
	})
});
/*
// ENDPOINT PARA OBTENER CHATS
router.get('/chats', )
*/

router.post('/new_workingStation', ensureAuth, jsonParser, function (req, res) {
	if (!req.body) return res.sendStatus(400)

	let ws_data = req.body;
	console.log(ws_data)

	let workingStation = new WorkingStation()

	workingStation.administrator = ws_data.administrator;
	workingStation.station_title = ws_data.station_title;
	workingStation.station_subject = ws_data.station_subject;
	workingStation.typeOfChat = ws_data.typeOfChat;
	workingStation.room_id = ws_data.room_id;

	ws_data.participants.map((participant)=>{
		
		workingStation.participants.push(participant.id)
	})

	workingStation.messages.push({
		user : ws_data.messages[0].user._id,
		message : ws_data.messages[0].message
	});

	workingStation.save()

	ws_data.participants.map((user)=>{
		console.log("dentro de map")
		console.log(workingStation._id)
		let user_id = user.id;

		Userprofiles.findById(user_id, function(err, user){
			if (err) throw err;
			console.log("dentro del findById")
			console.log(user._id)

			user.workingStations.push(workingStation._id)
			user.save()
		})
	})
	res.json({
		ws : workingStation,
		result : true
	})
/*
// 	ESTA ES LA VERSION A **************************

	ws_data.participants.map((user)=>{

		let user_id = user.id;
		console.log("este es el id q se buscara en userprofiles")
		console.log(user_id)

		Userprofiles.findById(user_id, function(err, user){

			if(err) throw err;
			console.log("este es el nombre del user q se esta actualizando")
			console.log(user.name)

			let workingStation = new WorkingStation()


			workingStation.administrator = ws_data.administrator;
			workingStation.station_title = ws_data.station_title;
			workingStation.station_subject = ws_data.station_subject;
			workingStation.typeOfChat = ws_data.typeOfChat;
			workingStation.room_id = ws_data.room_id;

			ws_data.participants.map((participant)=>{
				console.log("esto es dentro del map de participants metiendo participants")
				console.log(user.workingStations.administrator)
				console.log(user.workingStations.participants)
				workingStation.participants.push(participant.id)
			})

			workingStation.messages.push({
				user : ws_data.messages[0].user._id,
				message : ws_data.messages[0].message
			});

			workingStation.save()
			user.workingStations.push(workingStation)

			user.save(function(err){
				if(err)
					throw err;
				console.log('se actalizaron los datos correctamente')
				})
			
		});

	})
	res.json({
		result : true
	})
	*/
});

router.post('/new_message/', ensureAuth, jsonParser, function ( req, res ){
	if (!req.body) return res.sendStatus(400)

	let ws_data = req.body;
//los participants son objetos construidos con solo 3 fields
// id, name (custom name = name + lastname ) y photo 

	WorkingStation.findById(ws_data.ws_id, function ( err, ws ){
		if (err) throw err;
		ws.messages.push({
			user : ws_data.message.user,
			message : ws_data.message.message
		})
		ws.save()
		let pos_new_msg = ws.messages.length -1
		res.json({result : true, msg_id : ws.messages[pos_new_msg]._id})
	});

	/*
	//ASI ERA ANTES
	exec(function(err, ws){
		
		ws.map((ws_unit)=>{
			ws_unit.messages.push({
				user : ws_data.message.user,
				message : ws_data.message.message
			})
			ws_unit.save()
		});
	});
*/
	/*
	ws_data.participants.map((user)=>{

		//let WorkingStation = new WorkingStation()
		let user_id = user.id;
		console.log("este es el id q se buscara en userprofiles")
		console.log(user_id)

		WorkingStation.find(
			{
				room_id : user_id,
				'workingStations.room_id' : ws_data.room_id 
			},
			{$push: { messages : ws_data.message }}
		).
		exec(function(err, ws){
			if(err) throw err;
			console.log("este es el objeto encontrado")
			console.log(ws)
	/*		ws.messages.push({
				user : ws_data.message.user._id,
				message : ws_data.message.message
			})
			ws.save(function(err){
				if(err)
					throw err;
				console.log('se actalizaron los datos correctamente')
				})

		});
*/
/*	
		user_id, function(err, user){
			let ws = user.workingStations

			ws.find({room_id:ws_data.room_id}, function(err, ws){
				if (err) throw err;
				console.log(ws)
			})
		if(err) throw err;
			console.log("este es el nombre del user q se esta actualizando")
			console.log(user.name)

			let workingStation = new WorkingStation()

			workingStation.administrator = ws_data.administrator;
			workingStation.station_title = ws_data.station_title;
			workingStation.station_subject = ws_data.station_subject;
			workingStation.typeOfChat = ws_data.typeOfChat;
			workingStation.room_id = ws_data.room_id;

			ws_data.participants.map((participant)=>{
				console.log("esto es dentro del map de participants metiendo participants")
				console.log(user.workingStations.administrator)
				console.log(user.workingStations.participants)
				workingStation.participants.push(participant.id)
			})

			workingStation.messages.push({
				user : ws_data.messages[0].user._id,
				message : ws_data.messages[0].message
			});

			workingStation.save()
			user.workingStations.push(workingStation)

			user.save(function(err){
				if(err)
					throw err;
				console.log('se actalizaron los datos correctamente')
				})
		});

	})
*/			
	


})

router.get('/allWorkingStations/:user_id', ensureAuth, jsonParser, function ( req, res ){
	let user_id = req.params.user_id;
/*
	Userprofiles.findById(user_id).
	exec(function(err, user){
		let options = {
			path : 'workingStations.participants',
			model : 'Userprofiles'
		}

		Userprofiles.populate(user, options, function (err, user_w_part){
			if (err) throw err;

			let options = {
				path : 'workingStations.messages.user',
				model : 'Userprofiles'
			}

			Userprofiles.populate( user_w_part, options, function (err, user_final_result){
				if(err) throw err;

				console.log("esta son las user_final_result")

				console.log(user_final_result)
				res.json(user_final_result)
			})
		})
	})
	*/
	Userprofiles.findById(user_id).

	populate({
		path : 'workingStations'
	}).

	exec( function (err, user_info){
		if (err) {return res.sendStatus(500).json(err)}
		
		let options = {
			path : 'workingStations.messages.user',
			model : 'Userprofiles'
		}
		
		Userprofiles.populate(user_info, options, function (err, ws_data){
			if (err) throw err;

			console.log(ws_data)
			res.json(ws_data)
		});
	})

/*


	Sells.
		find({enterprise_id:e_id}).
		populate({ 
			path : 'call_reference'
		}).
		populate({
			path : 'in_charge'
		}).
		exec( function (err, sells){
			if(err){
				return res.sendStatus(500).json(err)
			}
			let options = {
				path : 'call_reference.buyer_incharge',
				model : 'Userprofiles'
			};

			Sells.populate(sells, options, function (err, sellsFormat){

				res.json(sellsFormat)
				console.log(sellsFormat)
			})
		});

*/
});


function ensureAuth(req, res, next){
	if(req.isAuthenticated()){
		return next()
	}
	res.redirect('/')
}

export default router