/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom';
import QuotationForm from './quotationForm'
//import CallBoxBuyerPhotoPiece from './callBoxBuyerPhotoPiece'


export default class SellBox extends React.Component{
	
	mountingQuotationForm(ev){

		ev.preventDefault();
		
		document.getElementById('wrapperQuotationForm').style.display = 'block';
		ReactDom.render(
			<QuotationForm 
				user_id = {this.props.user_id} 
				sendQuotation = {this.props.sendQuotation}
				titleCall = {this.props.sellInfo.call_reference.titleCall}
				quotationId = {this.props.sellInfo._id}/>,
			document.getElementById('wrapperQuotationForm')
		)
	//	this.props.sendQuotation.call(null,)
	}
	
	render(){
		console.log(this.props.sellInfo)
		return <article className="box">
				<figure className="buyerImage pieceSell">
					<img src={this.props.sellInfo.in_charge != undefined ? this.props.sellInfo.in_charge.photo : "https://s3-sa-east-1.amazonaws.com/bengalasource/adduser.png" } />
				</figure>
				<p className="pieceSell pieceSellTitle">{this.props.sellInfo.call_reference.titleCall}</p>
				<span className={this.props.sellInfo.call_reference.status_call == 1 ? "statusOpen pieceSell pieceSellStatus" : "statusClose pieceSell pieceSellStatus"} >{this.props.sellInfo.call_reference.status_call == 1 ? "abierto" : "cerrado"}</span>
				<p className="pieceSell pieceSellDate" >{this.props.sellInfo.call_reference.closing_date_viewFormat}</p>
				<a  onClick={this.mountingQuotationForm.bind(this)} className="pieceSell pieceSellBtnQuotation" href="#">{this.props.sellInfo.price != undefined ? "Cotización" : "Responder"}</a>
				<figure className="providerImage pieceSell">
					<img src={this.props.sellInfo.call_reference.buyer_incharge != undefined? this.props.sellInfo.call_reference.buyer_incharge.photo : "https://s3-sa-east-1.amazonaws.com/bengalasource/adduser.png"}/>
				</figure>
				<p className="pieceSell">{this.props.sellInfo.call_reference.budget}</p>
				<span className="pieceSell pieceSellWS icon-comment" ></span>
			</article>

	}
}
/*
{
	this.props.callInfo.participants_buyers.map((buyers)=>{

		return <CallBoxBuyerPhotoPiece key={buyers._id} buyersInfo={buyers} />
	})
}
*/