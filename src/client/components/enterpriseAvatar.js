/*
*	module dependencies
*/
import React from 'react';

export default class EnterpriseAvatar extends React.Component{
	

	render(){
		return <figure className="btnGeneralPanel enterpriseAvatar" onClick={this.props.changeEnterpriseListView.bind(this)}>
			<img src={this.props.enterprise_data != undefined ? this.props.enterprise_data.profileImage : "#"}/>
			
		</figure>

	}
}