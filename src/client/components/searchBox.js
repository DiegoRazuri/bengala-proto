/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom';
import ResultTable from './resultTable'

export default class SearchBox extends React.Component{
	//al boton le asigno la funcionalidad de cambiar state
/*	constructor (props){
		super(props);
		this.state={
			results : [],
			url_search : '/api/search/'
		}
	}
/*	mountingResultTable(ev){
		ev.preventDefault();

		ReactDom.unmountComponentAtNode(document.getElementById('wrapperPrincipalComponentsPlatformView'));
		this.runSearch()
			
	
	}
/*___________****** ADVERTENCIA *********_________________*/
/*	investigar si el metodo runSearch() es eficiente y respeta las buenas practicas  */

/*	runSearch(){
		let searchWord = document.getElementById('searchWord').value.trim()
		$.ajax({
			type: 'GET',
			url: this.state.url_search + searchWord,
			processData : false,
			contentType : false,
			cache:false,
			success: (res) =>{
				console.log("este es la url")
				console.log(this.state.url_search)
				console.log("esta es la respues del server")
				console.log(res)
				console.log("esta es this")
				console.log(this)
				
				this.state.results = res;
				let newInfo = this.state.results;
	            this.setState({results: newInfo});
	            console.log(this.state.results)
				
				ReactDom.render(
					<ResultTable 
						searchResults={this.state.results}/>,
					document.getElementById('wrapperPrincipalComponentsPlatformView')
				);
			},
			error: function(data){
				console.log("error");
			}
		})
	}
*/

	render(){
		return <form className="searchBox" id="searcherform" onSubmit={this.props.mountingResultTable.bind(this)}>
			<span className="icon-search"></span>
			<input id="searchWord" name="searchWord" type="text" placeholder="Busca lo que necesitas..." />
		</form>
	}
}
//			<button onClick={ this.props.mountingResultTable.bind(this) }id="btnSearchForm">buscar</button>