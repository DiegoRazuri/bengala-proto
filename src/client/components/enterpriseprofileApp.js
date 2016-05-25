/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'
import BengalaApp from './bengalaApp'
import CalificationForm from './calificationForm'
import AddEnterpriseRelationForm from './addEnterpriseRelationForm'
import TeamTable from './teamTable'
import EnterpriseRelationsTable from './enterpriseRelationsTable'
import EnterpriseUsTable from './enterpriseUsTable'
import EnterpriseCatalogForm from './enterpriseCatalogForm'
import EnterpriseScoreWidget from './enterpriseScoreWidget'
import EnterpriseScoreTable from './enterpriseScoreTable'


export default class EnterpriseprofileApp extends React.Component{

	constructor (props){
		super(props);
		this.state={
			//setear luego este state en default: score
			viewStageEnterpriseprofile : "enterpriseRealtions",

//			url_search : '/api/search/',
//			url_enterprise_search : '/api/enterpriseprofile/',
//			url_user_info: '/api/userprofile/'+ this.props.user._id,
//			admEnterpriseList : {},
//			enterpriseProfileImage : "#",

		}
		this.changeViewStateTeam = this.changeViewStateTeam.bind(this);
		this.changeViewStateEnterpriseRelations = this.changeViewStateEnterpriseRelations.bind(this);
//		this.loadSearchedEnterpriseViewData = this.loadSearchedEnterpriseViewData.bind(this);

	}

	changeViewStateTeam(){
		if(this.state.viewStageEnterpriseprofile != 'team'){
			this.state.viewStageEnterpriseprofile = 'team';
			let newStage = this.state.viewStageEnterpriseprofile;
			this.setState({viewStageEnterpriseprofile : newStage})
			
		}
	}
	changeViewStateEnterpriseRelations(){
		if(this.state.viewStageEnterpriseprofile != 'enterpriseRealtions'){
			this.state.viewStageEnterpriseprofile = 'enterpriseRealtions';
			let newStage = this.state.viewStageEnterpriseprofile;
			this.setState({viewStageEnterpriseprofile : newStage})
			
		}
	}
	changeViewStateUs(){
		if(this.state.viewStageEnterpriseprofile != 'us'){
			this.state.viewStageEnterpriseprofile = 'us';
			let newStage = this.state.viewStageEnterpriseprofile;
			this.setState({viewStageEnterpriseprofile : newStage})
			
		}
	}
	changeViewStateScore(){
		if(this.state.viewStageEnterpriseprofile != 'scoreDetail'){
			this.state.viewStageEnterpriseprofile = 'scoreDetail';
			let newStage = this.state.viewStageEnterpriseprofile;
			this.setState({viewStageEnterpriseprofile : newStage})
			
		}
	}


	mountingCalificationForm(ev){
		ev.preventDefault();
		console.log("mostrar form");
		
		ReactDom.render(
			<CalificationForm 
				user_id = {this.props.user._id}
				evaluated_enterprise_id = {this.props.enterpriseInfo._id}/>,
			document.getElementById('wrapperCalificationForm')
		);

	}
	mountingAddEnterpriseRelationForm(ev){
		ev.preventDefault();
		console.log("mostrar form");
		
		ReactDom.render(
			<AddEnterpriseRelationForm 
				user_enterprise_id = {this.props.enterprise_id}
				added_enterprise_id = {this.props.enterpriseInfo._id}/>,
			document.getElementById('wrapperAddEnterpriseRelationForm')
		);

	}
	render(){ 
		console.log("esta es la info q llega en enterpriseInfo")
		console.log(this.props.enterpriseInfo)


		var viewStageEnterpriseprofile;
		if(this.state.viewStageEnterpriseprofile == "score"){
			viewStageEnterpriseprofile = <ScoreTable/>

		}else{
			if(this.state.viewStageEnterpriseprofile == "team"){
				viewStageEnterpriseprofile = <TeamTable 
											user = {this.props.user}
											createChat = {this.props.createChat}
											showUserprofileView = {this.props.showUserprofileView}
											team = {this.props.enterpriseInfo.employees}/>
			}else{
				if(this.state.viewStageEnterpriseprofile == "enterpriseRealtions"){

					viewStageEnterpriseprofile = <EnterpriseRelationsTable
												client ={this.props.enterpriseInfo.client}
												provider ={this.props.enterpriseInfo.provider}/>
				}else{
					if(this.state.viewStageEnterpriseprofile == "us"){

						viewStageEnterpriseprofile = <EnterpriseUsTable
													us ={this.props.enterpriseInfo}/>
				
					}else{
						if(this.state.viewStageEnterpriseprofile == "scoreDetail"){
							viewStageEnterpriseprofile = <EnterpriseScoreTable
															quality_rating = {this.props.enterpriseInfo.quality_rating}
															punctuality_rating = {this.props.enterpriseInfo.punctuality_rating}
															customer_support_rating = {this.props.enterpriseInfo.customer_support_rating}
															price_rating = {this.props.enterpriseInfo.price_rating}/>
						}
					}
				}

			}
		}


		return <div className="entepriseprofileView">
		    <div className="asideEnterpriseprofileView">
		        <figure className="enterpriseImage">
		            <img src={this.props.enterpriseInfo.profileImage}/>
		        </figure>
		        <div className="wrapperBtnHeaderEnterpriseView">
		        	
		            <EnterpriseScoreWidget score = {this.props.enterpriseInfo.total_average}/>
		            

		            <button className="btnAddEnterprise" onClick={this.mountingAddEnterpriseRelationForm.bind(this)}>agregar</button>
		            <button className="btnCalification" onClick={this.mountingCalificationForm.bind(this)} >calificar</button>
		            <button className="btnQuotation" >cotizar</button>
		        </div>
		        <nav className="navigationEnterpriseprofileView">
		            <div className="navigationHeader">
		                <h1>{this.props.enterpriseInfo.companyName}</h1>
		                <h2>{this.props.enterpriseInfo.descriptor}</h2>
		            </div>
		            <div className="btnEntepriseprofileNav">
		            	<div onClick={this.changeViewStateScore.bind(this)}>
			                <span className="icon-award"></span>
			                <p>Calificación</p>
		            	</div>
		            </div>
		            <div className="btnEntepriseprofileNav">
		            	<div onClick={this.changeViewStateTeam.bind(this)}>
			                <span className="icon-users"></span>
			                <p>Colaboradores</p>
		            	</div>
		            </div>
		            <div className="btnEntepriseprofileNav">
		            	<div onClick={this.changeViewStateEnterpriseRelations.bind(this)}>
			                <img className="icoImg_clientes_proveedores" src="https://s3-sa-east-1.amazonaws.com/bengalasource/adduser.png"/>
			                <p className="btnTextWithoutIco">Clientes y Proveedores</p>
		            	</div>
		            </div>
		        </nav>        
		    </div>

		    <div className="contentEnterpriseprofileView">
		        <figure className="enterpriseprofileBanner">
		            <img src="#" alt="banner"/>
		        </figure>
		        <nav>
		            <ul>
		                <li>
		                    <p onClick={this.changeViewStateUs.bind(this)}>Nosotros</p>
		                </li>
		                <li>
		                    <p>Catálogo</p>
		                </li>
		                <li className="lastBtnNavEnterpriseContent">
		                    <p>Reconocimientos</p>
		                </li>                
		            </ul>
		        </nav>
		        

		        <div className="viewStageEnterpriseprofileComponents" id="viewStageEnterpriseprofileComponents">
		        	{viewStageEnterpriseprofile}
		        </div>
		       
		    </div>

		</div>
	}
}
//		        <EnterpriseCatalogForm/>