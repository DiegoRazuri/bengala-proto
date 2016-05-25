/*
*	module dependencies
*/
import React from 'react';
import EnterpriseScoreWidget from './enterpriseScoreWidget'

export default class ResultBox extends React.Component{
	onClick(ev){
		if(this.props.addingProvider){

			this.props.addingProvider.call(null, this.props.searchResults._id, this.props.searchResults.profileImage)
		}
		
	}
	showEnterpriseprofile(ev){
		if(this.props.loadSearchedEnterpriseViewData){
			this.props.loadSearchedEnterpriseViewData.call(null, this.props.searchResults._id)
			
			//this.props.changeViewStateEnterpriseprofile.call(null)
		}
	}

	render(){
		console.log("dentro de resultBox")
		console.log(this.props.searchResults)
		return <li className="resultBox" data-enterpriseId={this.props.searchResults._id}>
					<span onClick={this.onClick.bind(this)} className="icon-checkmark2 checkResult check checked"></span>
					<figure className="secResult wrapperLogoResult">
						<img onClick={this.showEnterpriseprofile.bind(this)} className="logoResult" src={this.props.searchResults.profileImage || this.props.searchResults.photo}/>
					</figure>
					<div className="resultBoxInfoWrapper">
						<EnterpriseScoreWidget
                            score = {this.props.searchResults.total_average}/>	
						
						<h2 onClick={this.showEnterpriseprofile.bind(this)} className="enterpriseNameResult">{this.props.searchResults.companyName || this.props.searchResults.fullname}</h2>
						<h3 className="enterpriseDescriptorResult">{this.props.searchResults.descriptor || this.props.searchResults.position}</h3>
						<p className="enterpriseOfferResult">{this.props.searchResults.offer}</p>	
					</div>

				</li>
	}
}