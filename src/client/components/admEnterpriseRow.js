/*
*	module dependencies
*/
import React from 'react';

export default class AdmEnterpriseRow extends React.Component{

	excuteSwitch(){
		this.props.enterpriseSwitch.call(null, this.props.enterpriseInfo)
	}
		

	render(){
		return <li className="options listUnderline" onClick={this.excuteSwitch.bind(this)} data-enterpriseId={this.props.enterpriseInfo.enterprise._id} >{this.props.enterpriseInfo.enterprise.companyName}</li>

	}
}