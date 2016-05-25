/*
* Module Dependencies
*/

import React from 'react'


export default class TeamRow extends React.Component{

    
    showingUserprofile(){
        this.props.showUserprofileView.call(null, this.props.person_info)
    }


    creatingChat(){

        //participants = [{ isItAdmin : true, user: objUser}]
        
        let participants = [{ isItAdmin : false, user : this.props.person_info }, { isItAdmin : true , user :  this.props.user}]
        this.props.createChat.call(null, participants)
    }
    
    render(){
        console.log("dentro de Teamrow lo q sigue es la info q llega")
        console.log(this.props.person_info[0])
        return <li>
                    <img onClick={this.showingUserprofile.bind(this)} src={this.props.person_info.photo} alt="partner"/>
                    <p className="btnSendMessage" onClick={this.creatingChat.bind(this)}>enviar mensaje</p>
                    <p className="userName" onClick={this.showingUserprofile.bind(this)}> {this.props.person_info.name} {this.props.person_info.lastname}</p>
                    <p className="userPosition">{this.props.person_info.position}</p>
                </li>
           
    }
}

