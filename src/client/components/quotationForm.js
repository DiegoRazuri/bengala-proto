/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom';

export default class QuotationForm extends React.Component{
	
	closeForm(ev){
		console.log("click en cerrar form")
		document.getElementById('wrapperQuotationForm').style.display = 'none';
		ReactDom.unmountComponentAtNode(document.getElementById('wrapperQuotationForm'));
	}



	handleQuotationSubmit(e){
		
		e.preventDefault();

		let quotation_id_qf = ReactDom.findDOMNode(this.refs.quotation_id_qf).value.trim()
		let in_charge_qf = ReactDom.findDOMNode(this.refs.in_charge_qf).value.trim()
		let quantity_qf = ReactDom.findDOMNode(this.refs.quantity_qf).value.trim()
		let item_name_qf = ReactDom.findDOMNode(this.refs.item_name_qf).value.trim()
		let price_qf = ReactDom.findDOMNode(this.refs.price_qf).value.trim()
		let item_description_qf = ReactDom.findDOMNode(this.refs.item_description_qf).value.trim()
		let quotationAttached = ReactDom.findDOMNode(this.refs.quotationAttached)
		

		var formdata = new FormData();

		formdata.append('Content-Type', 'multipart/formdata');

		formdata.append( "upl", quotationAttached.files[0], quotationAttached.files[0].name);
		formdata.append( "quotation_id", quotation_id_qf);
		formdata.append( "in_charge", in_charge_qf);
		formdata.append( "quantity", quantity_qf);
		formdata.append( "item_name", item_name_qf);
		formdata.append( "price", price_qf);
		formdata.append( "item_description", item_description_qf);



		// LLAMAR AL METODO QUE LLEGA POR PROPS CREATENEWENTERPRISE
		
		this.props.sendQuotation.call(null, formdata)

		ReactDom.findDOMNode(this.refs.quotation_id_qf).value = '';
		ReactDom.findDOMNode(this.refs.in_charge_qf).value = '';
		ReactDom.findDOMNode(this.refs.quantity_qf).value = '';
		ReactDom.findDOMNode(this.refs.item_name_qf).value = '';
		ReactDom.findDOMNode(this.refs.price_qf).value = '';
		ReactDom.findDOMNode(this.refs.item_description_qf).value = '';
		ReactDom.findDOMNode(this.refs.quotationAttached).value = '';
		//ReactDom.findDOMNode(this.refs.closing_date).value = '';


		return;
	}

	render(){
		


		return <form id="quotationForm" className="wrapperPopup" ref = "quotationForm" onSubmit={this.handleQuotationSubmit.bind(this)}>
			<div className="formHeader">
				<img src="https://s3-sa-east-1.amazonaws.com/bengalasource/bengala-logo.png" />
				<span className="icon-cancel" onClick={this.closeForm.bind(this)}></span>
			</div>
			<div className="formContent" id="quotationFormA">
				<h1 className="formTitle">Prepara tu cotización</h1>
				<span className="underline"></span>
				<label>PARA</label>
				<h2 className="quotationTitle">{this.props.titleCall}</h2>
				
				<input value="Enviar" type="submit" id="btnCreateQuotation"/>
				<label className="divisor">Producto N°1</label>
				<div className="gridProductDescription">
					<input id="quotation_id_qf" value={this.props.quotationId} name="quotation_id_qf" ref="quotation_id_qf" type="hidden" />
					<input id="in_charge_qf" name="in_charge_qf" ref="in_charge_qf" type="hidden" value={this.props.user_id}/>
					<div className="gridA">
						<input className="formInput" id="quantity_qf" name="quantity_qf" ref="quantity_qf" type="text" placeholder="Indica la cantidad"/>
					</div>
					<div className="gridB">
						<input className="formInput" id="item_name_qf" name="item_name_qf" ref="item_name_qf" type="text" placeholder="Nombre del producto o servicio"/>
						<input className="formInput" id="item_description_qf" name="item_description_qf" ref="item_description_qf" type="text" placeholder="Describe el producto o servicio que estas cotizando"/>
					</div>
					<div className="gridC">
						<input className="formInput" id="price_qf" name="price_qf" ref="price_qf" type="text" placeholder="Indica el precio"/>
						<div className="inputFile">
							<span className="ico icon-upload"></span>
							<span className="btnName">Adjuntar imagen</span>
							
							<input className="formInputImg" type="file" id="ImageBrowseQuotationAttached" ref="quotationAttached" name="upl"/>
						</div>
					</div>
				</div>
			</div>
		</form>

	}
}