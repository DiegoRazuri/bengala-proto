/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom';
import CallForm from './callForm'

export default class CallControlPanel extends React.Component{
	//al boton le asigno la funcionalidad de cambiar state
	mountingCallForm(ev){
		ev.preventDefault();

        document.getElementById('wrapperCallForm').style.display = 'block';
        ReactDom.render(
			<CallForm 
                updateCall={this.props.updateCall}
                user = {this.props.user}
				providers = {this.props.providers}
                enterprise_id = {this.props.enterprise_id}/>,
			document.getElementById('wrapperCallForm')
		)
	
	}

	render(){
      
		return  <button  onClick={this.mountingCallForm.bind(this)} className="btnLaunchCallForm">Crear Convocatoria</button>
        
    }
}