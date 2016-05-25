/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom';

export default class CalificationForm extends React.Component{

	constructor (props){
		super(props);
		this.state={
			punctuality_score : 0,
			quality_score : 0,
			customer_support_score : 0,
			price_score : 0,

			url_score_calification : '/api/score'

		}
		this.handleClickPunctuality = this.handleClickPunctuality.bind(this);
		this.handleClickQuality = this.handleClickQuality.bind(this);
		this.handleClickPrice = this.handleClickPrice.bind(this);
		this.handleClickCustomerSupport = this.handleClickCustomerSupport.bind(this);
	}

	closeForm(ev){
		console.log("click en cerrar form")
		ReactDom.unmountComponentAtNode(document.getElementById('wrapperCalificationForm'));
	}
	handleClickPunctuality (event){
		this.setState({ punctuality_score : event.target.value})
	}
	handleClickQuality (event){
		this.setState({ quality_score : event.target.value})
	}
	handleClickPrice (event){
		this.setState({ price_score : event.target.value})
	}
	handleClickCustomerSupport (event){
		this.setState({ customer_support_score : event.target.value})
	}

	handleCalificationSubmit(ev){

		ev.preventDefault()

		console.log("dentro del submit handler")

		if(this.state.punctuality_score != 0){
			if(this.state.quality_score != 0){
				if(this.state.customer_support_score != 0){
					if(this.state.price_score != 0){
						
						var json = {
							user_id : this.props.user_id,
							evaluated_enterprise_id : this.props.evaluated_enterprise_id,
							punctuality_score : this.state.punctuality_score,
							quality_score : this.state.quality_score,
							customer_support_score : this.state.customer_support_score,
							price_score : this.state.price_score
						
						}


						console.log(json)
						$.post(this.state.url_score_calification, json, function(res){
							console.log(res)
							console.log("se ejecuto ajax")
						})

					}else{
						console.log("debe calificar el price")
					}
				}else{
					console.log("debe calificar el customer_support_score")
				}
			}else{
				console.log("debe calificar el quality")
			}
		}else{
			// aca se deberia mostrar un mensaje diciendole al usuario que debe calificar todas los rubors
			console.log("debe calificar todos los rubros")
		}
	}



	render(){
		console.log("dentro de Callform el enterprise_id es: "+ this.props.enterprise_id)


		return <div>
			<span onClick={this.closeForm.bind(this)}>close</span>

			<h2>Califica:</h2>
			<form id="formScore" onSubmit={this.handleCalificationSubmit.bind(this)}>
	                    <label>Puntualidad</label>
	                    <radiogroup>
	                        <input id="punctuality_score" name="punctuality_score" type="radio" value={1} onChange={this.handleClickPunctuality} />
	                        <input id="punctuality_score" name="punctuality_score" type="radio" value={2} onChange={this.handleClickPunctuality} />
	                        <input id="punctuality_score" name="punctuality_score" type="radio" value={3} onChange={this.handleClickPunctuality} />
	                        <input id="punctuality_score" name="punctuality_score" type="radio" value={4} onChange={this.handleClickPunctuality} />
	                        <input id="punctuality_score" name="punctuality_score" type="radio" value={5} onChange={this.handleClickPunctuality}/>
	                    </radiogroup>
	                    <br/>
	                    <label>Calidad</label>
	                    <radiogroup>
	                        <input id="quality_score" name="quality_score" type="radio" value={1} onChange={this.handleClickQuality} />
	                        <input id="quality_score" name="quality_score" type="radio" value={2} onChange={this.handleClickQuality} />
	                        <input id="quality_score" name="quality_score" type="radio" value={3} onChange={this.handleClickQuality} />
	                        <input id="quality_score" name="quality_score" type="radio" value={4} onChange={this.handleClickQuality} />
	                        <input id="quality_score" name="quality_score" type="radio" value={5} onChange={this.handleClickQuality} />
	                    </radiogroup>
	                    <br/>
	                    <label>Precio</label>
	                    <radiogroup>
	                        <input id="price_score" name="price_score" type="radio" value={1} onChange={this.handleClickPrice} />
	                        <input id="price_score" name="price_score" type="radio" value={2} onChange={this.handleClickPrice} />
	                        <input id="price_score" name="price_score" type="radio" value={3} onChange={this.handleClickPrice} />
	                        <input id="price_score" name="price_score" type="radio" value={4} onChange={this.handleClickPrice} />
	                        <input id="price_score" name="price_score" type="radio" value={5} onChange={this.handleClickPrice} />
	                    </radiogroup>

	                    <br/>
	                    <label>Servicio al Cliente</label>
	                    <radiogroup>
	                        <input id="customer_support_score" name="customer_support_score" type="radio" value={1} onChange={this.handleClickCustomerSupport} />
	                        <input id="customer_support_score" name="customer_support_score" type="radio" value={2} onChange={this.handleClickCustomerSupport} />
	                        <input id="customer_support_score" name="customer_support_score" type="radio" value={3} onChange={this.handleClickCustomerSupport} />
	                        <input id="customer_support_score" name="customer_support_score" type="radio" value={4} onChange={this.handleClickCustomerSupport} />
	                        <input id="customer_support_score" name="customer_support_score" type="radio" value={5} onChange={this.handleClickCustomerSupport} />
	                    </radiogroup>
	                    <br/>
	                    <input type="submit" id="btnCalification"/>
	                </form>
		</div>
	}
}
/* es necesario definir un defaul para las props*/

