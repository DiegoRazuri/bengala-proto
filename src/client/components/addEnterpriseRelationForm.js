/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom';

export default class AddEnterpriseRelationForm extends React.Component{

	constructor (props){
		super(props);
		this.state={
			client : null,
			provider : null,

			url_add_enterprise_relation : '/api/agregar_cliente'

		}
		this.addAsClient = this.addAsClient.bind(this);
		this.addAsProvider = this.addAsProvider.bind(this);
		this.closeForm = this.closeForm.bind(this);
	}

	closeForm(ev){
		console.log("click en cerrar form")
		ReactDom.unmountComponentAtNode(document.getElementById('wrapperAddEnterpriseRelationForm'));
	}

	addAsClient (event){
		this.setState({ 
			client : event.target.value,
			provider : this.props.user_enterprise_id

		})
	}

	addAsProvider (event){
		this.setState({ 
			client : this.props.user_enterprise_id,
			provider : event.target.value

		})
	}
	

	handleEnterpriseRelationSubmit(ev){

		ev.preventDefault()

		console.log("dentro del submit handler")

		if(this.state.client != null && this.state.provider != null){
			
			let json = {
				client_id: this.state.client,
				provider_id: this.state.provider 
			}
			$.post(this.state.url_add_enterprise_relation, json, function (res){
				console.log(res)
				//aca tengo q ir a la props del enterpriseprofileApp y settear los cambios

			});
		}else{
			console.log("debe seleccionar una opcion todos los rubros")
		}
	}



	render(){
		console.log("dentro de Callform el enterprise_id es: "+ this.props.enterprise_id)


		return <div>
			<span onClick={this.closeForm.bind(this)}>close</span>

			<h2>Agrega como:</h2>
			<form id="formScore" onSubmit={this.handleEnterpriseRelationSubmit.bind(this)}>
	                    
	                    <radiogroup>
	                    	<label>Cliente</label>
	                        <input  name="client_relation" type="radio" value={this.props.added_enterprise_id} onChange={this.addAsClient} />
	                        <label>Proveedor</label>
	                        <input  name="provider_relation" type="radio" value={this.props.added_enterprise_id} onChange={this.addAsProvider}/>
	                    </radiogroup>
	                    <br/>
	                   
	                    <input type="submit" id="btnAddEnterpriseRelation"/>
	                </form>
		</div>
	}
}
/* es necesario definir un defaul para las props*/

