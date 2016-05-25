/*
*	module dependencies
*/
import React from 'react';
import BengalaApp from './bengalaApp'
import Loggin from './loggin'

export default class Layout extends React.Component{
	constructor (props){
		super(props);
		this.state={
			user : false,
			selected_enterprise_info : {}

		}

		this.addContact = this.addContact.bind(this);
		this.addUserWorkplace = this.addUserWorkplace.bind(this);
		this.enterpriseSwitch = this.enterpriseSwitch.bind(this);
		
	}
	isItLoggin(){
		$.ajax({
			type:'GET',
            url: '/api/usersession', 
            processData: false,  // tell jQuery not to process the data
 			contentType: false,   // tell jQuery not to set contentType
            cache:false,
            success: (res)=>{
            	if(res.user != false){

            		this.state.user = res;
            		let newInfo =  this.state.user;
/*
            		this.state.workplaces = res.workplaces;
            		let newInfo_workplaces = this.state.workplaces
*/
	            	let newInfo_selected_enterprise_info = {};

	            	if(res.workplaces.length > 0){
	            	// se debe recoorer y verificar que el en la primera q se encuentre con status 1 se muestre de lo contrario ha sido inactivada y no puede operar
	            		this.state.selected_enterprise_info = res.workplaces[0].enterprise;
	            		newInfo_selected_enterprise_info = this.state.selected_enterprise_info

	            	}

	            	this.setState({
	            		user : newInfo,
	            		selected_enterprise_info : newInfo_selected_enterprise_info,
//	            		workplaces : newInfo_workplaces
	            	})

	            	
            	}
               
            },
            error: function(data){
                console.log("error");
                console.log(data);
            }
        });
	}

	addContact(view_user_id){
		//este metodo debe cambiarse cuando implemente socket.io
		//primero se debe hacer una solicitud para agregar al contacto 
		//y con la confirmacion guardarlo
		console.log("agregando contacto, el contacto por agregar es este")
		console.log(view_user_id)

		let json = {}

		json.user_id = this.state.user._id;
		json.view_user_id = view_user_id;

		console.log(json)
		
		$.post('/api/agregar_contacto', json, function(res){
			console.log(res)
		})

	}

	enterpriseSwitch(enterpriseinfo){

		this.state.selected_enterprise_info = enterpriseinfo.enterprise;
		let newEnterpriseInfo = this.state.selected_enterprise_info;
		this.setState({
			selected_enterprise_info : newEnterpriseInfo
		})

		/*this.state.user.workplaces.map((i)=>{
			if(i.enterprise._id == enterprise_id){

			}
		})*/
	}

	addUserWorkplace(user_newInfo){
		//console.log("este es el selected_enterprise_id antes del setstate del newenterprise")
		//console.log(this.state.selected_enterprise_info)
		//console.log(user_newInfo)

		let newEnterprise = user_newInfo.workplaces.pop()
		this.state.user.workplaces.push(newEnterprise)
		let newUserInfo = this.state.user

		//let newEnterprise = user_newInfo.workplaces.pop()
		this.state.selected_enterprise_info = newEnterprise.enterprise
		let newInfo_selected_enterprise_info = this.state.selected_enterprise_info;
		this.setState({
			user: newUserInfo,
			selected_enterprise_info : newInfo_selected_enterprise_info
		});
		//console.log("este es el selected_enterprise_id despues del setstate del newenterprise")
		//console.log(this.state.selected_enterprise_info)
	}
	componentDidMount(){
		this.isItLoggin();
		
	}
	render(){
		
		var bengalaApp;
		
		if(this.state.user != false){
			bengalaApp = <BengalaApp
							addContact = {this.addContact}
							enterpriseSwitch = {this.enterpriseSwitch}
							user = {this.state.user}
							enterprise_data = {this.state.selected_enterprise_info}
							addUserWorkplace = {this.addUserWorkplace}/>
		//	bengalaApp = <div>bengala app</div>
		}else{
		
			bengalaApp = <Loggin/>
		}
		return <div>
			{bengalaApp}
		</div>

	}
}
/*
ReactDom.render(
	<Layout/>,
	document.getElementById('principalContainer')
	);
*/
