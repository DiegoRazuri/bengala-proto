/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom';
import CallForm from './callForm';
import BtnCreateCall from './btnCreateCall'

export default class CallControlPanel extends React.Component{
	//al boton le asigno la funcionalidad de cambiar state
/*	
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
*/
	render(){
        console.log("dentro de callControlPanel el enterprise_id es: "+ this.props.enterprise_id)

		return <div className = "callControlPanel">
			<nav>
                <ul className="wrapperBtnsCalls">
                    <li className="btnNavFilterSeparator">
                        <span>33</span>
                        <a href="#">Todo</a>
                    </li>
                    <li className="btnNavFilterSeparator">
                        <span>33</span>
                        <a href="#">Personales</a>
                    </li>
                    <li className="btnNavFilterSeparator">
                        <span>33</span>
                        <a href="#">Abiertas</a>
                    </li>
                    <li className="btnNavFilterSeparator">
                        <span>33</span>
                        <a href="#">Atendidas</a>
                    </li>
                    <li>
                        <span>33</span>
                        <a href="#">Cerradas</a>
                    </li>
                </ul>
            </nav>
			<BtnCreateCall
                updateCall={this.props.updateCall}
                user = {this.props.user}
                providers = {this.props.providers}
                enterprise_id = {this.props.enterprise_id}/>
        </div>
    }
}
/*
    <button  onClick={this.mountingCallForm.bind(this)} className="btnCreateCall">Crear Convocatoria</button>
			<div>
                <p>searcher</p>
                <p>filtro</p>
            </div>
            */