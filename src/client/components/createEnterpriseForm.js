/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom';

export default class CreateEnterpriseForm extends React.Component{
	
	closeForm(ev){
		document.getElementById('wrapperCreateEnterpriseForm').style.display = 'none';
		ReactDom.unmountComponentAtNode(document.getElementById('wrapperCreateEnterpriseForm'));
	}


	handleCreateEnterpriseSubmit(e){
		e.preventDefault();
		var accountManager_cef = ReactDom.findDOMNode(this.refs.accountManager_cef).value.trim()
		var companyName_cef = ReactDom.findDOMNode(this.refs.companyName_cef).value.trim()
		let descriptor_cef = ReactDom.findDOMNode(this.refs.descriptor_cef).value.trim()
		let businessName_cef = ReactDom.findDOMNode(this.refs.businessName_cef).value.trim()
		let industry_cef = ReactDom.findDOMNode(this.refs.industry_cef).value.trim()
		let legalId_cef = ReactDom.findDOMNode(this.refs.legalId_cef).value.trim()
		let phone_cef = ReactDom.findDOMNode(this.refs.phone_cef).value.trim()
		let img_cef = ReactDom.findDOMNode(this.refs.img_cef)
		let us_cef = ReactDom.findDOMNode(this.refs.us_cef).value.trim()


		var formdata = new FormData();

		formdata.append('Content-Type', 'multipart/formdata');
		formdata.append( "user_id", accountManager_cef);
		formdata.append( "companyName", companyName_cef);
		formdata.append( "descriptor", descriptor_cef);
		formdata.append( "businessName", businessName_cef);
		formdata.append( "industry", industry_cef);
		formdata.append( "legalId", legalId_cef);
		formdata.append( "us", us_cef);
		formdata.append( "phone", phone_cef);
		formdata.append( "punctuality_rating", 1);
		formdata.append( "quality_rating", 1);
		formdata.append( "customer_support_rating", 1);
		formdata.append( "price_rating", 1);
		formdata.append( "upl", img_cef.files[0], img_cef.files[0].name);



/*

		if(!user_id ! || !titleCall || !description_call) {
			return;
		}
*/		

		let json = {
			user_id : accountManager_cef,
			companyName : companyName_cef,
			descriptor : descriptor_cef,
			businessName: businessName_cef,
			industry : industry_cef,
			legalId: legalId_cef,
			phone : phone_cef
		}

		// LLAMAR AL METODO QUE LLEGA POR PROPS CREATENEWENTERPRISE

		this.props.createEnterprise.call(null, formdata)

		ReactDom.findDOMNode(this.refs.companyName_cef).value = '';
		ReactDom.findDOMNode(this.refs.descriptor_cef).value = '';
		ReactDom.findDOMNode(this.refs.businessName_cef).value = '';
		ReactDom.findDOMNode(this.refs.industry_cef).value = '';
		ReactDom.findDOMNode(this.refs.legalId_cef).value = '';
		ReactDom.findDOMNode(this.refs.phone_cef).value = '';
		ReactDom.findDOMNode(this.refs.us_cef).value = '';


		return;
	}

	render(){
		
		return <form id="createEnterpriseForm" className="wrapperPopup" ref = "createEnterpriseForm" onSubmit={this.handleCreateEnterpriseSubmit.bind(this)}>
			<div className="formHeader">
				<img src="https://s3-sa-east-1.amazonaws.com/bengalasource/bengala-logo.png" />
				<span className="icon-cancel" onClick={this.closeForm.bind(this)}></span>
			</div>
			<div className="formContent" id="quotationFormA">
				<h1 className="formTitle">Crea el perfil de tu empresa</h1>
				<span className="underline"></span>
				<input id="accountManager_cef" name="user_id" ref="accountManager_cef" type="hidden" value={this.props.user._id}/>
				<input className="formInput" id="companyName_cef" name="companyName" ref="companyName_cef" type="text" placeholder="Nombre Comercial"/>
				<input className="formInput" id="descriptor_cef" name="descriptor" ref="descriptor_cef" type="text" placeholder="Descriptor de la empresa"/>
				<input className="formInput" id="businessName_cef" name="businessName" ref="businessName_cef" type="text" placeholder="Razón Social"/>
				<input className="formInput" id="industry_cef" name="industry" ref="industry_cef" type="text" placeholder="industria"/>
				<input className="formInput" id="us_cef" name="us" ref="us_cef" type="textarea" placeholder="describe la vision de la empresa"/>
				<input className="formInput" id="legalId_cef" name="legalId" ref="legalId_cef" type="text" placeholder="RUC"/>
				<input className="formInput" id="phone_cef" name="phone" ref="phone_cef" type="text" placeholder="telefono"/>

				<input className="btnCreateCall" type="submit" value="Crear" id="btnCreateEnterprise"/>
			</div>
			<div className="formContent wrapperB">
				<label>Imágen de Perfil</label>
				<div className="inputFile">
					<span className="ico icon-upload"></span>
					<span className="btnName">Adjuntar imagen</span>
					
					<input className="formInputImg" type="file" id="ImageBrowseEnterpriseProfile" ref="img_cef" name="upl"/>
				</div>
			</div>

		</form>

	}
}