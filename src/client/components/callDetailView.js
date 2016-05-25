/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom';
import CallDetailViewProviderAvatar from './callDetailViewProviderAvatar'


export default class CallDetailView extends React.Component{
	
	closeForm(ev){
		console.log("click en cerrar form")
		ReactDom.unmountComponentAtNode(document.getElementById('wrapperCallDetailView'));
		document.getElementById('wrapperCallDetailView').style.display='none';
	}

	render(){
		console.log(this.props.providers)
		let providers;

		if(this.props.providers != undefined){
			providers = this.props.providers.map((provider)=>{
							return <CallDetailViewProviderAvatar
										key={provider.provider_id}
										provider_id={provider.provider_id}
										provider_profileImage={provider.provider_profileImage}/>
						});
		}else{

			providers = this.props.callInfo.providers_quotation.map((provider)=>{

							return <CallDetailViewProviderAvatar
										key={provider._id}
										provider_id={provider.enterprise_id._id}
										provider_profileImage={provider.enterprise_id.profileImage}/>
						});
		}		

		return <div className="callDetailView wrapperPopup">
					<div className="formHeader">
						<img src="https://s3-sa-east-1.amazonaws.com/bengalasource/bengala-logo.png" />
						<span className="icon-cancel" onClick={this.closeForm.bind(this)}></span>
					</div>
					
			    	<div className="wrapperViewContent formContent">
						<h1 className="formTitle">Mi requerimiento</h1>
						<span className="underline"></span>
						<div className="contactInfo">
							<div className="grid">
								<p>RESPONSABLE</p>
						    	<figure className="userImage">
						    		<img src={this.props.callInfo.buyer_incharge.photo} alt="user"/>
						    	</figure>
							</div>
							<div className="grid gridB">
						    	<p>PROVEEDORES SELECCIONADOS</p>
						    	<ul className="enterpriseList">
						    		{providers}
						    	</ul>
							</div>
							
						</div>
						<p className="callLabel">Apertura {this.props.callInfo.opening_day} de {this.props.callInfo.opening_month} - {this.props.callInfo.opening_year}</p>
						<h2>{this.props.callInfo.titleCall}</h2>
						<p className="callDescription softText">{this.props.callInfo.description_call}</p>
						<p className="callLabel">Presupuesto del proyecto</p>
						<p className="callBudget">S/. {this.props.callInfo.budget}.00</p>
						<p className="callLabel">Forma de pago</p>
						<p className="callPayment softText">{this.props.callInfo.payment_detail}</p>
						<p className="callLabel">Imagenes de referencia</p>
						<ul>
							<li>
								<figure>
						    		<img src={this.props.callInfo.image_reference} alt="image_reference"/>
						    	</figure>
							</li>
						</ul>
						<p className="callLabel">Cierre de convocatoria</p>
						<p className="callClosingDate softText">{this.props.callInfo.closing_date_viewFormat}</p>
			    	</div>
			    	<div class="wrapperViewAside">
			    		<button className="editDoc">Editar Doc</button>
			    		<button className="loadQuotation">Cotizaciones</button>
			    	</div>    	
			    </div>

	}
}

/*
<ul className="enterpriseList">
						    		{
						    			this.props.providers.map((provider)=>{
						    				return <CallDetailViewProviderAvatar
						    							key={provider.provider_id}
						    							provider={provider}/>
						    			})
						    		}
						    	</ul>

*/