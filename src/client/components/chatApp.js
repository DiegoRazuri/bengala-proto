/*
*	module dependencies
*/
import React from 'react';
import WorkingStationList from './workingStationList'
import WorkingStationWidget from './workingStationWidget'
import uid from 'uid'
import io from 'socket.io-client'

export default class ChatApp extends React.Component{
	constructor (props){
		super(props);
		this.state={
	  		messages_in_stage : [],
			activeWS : 0,
	  		workingStations : [],
	  		currently_station_title : "",
	  		currently_station_subject : ""

		}
   
		this.addMessage = this.addMessage.bind(this);
		this.onChatSubmit = this.onChatSubmit.bind(this);
		this.switchWorkingStation = this.switchWorkingStation.bind(this);

/*
	if(this.props.workingStations.length > 0){

	  this.state.activeWS = this.props.workingStations.length -1; 
	}
*/
  	}
  	componentWillMount(){
  		//hacer load de los chats...

  		if(this.props.passingNewWorkingStation == true){


	        this.state.workingStations.push({
				administrator : this.props.newWorkingStation.administrator,
				station_title : this.props.newWorkingStation.station_title,
				station_subject : this.props.newWorkingStation.station_subject,
				participants : this.props.newWorkingStation.participants,
				_id : this.props.newWorkingStation.key_id,
				isItNew : true,
				messages : []
			});
			let newInfo = this.state.workingStations;

			let position = this.getLastWorkingStation() 

			this.setState({ 
				workingStations : newInfo,
//				messages_in_stage : newInfo.messages,
				currently_station_title : newInfo[0].station_title,
	  			currently_station_subject : newInfo[0].station_subject,
	  			activeWS : position

			})

			$.get('/api/allWorkingStations/' + this.props.user._id, (res) =>{
	  			console.log("esta es el res de allWorkingStations")
	  			console.log(res)
	  			for( let i = 0; i < res.workingStations.length; i++){
	  				//el servidor esta devolviendo el objeto usuario completo
	  				//deberia devolver solo las workingstations
	  				this.state.workingStations.push(res.workingStations[i])
	  			}
	  			
	  			let newInfo = this.state.workingStations

	  			
	  			this.setState({workingStations : newInfo})
	  		});
		  
		}else{

			$.get('/api/allWorkingStations/' + this.props.user._id, (res) =>{
				console.log("estas es la respuesta con ws")
	  			console.log(res)
	  			this.state.workingStations = res.workingStations;
	  			let newInfo = this.state.workingStations

	  			let  pos = this.getLastWorkingStation()

	  			this.setActiveWS(pos)

	  			this.setState({workingStations : newInfo})
  			});
		}

  		this.socket = io('http://localhost:3000')
  		//this.socket.emit('join', this.props.user._id)
  		this.socket.on('message', (message)=>{
  			console.log("mensage en willmount")
  			console.log(message)
// aca deberia recibir 2 estructuras diferentes. el objeto de ws completo si es nuevo
// O el objeto solo del msg si es una respuesta. el problema es q el obj msg esta 
// llegando con el valor de isirnew true porq en si es un nuevo mensaje pero deberia evaluarse 
// diferente para q se pueda diferencias de como agregar el mensaje correctamente.

  			if(message.isItNew == true){
  				console.log("valor de message devuelto por el socket")
  				console.log(message)
  				if(message.messages[0].user._id != this.props.user._id){
	  		
					this.addNewMessage(message)
		  					
	  			}

  			}else{
  				console.log("valor de message en respuesta socket")
  				console.log(message)
	  			if(message.user._id != this.props.user._id){
	  				

	  				this.addMessage(message, message.ws_id)
	  			
	  			}
  			}
  			
  		});
  	}

  	// DESPUES DE ENVIAR LO CAMBIO A FALSE EL WS Y DESPUES DE RECIBIR TMB LO DEBO CAMBIAR A FALSE
  	// EN EL ELSE DEL CHATSUBMIT SE DEBE AGREGAR EL ID DEL WS PARA Q AL LLEGAR AL OBJETIVO SE PUEDE UBICAR EN EL STATE

	onChatSubmit(message){
		let message_estructure;

		
		if(this.state.workingStations[this.state.activeWS].isItNew == true){

			console.log("la workingStation activa es true")
			console.log(this.state.workingStations[this.state.activeWS])
			// golpelo la base de datos grabando todo el workstation
			let message_e = {
				key_id : uid(),
				user : this.props.user,
				message : message,
				isItNewMessage : true
			}
			console.log("estructura del mensaje")
			console.log(message_e)

			this.addMessage(message_e, this.state.workingStations[this.state.activeWS]._id)
			let json = this.state.workingStations[this.state.activeWS]

			console.log("estructura del json")
			console.log(json)

			$.post('/api/new_workingStation', json, (res)=>{
				console.log(res)
				if(res.result == true){
//NO PUEDE LEER WORKINGSTATIONS DE UNDEFINED ACA   V    POR EL CONTEXTO
		// OJOOOOO ACA DEBERIA ESTAR RECIBIENDO EL OBJETO DEL WS COMPLETO Y GRABANDOLO
		// ES POSIBLE Y DEBO CAMBIARLO CUANDO TENGA TIEMPO			
					this.state.workingStations[this.state.activeWS]._id = res.ws._id
					message_estructure = this.state.workingStations[this.state.activeWS]
					console.log("valor message_estructure despues de ajax")
					console.log(message_estructure)


					this.socket.emit('message', message_estructure)
					this.state.workingStations[this.state.activeWS].isItNew = false;
				}
			});
			//this.state.workingStations[this.state.activeWS].messages.push(message_e)
		}else{
			// golpeo la base de datos grabando solo el mensaje
			message_estructure = {
				
				key_id : uid(),
				_id : "",
				user : this.props.user,
				message : message,
				ws_id : "",
				isItNewMessage : true
			
			}

			//let ws_id =  this.state.workingStations[this.state.activeWS]._id

			let json = {
				message : message_estructure,
				ws_id : this.state.workingStations[this.state.activeWS]._id
			}
			console.log(json)
			$.post('/api/new_message/', json, (res)=>{
				console.log("respuesta a new_message")
				console.log(res)
				message_estructure._id = res.msg_id
				message_estructure.ws_id = this.state.workingStations[this.state.activeWS]._id;
				this.addMessage(message_estructure, this.state.workingStations[this.state.activeWS]._id);
				this.socket.emit('message', message_estructure)
			});

			
		}
		console.log(message_estructure)


/***************=========	SI EXISTIESE UN PROBLEMA REVISAR ESTA 
							LINEA COMENTADA ABAJO					===========***********/
		//this.state.workingStations[this.state.activeWS].isItNew = false
		console.log("despues de setear a false")
		console.log(this.state.workingStations[this.state.activeWS].isItNew)

		
	}

  	addMessage(message, ws_id){
  		console.log("mensage en addMessage")
  		console.log(ws_id)
  		console.log(message)
  		//aca se debe buscar por id el working station al q corresponde el mensaje q esta llegando 
  		// y se hace el push donde corresponde
  		this.state.workingStations.map((station, index)=>{
  			if(station._id == ws_id){
				//this.state.workingStations[this.state.activeWS].messages.push(message)
				//let newInfo = this.state.workingStations;
  				this.state.workingStations[index].messages.push(message)
				let newInfo = this.state.workingStations;
				this.setState({ workingStations : newInfo })
  				
  			}
  		});
    }

    addNewMessage(message){
    	console.log("este es el valor de message dentro de addNewMessage")
    	console.log(message)
    	message.isItNew = false
    	console.log(message)
    	//deberia cambiar el isitnew a false antes de hacer push al workingstation
    	this.state.workingStations.push(message)
    	let newInfo = this.state.workingStations;
    	//this.state.workingStations[this.state.activeWS].isItNew = false
    	this.setState({workingStations:newInfo})
    }
    /*
    updateStageChat(){
    	this.state
    }
*/
    setActiveWS(newActiveWS){
    	this.state.activeWS = newActiveWS;

    	return newActiveWS 

    }

    getLastWorkingStation(){
    	if(this.state.workingStations.length > 0){
	    	let posLastWorkingStation = this.state.workingStations.length -1
    		return posLastWorkingStation
    	}else{
    		let posLastWorkingStation = 0
    		return posLastWorkingStation
    	}
    }

    switchWorkingStation(stationId){
    	console.log("click en list")
    	this.state.workingStations.map((ws, index)=>{
    		if(ws._id == stationId){
    			let newInfo = this.setActiveWS(index);

    			this.setState({activeWS : newInfo});
    		}
    	});
    }




	
	render(){
	/*

	let station_header
	if(this.state.workingStations.length != 0){
	  station_header = <WorkingStationWidget
						user = {this.props.user}
						addMessage = {this.addMessage}
						messages_in_stage = {this.state.messages_in_stage}
						station_title = {this.state.workingStations[0].station_title}
						station_subject = {this.state.workingStations[0].station_subject}/> 
	} else{
	  station_header = <div></div>
	}

*/
/*	var workingStations = {
		administrator : this.props.user,
		station_title : "titulo1",
		station_subject : "asunto1",
		participants : [{ name : "gus"}, {name : "diego"}],
	}
*/
		console.log("este es el workingStations")
		console.log(this.state.workingStations)
		/*
		let listWorkingStationStage;
		if(this.state.workingStations.length >0){

		}
*/
		return <div className="chatView">

					
					<WorkingStationWidget
						onChatSubmit = {this.onChatSubmit}
						currently_station_title = {this.state.workingStations[this.state.activeWS] != undefined ? this.state.workingStations[this.state.activeWS].station_title : this.state.currently_station_title}
						currently_station_subject = {this.state.workingStations[this.state.activeWS] != undefined ? this.state.workingStations[this.state.activeWS].station_subject : this.state.currently_station_subject}
						messages_in_stage = {this.state.workingStations[this.state.activeWS] != undefined ? this.state.workingStations[this.state.activeWS].messages : []}/>
					<WorkingStationList 
						switchWorkingStation = {this.switchWorkingStation}
						workingStations = {this.state.workingStations}/>
			</div>
		
	
	}
}

/*
						<WorkingStationList workingStations = {this.state.workingStations}/>
<div className="wrapperConversationsList">
				<div className="headerConversationsList">
					<span>ico</span>
					<p>CONVERSACIONES</p>
				</div>
				<ul>
					<li>
						<img src=""/>
						<p>
							Palqart General
						</p>
						<p>
							paul braga
						</p>
						<p>balblabla blabla bla</p>
						<p>15 feb</p>
					</li>
				</ul>
			</div>
			<div className="wrapperContactList">
				<div className="headerConversationsList">
					<span>ico</span>
					<p>RED DE CONTACTOS</p>
				</div>
				<ul>
					<li>
						<img src="#"/>
						<p>Nombre Apellido </p>
					</li>
				</ul>
			</div>
*/