/*
*	module dependencies
*/
import React from 'react';
import CallBox from './callBoxPiece'

export default class CallBoxTable extends React.Component{
	
	render(){
//		console.log(e_id)
		return <li>
			<figure>
	    		<img data-enterpriseId={this.props.provider_id} src={this.props.provider_profileImage} alt="providers"/>
	    	</figure>
		</li>
	}
}