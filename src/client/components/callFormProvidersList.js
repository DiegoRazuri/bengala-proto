/*
*	module dependencies
*/
import React from 'react';

export default class CallFormProvidersList extends React.Component{
	render(){
		return <li data-providerId = {this.props.providerDetail.provider_id}>
			<img className="CallFormlogoProvider" src={this.props.providerDetail.provider_profileImage}/>
		</li>
	}
}

/* es necesario definir un defaul para las props*/
//CallForm.defaulProps = {providers : [{ provider_id : "", provider_profileImage : ""}]}