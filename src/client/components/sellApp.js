/*
*	module dependencies

	ADVERTENCIA!!!!:
	DEBO CAMBIAR LA ESTRATEGIA PARA OBETENER EL ID DEL USUARIO PORQUE
	NO ESTA OBTENIENDOSE DE FORMA SEGURA!!!!!

*/
import React from 'react';
import ReactDom from 'react-dom';
import ResultSellTable from './resultSellTable';
import SellControlPanel from './sellControlPanel'


export default class SellApp extends React.Component{


	constructor (props) {
		super(props);
		this.state = {
			allSells : []
		};
	

		this.loadUserInfo = this.loadUserInfo.bind(this);
		this.loadAllSells = this.loadAllSells.bind(this);
		this.sendQuotation = this.sendQuotation.bind(this);
	}

	sendQuotation(formdata){
		$.ajax({
            type:'POST',
            url: '/api/quotation', 
            processData: false,  // tell jQuery not to process the data
 			contentType: false,   // tell jQuery not to set contentType
            data:formdata,
            cache:false,
            success: (data) => {
                console.log("success");
                this.state.allSells.map((sell, index)=>{
                	if(sell._id === data._id){
                		this.state.allSells[index].answer_date = data.answer_date;
                		this.state.allSells[index].answer_date_viewFormat = data.answer_date_viewFormat;
                		this.state.allSells[index].attached = data.attached;
                		this.state.allSells[index].in_charge = this.state.user;
                		this.state.allSells[index].item_description = data.item_description;
                		this.state.allSells[index].item_name = data.item_name;
                		this.state.allSells[index].price = data.price;
                		this.state.allSells[index].quantity = data.quantity;

                		let newInfo = this.state.allSells
                		this.setState({ allSells : newInfo});
                	}
                });

                console.log(this.state.allSells)
                
            },
            error: function(data){
                console.log("error");
            }
        });
	}

	loadAllSells(){
		$.ajax({
			url: '/api/sells/'+this.props.enterprise_id,
			dataType: 'json',
			success: (data) => {
				this.setState({allSells: data});
			},
			error: (xhr, status, err) => {
				console.error('/api/sells/'+this.props.enterprise_id, status, err.toString());
			}
		});
	}

	//Este metodo deberá ser removido y tendra que estar en un componente
	//PADRE que permita pasarle el state del usuario a todos para mejorar 
	//__________***  PERFORMANCE   ****__________//


	loadUserInfo(){
		$.ajax({
			url: '/api/userprofile/'+this.props.user._id,
			dataType: 'json',
			success: (data) => {
				this.setState({ user : data})
			},
			error: (xhr, status, err) => {
				console.error('/api/userprofile/'+this.props.user._id, status, err.toString());
			}
		});
	}

	componentDidMount(){
		if(this.props.enterprise_id != null){
			this.loadUserInfo();
			this.loadAllSells();
		}
	}
	
	render(){
		
		return <div className="sellView callsellView">
			<h1>Convocatorias por Cotizar</h1>
			<span className="titleBorder"></span>

			<SellControlPanel/>
			
			<ResultSellTable 
				user_id = {this.props.user._id} 
				sendQuotation = {this.sendQuotation}
				sells = {this.state.allSells}/>
		</div>

	}
}