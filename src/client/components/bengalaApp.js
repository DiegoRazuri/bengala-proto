import React from 'react';
import ReactDom from 'react-dom';
import GeneralAdmPanel from './generalAdmPanel'
import SellApp from './sellApp'
import CallApp from './callApp'
import SearchBox from './searchBox'
import ResultTable from './resultTable'
import Loggin from './loggin'
import EnterpriseprofileApp from './enterpriseprofileApp'
import UserprofileView from './userprofileView'
import WorkingStationForm from './workingStationForm'
import ChatApp from './chatApp'
import uid from 'uid'
import Page from 'page'
import CallDetailView from './callDetailView'

export default class BengalaApp extends React.Component{

	constructor (props){
		super(props);
		this.state={
			chats : [],
			allCalls : [],
			passingNewWorkingStation : false,
			newWorkingStation : {},
			results : [],
			providers: [],
			searchedEnterpriseView : [],
			viewStage : "calls",
			url_search : '/api/search/',
			url_enterprise_search : '/api/enterpriseprofile/',
			admEnterpriseList : {},
			enterpriseProfileImage : "#",

		}
/*_____________************		ADVERTENCIA		***************_____________*/
/*	Esta forma de obtener el user_id y e_id no es segura		*/

// METODOS EXPORTADOS A LOS ELEMENTOS HIJOS

		this.showUserprofileView = this.showUserprofileView.bind(this);
		this.addProvider = this.addProvider.bind(this);
		this.showUserprofileView = this.showUserprofileView.bind(this);
		this.mountingResultTable = this.mountingResultTable.bind(this);
		this.runSearch = this.runSearch.bind(this);
		this.changeViewStateCalls = this.changeViewStateCalls.bind(this);
		this.changeViewStateSells = this.changeViewStateSells.bind(this);
		this.changeViewStateEnterpriseprofile = this.changeViewStateEnterpriseprofile.bind(this);
		this.changeViewStateSearchResult = this.changeViewStateSearchResult.bind(this);
		this.loadSearchedEnterpriseViewData = this.loadSearchedEnterpriseViewData.bind(this);
		this.changeViewStateChat = this.changeViewStateChat.bind(this);
		this.mountingWorkingStationForm = this.mountingWorkingStationForm.bind(this);
		this.mountingNewWorkingStation = this.mountingNewWorkingStation.bind(this);
		this.updateCall = this.updateCall.bind(this);
		this.loadAllCalls = this.loadAllCalls.bind(this);

	}


	mountingNewWorkingStation(participantsList, station_title, station_subject){
		console.log("station_title dentro del mounting")
		console.log(station_title)
		this.state.newWorkingStation = {
			administrator : this.props.user._id,
			station_title : station_title,
			station_subject :  station_subject,
			participants : participantsList,
			// ESTE VA A SER EL ROOM_ID PARA IDENTIFICAR LAS 
			//CONVERSICIONES
			//evaluar si es suficiente mantener la app con estos ids /********/////**=======
			key_id : uid(10)

		};

		let newInfo = this.state.newWorkingStation

		this.setState({
			newWorkingStation : newInfo,
			passingNewWorkingStation : true
		}) 
		this.changeViewStateChat()
	}


	mountingWorkingStationForm(){
		ReactDom.render(
			<WorkingStationForm
				mountingNewWorkingStation = {this.mountingNewWorkingStation}
				user = {this.props.user}/>,
			document.getElementById('wrapperWorkingStationForm')
		);
	}


	showUserprofileView(user_info){
		document.getElementById('wrapperUserprofileView').style.display = 'block';
		ReactDom.render(
			<UserprofileView
				createChat = {this.createChat}
				showUserprofileView = {this.showUserprofileView}
				user = {this.props.user} 
				addContact = {this.props.addContact}
				view_user= {user_info}/>,
			document.getElementById('wrapperUserprofileView')
		);
	}


	mountingResultTable(ev){
		ev.preventDefault();

		this.runSearch()
	
	}


/*___________****** ADVERTENCIA *********_________________*/
/*	investigar si el metodo runSearch() es eficiente y respeta las buenas practicas  */

	runSearch(){
		let searchWord = document.getElementById('searchWord').value.trim()
		$.ajax({
			type: 'GET',
			url: this.state.url_search + searchWord,
			processData : false,
			contentType : false,
			cache:false,
			success: (res) =>{
				this.state.results = res;
				let newInfo = this.state.results;
	            this.setState({results: newInfo});
	            this.changeViewStateSearchResult()

			},
			error: function(data){
				console.log("error");
			}
		})
	}


	loadSearchedEnterpriseViewData(searchedEnterprise_id){

		$.ajax({
			type: 'GET',
			url: this.state.url_enterprise_search + searchedEnterprise_id,
			processData : false,
			contentType : false,
			cache:false,
			success: (res) =>{
				let obj = res[0]
				this.state.searchedEnterpriseView ={
					_id : obj._id,
					profileImage : obj.profileImage,
					total_average : obj.total_average,
					companyName : obj.companyName,
					descriptor :obj.descriptor,
					price_rating : obj.price_rating,
					quality_rating : obj.quality_rating,
					punctuality_rating : obj.punctuality_rating,
					customer_support_rating : obj.customer_support_rating,
					employees : obj.employees,
					client : obj.client,
					provider : obj.provider,
					offer : obj.offer,
					us : obj.us,
					catalogs : obj.catalogs,
					certifications : obj.certifications,
					awards : obj.awards,
					businessName : obj.businessName,
					awards : obj.awards,
					legalId : obj.legalId,
					phone : obj.phone,
					email : obj.email,
					phone : obj.phone,
					web : obj.web,
					address : obj.address,

				}

				
				let newInfo = this.state.searchedEnterpriseView;
	            this.setState({searchedEnterpriseView: newInfo});

	            this.changeViewStateEnterpriseprofile()
			},
			error: function(data){
				console.log("error");
			}
		})
		
	}


	addProvider ( provider_id, provider_profileImage ) {
		
//esto deberia cambiar y condicionar la seleccion en el caso la session exista
		if(this.props.user._id == false){
//se deben hacer un scrolldown hasta el div con los botones de login
			
		}else{

// var look es un flag
			let look = false;
// si se selecciona una perfil de usuario tengo que meterme en las propiedades del 
//objeto y detectar que si no tiene las mismas q un objeto enterprise
//no permita registrar.
//asi mismo debo identificar que si no existe la variable global user_id no 
//debe poder seleccionar empresas
			this.state.providers.map((provider, index)=>{

				if(provider.provider_id==provider_id){
					if(index == 0){
						this.state.providers.shift()
						let provider_new_info = this.state.providers;
						this.setState({providers: provider_new_info});
						look = true;
					}else{
						this.state.providers.splice(index, index);
						let provider_new_info = this.state.providers;
						this.setState({providers: provider_new_info});
						look = true;
					}
				}
			});

			if(look != true){

				this.state.providers.push({
					provider_id : provider_id,
					provider_profileImage : provider_profileImage
				})
				let providers_info = this.state.providers;
				this.setState({providers : providers_info });

			}
		}

	}

	loadAllCalls(){
		$.ajax({
			url: '/api/convocatorias/pendientes/'+this.props.enterprise_data._id,
			dataType: 'json',
			success: (data) => {
				this.setState({allCalls: data});
			},
			error: (xhr, status, err) => {
				console.error('/api/convocatorias/pendientes/'+this.props.enterprise_id, status, err.toString());
			}
		});
	}

	updateCall(formdata){
		$.ajax({
            type:'POST',
            url: '/api/nueva_convocatorias', 
            processData: false,  // tell jQuery not to process the data
 			contentType: false,   // tell jQuery not to set contentType
            data:formdata,
            cache:false,
            success: (res)=>{
                console.log("success");
                console.log(res);
                res.buyer_incharge = this.props.user
                this.state.allCalls.push(res);
                let newInfo = this.state.allCalls;

                this.setState({ allCalls : newInfo})
                //grabar informacion en calls state
                
                //this.state.allCalls.push()
                document.getElementById('wrapperCallDetailView').style.display="block";
                ReactDom.render(
                	<CallDetailView
                		callInfo = {res}
                		providers = {this.state.providers}/>,
                	document.getElementById('wrapperCallDetailView')
                	
                );
                ReactDom.unmountComponentAtNode(document.getElementById('wrapperCallForm'));
                document.getElementById('wrapperCallForm').style.display='none';

            },
            error: function(data){
                console.log("error");
                console.log(data);
            }
        });
	}

	componentWillMount(){
		if(this.props.enterprise_data != undefined){
			
			this.loadAllCalls();
		}

		
	}

	
/*
*	*************=========	METODOS QUE CAMBIAN EL VIEWSTAGE    ===================****************
*/
	changeViewStateCalls(){
		if(this.state.viewStage != 'calls'){
			this.state.viewStage = 'calls';
			let newStage = this.state.viewStage;
			this.setState({viewStage : newStage})
			
		}
	}
	changeViewStateSells(){
		if(this.state.viewStage != 'sells'){
			this.state.viewStage = 'sells';
			let newStage = this.state.viewStage;
			this.setState({viewStage : newStage})
			
		}
	}
	changeViewStateEnterpriseprofile(){
		if(this.state.viewStage != 'enterpriseprofile'){
			this.state.viewStage = 'enterpriseprofile';
			let newStage = this.state.viewStage;
			this.setState({viewStage : newStage})
		}
	}
	changeViewStateSearchResult(){
		if(this.state.viewStage != 'searchResult'){
			this.state.viewStage = 'searchResult';
			let newStage = this.state.viewStage;
			this.setState({viewStage : newStage})
		}
	}
	changeViewStateChat(){
		if(this.state.viewStage != 'chat'){
			this.state.viewStage = 'chat';
			let newStage = this.state.viewStage;
			this.setState({viewStage : newStage})
		}
	}

	
	render(){
		var viewStage;
		if(this.state.viewStage == "calls"){
			viewStage = <CallApp 
						showWorkingStationForm = {this.showWorkingStationForm}
						mountingWorkingStationForm = {this.mountingWorkingStationForm}
		            	user = {this.props.user}
						providers = {this.state.providers}
						allCalls = {this.state.allCalls}
						updateCall = {this.updateCall}
			            enterprise_id = {this.props.enterprise_data != undefined ? this.props.enterprise_data._id : null}/>
		        

		}else{
			if(this.state.viewStage == "sells"){
				viewStage = <SellApp 
		        		user = {this.props.user} 
		        		enterprise_id = {this.props.enterprise_data != undefined ? this.props.enterprise_data._id : null}/>
		        
			}else{
				if(this.state.viewStage == 'enterpriseprofile'){
					viewStage = <EnterpriseprofileApp
									createChat = {this.createChat}
									showUserprofileView = {this.showUserprofileView}
									enterprise_id = {this.props.enterprise_data != undefined ? this.props.enterprise_data._id : null}
									enterpriseInfo={this.state.searchedEnterpriseView}
									user = {this.props.user}/>
				}else{
					if(this.state.viewStage == 'searchResult'){
						viewStage = <ResultTable 
						loadSearchedEnterpriseViewData = {this.loadSearchedEnterpriseViewData}
						changeViewStateEnterpriseprofile = {this.changeViewStateEnterpriseprofile}
		    			addProvider= {this.addProvider}
		    			searchResults={this.state.results}
		    			user = {this.props.user}
		    			providers = {this.state.providers}
		    			enterprise_id = {this.props.enterprise_data != undefined ? this.props.enterprise_data._id : null}
		    			updateCall= {this.updateCall}/>
					}else{
						if(this.state.viewStage == 'chat'){
							viewStage = <ChatApp
										user = {this.props.user}
										passingNewWorkingStation = {this.state.passingNewWorkingStation}
										newWorkingStation = {this.state.newWorkingStation}/>
						}
					}
				}
			}
		}

		return <div className="appContainer container">
		    <div className="forms" id="wrapperCallForm"></div>
		    <div className="forms" id="wrapperQuotationForm"></div>
		    <div className="forms" id="wrapperCallDetailView"></div>
		    <div className="forms" id="wrapperCreateEnterpriseForm"></div>
		    <div className="forms" id="wrapperCalificationForm"></div>
		    <div className="forms" id="wrapperAddEnterpriseRelationForm"></div>
		    <div className="forms" id="wrapperUserprofileView"></div>
		    <div className="forms" id="wrapperWorkingStationForm"></div>
		    

			<header>
				<nav>
					<figure className="headerLogo">
						<img src="https://s3-sa-east-1.amazonaws.com/bengalasource/bengala-logo.png"/>
					</figure>

					<SearchBox mountingResultTable = {this.mountingResultTable}/>

					<GeneralAdmPanel 
						changeViewStateChat = {this.changeViewStateChat}
						showUserprofileView = {this.showUserprofileView}
						enterpriseSwitch = {this.props.enterpriseSwitch}
						user = {this.props.user}
						enterprise_data = {this.props.enterprise_data}
						addUserWorkplace = {this.props.addUserWorkplace}/>
				</nav>
			</header>
		    <nav className="panelUserPlattform">
		        <ul>
		            <li>
		                <p onClick={this.changeViewStateCalls.bind(this)} >Convocatorias</p>
		            </li>
		            <li>
		                <p onClick={this.changeViewStateSells.bind(this)}>Ventas</p>
		            </li>
		        </ul>
		    </nav>

		    <div id="contairnerPrinpipalComponents" className="contairnerPrinpipalComponents">
		    	
		    	{viewStage}
		    	
		    </div>

			
		    	
		</div>

	
	}
}

