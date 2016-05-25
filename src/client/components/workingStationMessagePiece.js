
/*
*   module dependencies
*/
import React from 'react';
//import WorkingStationRow from './workingStationRow';

export default class WorkingStationMessagePiece extends React.Component{
    
    
    render(){
        console.log("info dentro de WorkingStationMessagePiece")
        console.log(this.props.user)

       
        return <div className="messagePiece">
                    <img src={this.props.user.photo}/>
                    <div className="textWrapper">
                        <p className="userMessageName">
                           {this.props.user.name} {this.props.user.lastname} 
                        </p>                    
                        <p className="message">{this.props.message}</p>
                    </div>
                </div>
      
                
    }
    
}


/*

<p>
    de {this.props.user.companyName}
</p>

// aparte

{
    let last_user_msg = ""
    this.props.messages.map((message)=>{
        if(message.user._id != last_user_msg){
            meto el img
            mensaje
            last_user_msg = message.user._id
        }else{
            meto mensaje
        }
    })
}
*/