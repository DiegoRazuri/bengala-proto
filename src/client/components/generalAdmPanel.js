/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom';
import EnterpriseAvatar from './enterpriseAvatar'
import AdmEnterpriseList from './admEnterpriseList'
import UserAvatar from './userAvatar'

export default class GeneralAdmPanel extends React.Component{
	constructor (props) {
		super(props);
		this.state = {
//			url_user_info: '/api/userprofile/'+user_id,
			enterpriseProfileImage : "#",
			admEnterpriseList : [],
			viewEnterpriseList : false,
			viewUserList : false,

		};
		
		this.changeEnterpriseListView = this.changeEnterpriseListView.bind(this);
		this.changeUserListView = this.changeUserListView.bind(this);
		this.loadUserInfo = this.loadUserInfo.bind(this);
		this.createNewEnterprise = this.createNewEnterprise.bind(this);
	}
	changeEnterpriseListView(){
		console.log("click en enterpriseAvatar")
		if(this.state.viewEnterpriseList != true){
		//	this.state.viewEnterpriseList = true;
			this.setState({
				viewEnterpriseList :true,
				viewUserList :false
			})
		}else{
			this.setState({viewEnterpriseList : false});
		}
	}
	changeUserListView(){
		console.log("click en enterpriseAvatar")
		if(this.state.viewUserList != true){
		//	this.state.viewEnterpriseList = true;
			this.setState({
				viewUserList :true,
				viewEnterpriseList : false
			})
		}else{
			this.setState({
				viewUserList : false
			});
		}
	}

	mountingChat(){
		this.props.changeViewStateChat.call(null)
	}

	createNewEnterprise(formdata){

		$.ajax({
            type:'POST',
            url: '/api/nueva_empresa', 
            processData: false,  // tell jQuery not to process the data
 			contentType: false,   // tell jQuery not to set contentType
            data:formdata,
            success:(data)=>{

/*
                let newWorkplaceId = data[1].workplaces.pop()
                let newKeyId = newWorkplaceId._id
                let newEnterpriseId = data[0]._id
                let newCompany = data[0].companyName
*/
                this.props.addUserWorkplace.call(null, data[1])
            	//let newInfo_workplace = this.state.user
                /*
                this.state.admEnterpriseList.push({
                	enterpriseName : newCompany,
                	enterpriseId : newEnterpriseId,
                	key_id : newKeyId
                });
*/
//                let newInfo = this.state.admEnterpriseList
                //this.setState({user: newInfo_workplace})
                
                ReactDom.unmountComponentAtNode(document.getElementById('wrapperCreateEnterpriseForm'));

                //updateState(d);
                //en el segundo elemento de la respuesta me llega la info del usuario                
            },
            error: function(data){
                console.log("error");
                console.log(data);
            }
        })
	}
	loadUserInfo(){



		$.ajax({
			type:'GET',
			url: '/api/userprofile/'+this.props.user._id,
			dataType: 'json',
			success: (data) => {
				if(data.workplaces.length > 0){
					data.workplaces.map((i)=>{
						if(i.status == 1){

							this.state.admEnterpriseList.push({

								enterpriseName : i.enterprise.companyName,
								enterpriseId : i.enterprise._id,
								key_id : i._id
							})
						}
					})
					let e = this.state.admEnterpriseList
					this.setState({admEnterpriseList: e});
					this.setState({enterpriseProfileImage: data.workplaces[0].enterprise.profileImage});
				}
				

			},
			error: (xhr, status, err) => {
				console.error('/api/userprofile/'+this.props.user._id, status, err.toString());
			}
		});

	}
	componentDidMount(){
		this.loadUserInfo();
		
	}
	showUserprofile(){
		this.props.showUserprofileView.call(null, this.props.user);
	}

	render(){

		let displayPicture;
		let listComponent;
		/*
		if(this.props.enterprise_data != undefined){
			this.props.user.workplaces.map((enterprise)=>{
				if(enterprise.enterprise._id == this.props.enterprise_data._id){
					console.log("este es el valor de enterp.enter.profileimage")
					console.log(enterprise.enterprise.profileImage)
					displayPicture = <EnterpriseAvatar enterpriseImage = {enterprise.enterprise.profileImage}/> 
					
				}
			})
		}*/
/*		let workplaces =[]
		if(this.props.user.workplaces.length > 0 ){
			workplaces = this.props.user.workplaces;
		}
		*/
		let enterpriseList;
		let userList;

		if(this.state.viewEnterpriseList == true){

			enterpriseList = <AdmEnterpriseList 
					user = {this.props.user} 
					createEnterprise={this.createNewEnterprise} 
					enterpriseSwitch = {this.props.enterpriseSwitch}/>
		}else{
			if(this.state.viewUserList == true){
				enterpriseList = <div className="admOptionList">
									<span className="triangle"></span>
									<ul>
										<li className="options listUnderline" onClick={this.showUserprofile.bind(this)}>
											mi cuenta
										</li>
										<li className="options">
											<a href="/logout"> cerrar sesión </a>
										</li>
									</ul>
								</div>
			}
		}




		return <div className="generalAdmPanel">
			<div className="wrapperBtnGeneralAdmPanel">
				<span className="icos btnGeneralPanel icon-users2"></span>
				<span className="icos btnGeneralPanel icon-comment" onClick={this.mountingChat.bind(this)}></span>
				<span className="icos btnGeneralPanel icon-notifications"></span>
				<EnterpriseAvatar 
					changeEnterpriseListView = {this.changeEnterpriseListView}
					enterprise_data = {this.props.enterprise_data}/>
				<UserAvatar 
					user={this.props.user}
					changeUserListView={this.changeUserListView}/>
			</div>
			{enterpriseList}
		</div>
	}
}