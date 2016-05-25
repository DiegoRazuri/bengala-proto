/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom';
import CallFormProvidersList from './callFormProvidersList'
import CallDetailView from './callDetailView'

export default class CallForm extends React.Component{

	closeForm(ev){
		console.log("click en cerrar form")
		ReactDom.unmountComponentAtNode(document.getElementById('wrapperCallForm'));
		document.getElementById('wrapperCallForm').style.display='none';	
	}

	handleCallSubmit(e){
		e.preventDefault();
		let enterprise_id = ReactDom.findDOMNode(this.refs.enterprise_id_cf).value.trim()
		let buyer_incharge = ReactDom.findDOMNode(this.refs.buyer_incharge_cf).value.trim()
		let titleCall = ReactDom.findDOMNode(this.refs.titleCall_cf).value.trim()
		let description_call = ReactDom.findDOMNode(this.refs.description_call_cf).value.trim()
		let budget = ReactDom.findDOMNode(this.refs.budget_cf).value.trim()
		let payment_detail = ReactDom.findDOMNode(this.refs.payment_detail_cf).value.trim()
		let closing_date = ReactDom.findDOMNode(this.refs.closing_date_cf).value.trim()
		let image_reference = ReactDom.findDOMNode(this.refs.image_reference_cf)

		console.log("esta es la fecha de cierre")
		

/*

		if(!user_id ! || !titleCall || !description_call) {
			return;
		}
*/		
		let months = new Array("Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic");
		let formating = closing_date.split("-")
		let month_position = formating[1]
		let month_position_int = parseInt(month_position)
		month_position_int -= 1;
		let closing_date_viewFormat = formating[2] + " " + months[month_position_int] + " " + formating[0]
		



		let formdata = new FormData();

		formdata.append('Content-Type', 'multipart/formdata');

		formdata.append( "upl", image_reference.files[0], image_reference.files[0].name);
		formdata.append( "enterprise_id", enterprise_id);
		formdata.append( "buyer_incharge", buyer_incharge);
		formdata.append( "titleCall", titleCall);
		formdata.append( "description_call", description_call);
		formdata.append( "budget", budget);
		formdata.append( "payment_detail", payment_detail);
		formdata.append( "closing_date", closing_date);
		formdata.append( "closing_date_viewFormat", closing_date_viewFormat);

		let providers = []

		this.props.providers.map((provider)=>{
			providers.push(provider.provider_id);
		});

		
		console.log(providers)
		JSON.stringify(providers)
		formdata.append( "providers", providers);

		this.props.updateCall(formdata)
/*
		$.ajax({
            type:'POST',
            url: '/api/nueva_convocatorias', 
            processData: false,  // tell jQuery not to process the data
 			contentType: false,   // tell jQuery not to set contentType
            data:formdata,
            cache:false,
            success: (res)=>{
                console.log("success");
                console.log(res);
                this.
                //grabar informacion en calls state
                ReactDom.render(
                	<CallDetailView
                		user = {this.props.user}
                		callInfo = {res}
                		providers = {this.props.providers}/>,
                	document.getElementById('wrapperCallDetailView')
                );
                this.closeForm()

            },
            error: function(data){
                console.log("error");
                console.log(data);
            }
        });
*/

		//this.props.onCallSubmit({ aca van los datos que se deben enviar al componente del listado de convocatorias})
		ReactDom.findDOMNode(this.refs.enterprise_id_cf).value = '';
		ReactDom.findDOMNode(this.refs.buyer_incharge_cf).value = '';
		ReactDom.findDOMNode(this.refs.titleCall_cf).value = '';
		ReactDom.findDOMNode(this.refs.description_call_cf).value = '';
		ReactDom.findDOMNode(this.refs.budget_cf).value = '';
		ReactDom.findDOMNode(this.refs.payment_detail_cf).value = '';
		ReactDom.findDOMNode(this.refs.closing_date_cf).value = '';
/*
	tengo que recorrer la lista de providers y borrar el valor
*/		
		
	}
/*	
	aca se condiciona el render	
*/

	render(){
		console.log("dentro de Callform el enterprise_id es: "+ this.props.enterprise_id)

		let f = new Date()
		let date = f.getDate()
		let month = f.getMonth()
		let year = f.getYear()
		let fullDate = year + "-" + month + "-" + date
		return <form id="callForm" className="wrapperPopup" onSubmit={this.handleCallSubmit.bind(this)}>
			<div className="formHeader">
				<img src="https://s3-sa-east-1.amazonaws.com/bengalasource/bengala-logo.png" />
				<span className="icon-cancel" onClick={this.closeForm.bind(this)}></span>
			</div>
			<div className="formContent">
				<h1 className="formTitle">Crea una convocatoria</h1>
				<span className="underline"></span>
				<label>Título del requerimiento</label>
				<input className="formInput" id="titleCall" ref="titleCall_cf" type="text" placeholder="Ingresa un nombre para identificar esta convocatoria"/>
				<input id="enterprise_id" ref="enterprise_id_cf" type="hidden" value={this.props.enterprise_id}/>
				<input id="user_id" ref="buyer_incharge_cf" type="hidden" value={this.props.user._id}/>
				<label>Formulario de requerimiento</label>
				<input className="formInput" id="description_call" ref="description_call_cf" type="text" placeholder="Describe la cantidad y los productos o servicios que tu empresa requiere"/>
				<input className="formInput" id="budget" ref="budget_cf" type="text" placeholder="Presupuesto para el proyecto"/>
				<input className="formInput" id="payment_detail" ref="payment_detail_cf" type="text" placeholder="Indique la forma de pago: crédito, contra entrega, adelanto, a negociar"/>
				<label>Ingrese la fecha de cierre</label>
				<input  className="formInputDate" id="closing_date" ref="closing_date_cf" type="date" min={fullDate}/>
				
				<input className="btnCreateCall" type="submit" value="Crear" id="btnCreateCall"/>

			</div>
			<div className="formContent wrapperB">
				<label>Imágenes de referencia</label>
				<div className="inputFile">
					<span className="ico icon-upload"></span>
					<span className="btnName">seleccionar archivos</span>
					
					<input className="formInputImg" type="file" id="ImageBrowseCall" ref="image_reference_cf"/>
				</div>
				<label>Proveedores seleccionados</label>
				<ul>
				{
					this.props.providers.map((provider) =>{
						return <CallFormProvidersList key={provider.provider_id} providerDetail = {provider} />
					})
				}
				</ul>

			</div>
		</form>
	}
}
/* es necesario definir un defaul para las props*/

