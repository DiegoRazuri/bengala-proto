/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom';

export default class EnterpriseCatalogForm extends React.Component{

	constructor (props){
		super(props);
		this.state={
			files : [],

			url_add_enterprise_relation : '/api/agregar_cliente'

		}
		this.addCatalog = this.addCatalog.bind(this);
	}

	closeForm(ev){
		console.log("click en cerrar form")
		ReactDom.unmountComponentAtNode(document.getElementById(''));
	}

	addCatalog (event){
		let image_reference = ReactDom.findDOMNode(this.refs.image_reference_cf)
		console.log(image_reference.files)
		let imageObj = image_reference.files;
		//let imageArray = []
		for(let i in imageObj){
			this.state.files.push(imageObj[i])

		}
		let num = this.state.files.length -1
		
		console.log(num)
		let newInfo = this.state.files;
		let bbb = newInfo.slice(0,num)
		
		this.setState({ 
			//files : event.target.files,
			files : bbb,

		})
		console.log(this.state.files)
	}


	

	handleCatalogSubmit(ev){

		ev.preventDefault()

		console.log("dentro del submit handler")

		if(this.state.files.length > 0 ){
			
			console.log(this.state.files)
			/*
			let json = {
				client_id: this.state.client,
				provider_id: this.state.provider 
			}
			$.post(this.state.url_add_enterprise_relation, json, function (res){
				console.log(res)
				//aca tengo q ir a la props del enterpriseprofileApp y settear los cambios

			});*/
		}else{
			console.log("debe seleccionar fotos")
		}
	}



	render(){
		console.log("dentro de Callform el enterprise_id es: "+ this.props.enterprise_id)


		return <div>
			<span onClick={this.closeForm.bind(this)}>close</span>
			<div className="preview-Image">
				<ul>
					{
						this.state.files.map((i)=>{

							<ImageUploadedRow imageInfo = {i}/>
						})
					}

				</ul>
			</div>

			<h2>Agrega Fotos a tu Catálogo</h2>
			<form id="formCatalog" onSubmit={this.handleCatalogSubmit.bind(this)}>
	                    
                <input type="file" id="ImageBrowseCall" ref="image_reference_cf" onChange={this.addCatalog} multiple="true"/>
	
               
                <input type="submit" id="btnUploadCatalog"/>
            </form>
		</div>
	}
}
/* es necesario definir un defaul para las props*/

/*
{
					this.state.files.map
				}
				<ImageUploadedRow imageInfo = {}/>
*/