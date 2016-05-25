/*
*	module dependencies
*/
import React from 'react';
import EnterpriseScoreWidget from './enterpriseScoreWidget'


export default class EnterpriseScoreTable extends React.Component{
	

	render(){



		return <div className="wrapperEnterpriseprofileContent">
            <h3>Como nos evaluan nuestros clientes</h3>
            <span className="underline"></span>
            <ul className="wrapperPunctuationIco">
                <li>
                    <p>Calidad de trabajo</p>
                    <span className="punctuationIcon icon-medal"></span>
                    <EnterpriseScoreWidget score={this.props.quality_rating}/>
                </li>
                <li>
                    <p>Puntualidad</p>
                    <span className="punctuationIcon icon-medal"></span>
                    <EnterpriseScoreWidget score={this.props.punctuality_rating}/>
                </li>
                <li>
                    <p>Atención al cliente</p>
                    <span className="punctuationIcon icon-medal"></span>
                    <EnterpriseScoreWidget score={this.props.customer_support_rating}/>
                </li>
                <li>
                    <p>Precio valor</p>
                    <span className="punctuationIcon icon-medal"></span>
                    <EnterpriseScoreWidget score={this.props.price_rating}/>
                </li>
            </ul>
        </div>

	}
}
