/*
*	module dependencies
*/
import React from 'react';
import SellBox from './resultSellBox'


export default class ResultSellTable extends React.Component{

	render(){
		return <div className="sellBoxList">
			<ul className="sellBoxTableTitles">
				<li className="buyerField">Comprador</li>
				<li className="calltitleField">Convocatoria</li>
				<li>Estado</li>
				<li>Cierre</li>
				<li>Cotización</li>
				<li>Vendedor</li>
				<li>Presupuesto</li>
			</ul>
			{
				this.props.sells.map((sell)=>{
					return <SellBox 
						sendQuotation = {this.props.sendQuotation}
						user_id = {this.props.user_id}
						key={sell._id} 
						sellInfo={sell} />
				})
			}
		</div>

//		return <div>ok</div>
	}
}
