/*
*	module dependencies
*/
import React from 'react';
import CallBoxBuyerPhotoPiece from './callBoxBuyerPhotoPiece'
import BtnCallDetailView from './btnCallDetailView'

	

export default class CallBox extends React.Component{
	render(){
		console.log("este es el buyer_incharge: "+ this.props.callInfo.buyer_incharge.name)
		console.log(this.props.callInfo);
		return <article className="box">
				<figure className="buyerImage pieceCall">
					<img src={this.props.callInfo.buyer_incharge != undefined ? this.props.callInfo.buyer_incharge.photo : "#"  }/>
				</figure>
				<BtnCallDetailView
					callInfo = {this.props.callInfo}/>

				<span className={this.props.callInfo.status_call == 1 ? "statusOpen pieceCall pieceCallStatus" : "statusClose pieceCall pieceCallStatus"} >{this.props.callInfo.status_call == 1 ? "abierto" : "cerrado"}</span>
				<p className="pieceCall pieceCallDate" >{this.props.callInfo.opening_day} {this.props.callInfo.opening_month} {this.props.callInfo.opening_year}</p>
				<a  className="pieceCall pieceCallBtnQuotation" href="#">Cotizaciones</a>
				<figure className="providerImage pieceCall">
					<img src={this.props.callInfo.providers_quotation[0].in_charge != undefined ? this.props.callInfo.providers_quotation[0].in_charge.photo : "https://s3-sa-east-1.amazonaws.com/bengalasource/adduser.png"}/>
				</figure>
				<span onClick={this.props.mountingWorkingStationForm.bind(this)} className="pieceCall pieceCallWS icon-comment"></span>
			</article>

	}
}
/*
				<button className="pieceCall" >alerta</button>
				<button className="pieceCall" >consultas</button>
*/