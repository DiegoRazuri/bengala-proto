/*
* Module Dependencies
*/

import React from 'react'
import TeamRow from './teamRow'


export default class TeamTable extends React.Component{
    
    render(){
        console.log("esta es la info dentro del teamtable")
        console.log(this.props.team)
        return <div className="wrapperEnterpriseprofileContent">
            <h3>Red de Colaboradores</h3>
            <span className="underline"></span>
            <ul className="wrapperEnterpriseTeam">
                {
                    this.props.team.map((i)=>{
                        return <TeamRow 
                            key={i._id}
                            user = {this.props.user}
                            createChat = {this.props.createChat}
                            showUserprofileView = {this.props.showUserprofileView} 
                            person_info={i} />
                    })
                }
               
            </ul>
        </div>
    }
}

