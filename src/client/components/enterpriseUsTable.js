/*
* Module Dependencies
*/

import React from 'react'

export default class EnterpriseUsTable extends React.Component{
	
	render(){
		return <div className="wrapperEnterpriseprofileContent">
            
          
            <h3>Que Ofrecemos</h3>
            <span className="underline"></span>
            <div className="wrapperOffer">
                    <p className="sellingline">{this.props.us.offer}</p>
            </div>

            <h3>Información de Contacto</h3>
            <span className="underline"></span>
            <div className="wrapperEnterpriseInfoContact">
                <ul>
                    <li>
                        <span className="infoContactIco icon-suitcase"></span>
                        <p className="info">{this.props.us.businessName}</p>
                        <p className="info legalId">R.U.C. N°  {this.props.us.legalId}</p>

                    </li>
                    <li>
                        <span className="infoContactIco icon-mobile"></span>
                        <p className="info">{this.props.us.phone}</p>

                    </li>
                    <li>
                        <span className="infoContactIco icon-envelope"></span>
                        <p className="info">{this.props.us.email}</p>

                    </li>
                    <li>
                        <span className="infoContactIco icon-circular-graph"></span>
                        <p className="info">{this.props.us.web}</p>

                    </li>
                    <li>
                        <span className="infoContactIco icon-location2"></span>
                        <p className="info">{this.props.us.address}</p>

                    </li>
                </ul>
            </div>
            
        
            
        </div>
	}
}