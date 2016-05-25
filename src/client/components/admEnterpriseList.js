/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom';
import AdmEnterpriseRow from './admEnterpriseRow';
import CreateEnterpriseForm from './createEnterpriseForm';

export default class AdmEnterpriseList extends React.Component{
	
	mountingEnterpriseForm(ev){

		document.getElementById('wrapperCreateEnterpriseForm').style.display = 'block';
		ReactDom.render(
			< CreateEnterpriseForm createEnterprise ={this.props.createEnterprise} user={this.props.user}/>,
			document.getElementById('wrapperCreateEnterpriseForm')
		);
	}
	render(){

		return <div className="admEnterpriseList">
				<span className="triangle"></span>
				<ul>
					{
						

						this.props.user.workplaces.map((enterprise)=>{
							
							return <AdmEnterpriseRow
								enterpriseSwitch ={this.props.enterpriseSwitch}
								key = {enterprise._id}
								enterpriseInfo = {enterprise} />
						})
						
					}
					<li className="options" onClick={this.mountingEnterpriseForm.bind(this)}>crear empresa</li>
					
				</ul>
			</div>

	}
}