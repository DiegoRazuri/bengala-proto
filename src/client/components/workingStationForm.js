/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom';
import UserAvatar from './userAvatar'
import uid from 'uid'

export default class WorkingStationForm extends React.Component{
	
	constructor (props){
		super(props);
		this.state={
			participants : []

		}
		this.addAsParticipant = this.addAsParticipant.bind(this);

		this.state.participants.push({
			id : this.props.user._id,
			photo : this.props.user.photo,
			name : this.props.user.name
		})
	}

	closeForm(ev){
		console.log("click en cerrar form")
		ReactDom.unmountComponentAtNode(document.getElementById('wrapperWorkingStationForm'));
	}

	addAsParticipant(event){
		console.log(event.target)
		let e = event.target
		let e_img = e.firstChild
		let user_photo = e_img.src;
		let user_id = e.dataset.contactid;
		let user_lastname = e.dataset.lastname
		let user_name = e.dataset.name

		let json = {
			id : user_id,
			photo : user_photo,
			name :  user_name + user_lastname
		}

		console.log(json)

		this.state.participants.push(json)
		let newInfo = this.state.participants
		this.setState({
			participants : newInfo
		})

	
	}

	handleWorkingStationSubmit(ev){
		ev.preventDefault()
		console.log("dentrod e submit workingStationForm")
// se comprueba q sea mayor a 1 por el primer participante siempre es el que crea el workingstation
		if(this.state.participants.length > 1){

			let station_title = ReactDom.findDOMNode(this.refs.station_title).value.trim()
			let station_subject = ReactDom.findDOMNode(this.refs.station_subject).value.trim()
			console.log("station_title dentro del form")
			console.log(station_title)
			this.props.mountingNewWorkingStation.call(null, this.state.participants, station_title, station_subject)
			this.closeForm()
/*
			let typeOfChat = 0;
			let messages = []

			let formdata = new FormData();

			formdata.append('Content-Type', 'multipart/formdata');
			formdata.append( "station_title", station_title);
			formdata.append( "station_subject", station_subject);

			formdata.append( "administrator", this.props.user._id);
			formdata.append( "typeOfChat", typeOfChat);

			
			let guests_ids = this.state.guests_ids
			JSON.stringify(guests_ids)

			formdata.append("guests", guests_ids);


			//debo obtener los datos del provider seleccionado y meterlo en participantes. 
			//luego hacer el setstate de los datos

			//metodo ajax enviando informacion y seteandola en los states superiores

			//persistencia de datos
			let workingStationObj = {
				administrator : this.props.user
				wTitle: station_title,
				subject : station_subject,
				// 0 quiere decir workingstation
				typeOfChat : 0,
				participants : [{
					isItAdmin : true,
					user : this.props.user
				}]
			}
			console.log(workingStationObj)

			this.props.createWorkingStation(workingStationObj)
			this.closeForm()
//			this.props.changeViewStateChat()
			ReactDom.findDOMNode(this.refs.station_title).value = '';
			ReactDom.findDOMNode(this.refs.station_subject).value = '';
			ReactDom.findDOMNode(this.refs.station_guests).value = '';
		*/
		}else{
			console.log(" CHAT!: deberia mostrar un mensaje diciendo: se debe elegir al menos un invitado.")
		}
	}


	render(){

		let contacts = []
	
		for(let i = 0; i < this.props.user.contacts.length; i++ ){

			let key_id = uid()
			contacts.push( <li onClick={this.addAsParticipant} 
								key = {this.props.user.contacts[i]._id}
								data-contactId={this.props.user.contacts[i]._id}
								data-name={this.props.user.contacts[i].name}
								data-lastname = {this.props.user.contacts[i].lastname}>
									<img src={this.props.user.contacts[i].photo}/>
									{this.props.user.contacts[i].name} {this.props.user.contacts[i].lastname}
							</li>)
		}

		return <form ref="workingStationForm" onSubmit={this.handleWorkingStationSubmit.bind(this)}>
            <span onClick={this.closeForm.bind(this)}>close</span>
            <h1>Crea una estación de trabajo</h1>
            <label>Nombre de la estación</label>
            <input type="text" ref="station_title" />
           
            <input  type="text" ref="station_guests" />
            <ul>
            	{contacts}
            </ul>
            <input type="textarea" ref="station_subject"/>
            <div>
            	<p>Contactos invitados:</p>
            	{
            		this.state.participants.map((user)=>{

            			return <UserAvatar 
            			key={user.id}
            			user={user}/>
            		})
            	}
            </div>
            <input value="Crear" type="submit"/>

            
        </form>

	}
}