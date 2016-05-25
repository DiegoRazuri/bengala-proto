/*
*	module dependencies
*/
import React from 'react';
import CallBox from './callBoxPiece'

export default class CallBoxTable extends React.Component{
	
	render(){
		
		return <div id="callBoxListWrappers" className="callBoxList">
			<ul className="callBoxTableTitles">
				<li className="buyerField">Comprador</li>
				<li className="calltitleField">Convocatoria</li>
				<li>Estado</li>
				<li>Apertura</li>
				<li>Cotizaciones</li>
				<li>Proveedores</li>
			</ul>

					
			{
				this.props.calls.map((call)=>{
					return <CallBox 
						mountingWorkingStationForm = {this.props.mountingWorkingStationForm}
						user = {this.props.user}
						showWorkingStationForm = {this.props.showWorkingStationForm}
						key={call._id} 
						callInfo={call} />
				})
			}
		</div>
	}
}