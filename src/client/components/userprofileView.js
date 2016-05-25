/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom'
import TeamRow from './teamRow'


export default class Userprofileview extends React.Component{
	closeForm(ev){
        console.log("click en cerrar userprofileview")
        ReactDom.unmountComponentAtNode(document.getElementById('wrapperUserprofileView'));
        document.getElementById('wrapperUserprofileView').style.display = 'none';
    }

    addingContact(){
        this.props.addContact.call(null, this.props.view_user._id)
    }

	render(){
        console.log(this.props.view_user)
        console.log(this.props.view_user.workplaces)
        let contacts_lenght = this.props.view_user.contacts.length
        let workplaces = [];

        for(let i = 0; i<this.props.view_user.workplaces.length; i++){
            if(this.props.view_user.workplaces[i].status == 1){

                workplaces.push(<li key={this.props.view_user.workplaces[i]._id}>{this.props.view_user.workplaces[i].enterprise.companyName}</li>)
            }
        }

        let btnAddContact;
        let btnSendMessage;
        if(this.props.view_user._id != this.props.user._id ){
            btnAddContact = <button className="addContact" onClick={this.addingContact.bind(this)}>conectar</button>
            btnSendMessage = <button className="sendMessage">enviar mensaje</button>
        }else{
            btnAddContact = null
            btnSendMessage = null
        }

		return <div className="wrapperContentUserprofileView">
        <span className="icoClose icon-cancel" onClick={this.closeForm.bind(this)}></span>
        <div className="userprofileContent">
            <div className="gridA">
                <figure>
                    <img src={this.props.view_user.photo}/>
                </figure>
                <div className="wrapperBtnActionsUserprofile">
                    {btnAddContact}
                    {btnSendMessage}

                </div>
            </div>
            <div className="gridB">
                <span className="nameContact">
                    <h1>{this.props.view_user.name} {this.props.view_user.lastname}</h1>
                    <h2>{this.props.view_user.position}</h2>
                </span>
                <ul className="infoContact">
                    <li>
                        <span className="icon-mobile"></span>
                        <p>{this.props.view_user.phone_number}</p>
                    </li>
                    <li>
                        <span className="icon-envelope"></span>
                        <p>{this.props.view_user.email}</p>
                    </li>
                    
                </ul>
            </div>
            <div className="gridC">
                <div className="btnUserprofiles">
                    <span className="icon-suitcase"></span>
                    <p>Actualmente en</p>
                    
                </div>
                <div className="btnUserprofiles">
                    <span className="icon-users2"></span>
                    <p>Red de Contantos</p>
                    <p className="contactLenght">{contacts_lenght}</p>
                </div>
            </div>
            <div className="gridD">
                    
                <ul>
                    {
                        this.props.view_user.contacts.map((i)=>{
                            return <TeamRow
                                key = {i._id}
                                showUserprofileView = {this.props.showUserprofileView}
                                person_info = {i}/>
                        })
                    }
                </ul>

            </div>

        </div>
    </div>

	}
}



                