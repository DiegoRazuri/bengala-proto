
/*
*   module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom';
import WorkingStationMessagePiece from './workingStationMessagePiece'


export default class WorkingStationWidget extends React.Component{
    
    handleChatSubmit(ev){

    	ev.preventDefault()
    	console.log("se hizo submit al chat")

    	let chatEntry = ReactDom.findDOMNode(this.refs.chatEntry).value.trim()

		this.props.onChatSubmit.call(null, chatEntry)

		ReactDom.findDOMNode(this.refs.chatEntry).value = '';
		

    }


    render(){

	
        return <div className="chatStage">
			  		<div className="navIndividualChat">
			  			
			  			<h1>{this.props.currently_station_title}: </h1>
			  			<h2>{this.props.currently_station_subject}</h2>
			  			
			  			

			  		</div>
		  			<div className="chatWrapper">{
		  				this.props.messages_in_stage.map((messages)=>{

			  				return <WorkingStationMessagePiece
			  								key = { messages._id}
			       							user = {messages.user}
			       							message = {messages.message}/>
		  				})
		  			}
		  			</div>
		  			<div className="chatForm">
		  				<form onSubmit={this.handleChatSubmit.bind(this)}>
		  					<input type="text" ref="chatEntry"/>
		  				</form>
		  			</div>
		  		</div>
              
                
    }
    
}
