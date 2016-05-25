
/*
*   module dependencies
*/
import React from 'react';
import WorkingStationRow from './workingStationRow';


export default class WorkingStationList extends React.Component{


    
    
    render(){


        return <div className="wrapperWorkingStationList">
                    <div className="headerWorkingStationList">
                        <span>ico</span>
                        <p>ESTACIONES DE TRABAJO</p>
                    </div>
                    <ul>
                        {
                            this.props.workingStations.map((station)=>{
                                return <WorkingStationRow
                                            switchWorkingStation = {this.props.switchWorkingStation}
                                            station = {station}
                                            key={station._id}/>
                            })
                        }
                    </ul>
                </div>
              
                
    }
    
}
