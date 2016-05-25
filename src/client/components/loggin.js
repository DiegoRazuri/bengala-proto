/*
*	module dependencies
*/
import React from 'react';
import SearchBox from './searchBox'
import ResultTable from './resultTable'

export default class Loggin extends React.Component{
	constructor (props){
		super(props);
		this.state={
			viewStage : "none",
			results : [],
			url_search: '/api/search/'

		}
		this.mountingResultTable = this.mountingResultTable.bind(this);
	}


	changeViewStateSearchResult(){
		if(this.state.viewStage != 'show'){
			this.state.viewStage = 'show';
			let newStage = this.state.viewStage;
			this.setState({viewStage : newStage})
		}
	}
	mountingResultTable(ev){
		console.log("buscando")
		ev.preventDefault()
		this.runSearch()
	};

	runSearch(){
		let searchWord = document.getElementById('searchWord').value.trim()
		console.log(searchWord)

		$.ajax({
			type: 'GET',
			url: this.state.url_search + searchWord,
			processData : false,
			contentType : false,
			cache:false,
			success: (res) =>{
				this.state.results = res;
				let newInfo = this.state.results;
	            this.setState({results: newInfo});
	            this.changeViewStateSearchResult()
	            console.log(res)

			},
			error: function(data){
				console.log("error");
			}
		})
	}

	
	render(){
		let viewStageLogin;

		if(this.state.viewStage == 'show'){
			console.log(this.state.results)
			viewStageLogin = <ResultTable searchResults={this.state.results}/>
		}

		return <div className="container">
			<header>
				<nav>
					<figure className="headerLogo">
						<img src="https://s3-sa-east-1.amazonaws.com/bengalasource/bengala-logo.png"/>
					</figure>
					<p>participa</p>
				</nav>
			</header>
			<div className="principalLogginWrapper">
				<h1>Encuentra siempre los mejores proveedores y conéctate con futuros clientes</h1>
				<SearchBox mountingResultTable ={this.mountingResultTable}/>
				<div className="wrapperBtnLoggin">
					<a className="btnLogin" id="btnLoginFacebook" href="/auth/facebook">
						<span className="ico-login icon-facebook-with-circle"></span>
						<p>Registrate con Facebook</p>
						<span className="icon-circle_wrapper">
							<span className="icon-angle-right"></span>
						</span>
					</a>
					<a className="btnLogin" id="btnLoginTwitter" href="/auth/twitter">
						<span className="ico-login icon-twitter-with-circle"></span>
						<p>Registrate con Twitter</p>
						<span className="icon-circle_wrapper">
							<span className="icon-angle-right"></span>
						</span>
					</a>
					<a className="btnLogin" id="btnLoginLinkedin" href="/auth/linkedin">
						<span className="ico-login icon-linkedin-with-circle"></span>
						<p>Registrate con Linkedin</p>
						<span className="icon-circle_wrapper">
							<span className="icon-angle-right"></span>
						</span>
					</a>
				</div>
			</div>
			<div>
				{viewStageLogin}

			</div>
		</div>

	}
}
/*
<div></div>
*/