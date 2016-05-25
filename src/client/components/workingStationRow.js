
/*
*   module dependencies
*/
import React from 'react';
//import WorkingStationRow from './workingStationRow';

export default class WorkingStationRow extends React.Component{

    switchingWS(){
        this.props.switchWorkingStation.call(null, this.props.station._id)
    }
    
    render(){

        let last_msg_position = this.props.station.messages.length -1

        return <li onClick={this.switchingWS.bind(this)}>
                    <img src={this.props.station.messages[last_msg_position] != undefined ? this.props.station.messages[last_msg_position].user.photo : null}/>
                    <div className="wsRowWrapper">
                        <p className="wsRowTitle">
                           {this.props.station.station_title}
                        </p>
                        <p className="wsRowName">
                            {this.props.station.messages[last_msg_position] != undefined ? this.props.station.messages[last_msg_position].user.name : null} 
                            {this.props.station.messages[last_msg_position] != undefined ? this.props.station.messages[last_msg_position].user.lastname+":" : null}
                        </p>
                        <p className="wsRowMessage">{this.props.station.messages[last_msg_position] != undefined ? this.props.station.messages[last_msg_position].message : null}</p>
                    </div>
                   
                </li>
      
                
    }
    
}

/*
mas de 21 caracteres se debe cortar y agregar puntos suspensivos 
*/