/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom';
import CallDetailView from './callDetailView'


export default class BtnCallDetailView extends React.Component{
	
	mountingCallDetailView(){
		console.log("click en el btn call detail view")

		ReactDom.render(
			<CallDetailView
        		callInfo = {this.props.callInfo}/>,
        	document.getElementById('wrapperCallDetailView')
        	
		)
		document.getElementById('wrapperCallDetailView').style.display = 'block';
        

	}
	
	render(){
		
		return <p className="pieceCall pieceCallTitle" onClick={this.mountingCallDetailView.bind(this)}>{this.props.callInfo.titleCall}</p>
				

	}
}
