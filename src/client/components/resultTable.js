/*
*	module dependencies
*/
import React from 'react';
import ResultBox from './resultBox'
import BtnCreateCall from './btnCreateCall'

export default class CallDetailViewProviderAvatar extends React.Component{
	render(){

		return <div className="ResultsView">
			<div className="resultsControlPanel">

				<BtnCreateCall
                updateCall={this.props.updateCall}
                user = {this.props.user}
                providers = {this.props.providers}
                enterprise_id = {this.props.enterprise_id}/>
                
			</div>
			<ul className="resultBoxList">
						
				{

					this.props.searchResults.map((result)=>{
						return <ResultBox 
							loadSearchedEnterpriseViewData ={this.props.loadSearchedEnterpriseViewData}
							changeViewStateEnterpriseprofile = {this.props.changeViewStateEnterpriseprofile}
							key={result._id} 
							searchResults={result}
							addingProvider= {this.props.addProvider} />
					})
				}
			</ul>
		</div>
	}
}
//addingProvider = {this.props.addProvider}