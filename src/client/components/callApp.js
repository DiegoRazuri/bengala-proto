/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom';
import CallControlPanel from './callControlPanel'
import ResultTable from './resultTable'
import CallForm from './callForm'
import CallBoxTable from './callBoxTable'
import CallDetailView from './callDetailView'



export default class CallApp extends React.Component {
/*	constructor (props) {
		super(props);
		this.state = {
			allCalls : []
		};
	
		this.loadAllCalls = this.loadAllCalls.bind(this);
		this.updateCall = this.updateCall.bind(this);
		
	}


	updateCall(formdata){
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
                res.buyer_incharge = this.props.user
                this.state.allCalls.push(res);
                let newInfo = this.state.allCalls;

                this.setState({ allCalls : newInfo})
                //grabar informacion en calls state
                
                //this.state.allCalls.push()
                ReactDom.render(
                	<CallDetailView
                		user = {this.props.user}
                		callInfo = {res}
                		providers = {this.props.providers}/>,
                	document.getElementById('wrapperCallDetailView')
                );
                ReactDom.unmountComponentAtNode(document.getElementById('wrapperCallForm'));

            },
            error: function(data){
                console.log("error");
                console.log(data);
            }
        });
	}

	// load calls
	loadAllCalls(){
		$.ajax({
			url: '/api/convocatorias/pendientes/'+this.props.enterprise_id,
			dataType: 'json',
			success: (data) => {
				this.setState({allCalls: data});
			},
			error: (xhr, status, err) => {
				console.error('/api/convocatorias/pendientes/'+this.props.enterprise_id, status, err.toString());
			}
		});
	}
	componentWillMount(){
		if(this.props.enterprise_id != null){

			this.loadAllCalls();
		}

		
	}
*/

	


	render(){

		return <div className="callView callsellView wrapperCalls">
			<h1>Mis Convocatorias</h1>
			<span className="titleBorder"></span>
			
			<CallControlPanel
				updateCall= {this.props.updateCall}
				user = {this.props.user}
				providers = {this.props.providers}
				enterprise_id = {this.props.enterprise_id}/>
			
			<CallBoxTable 
				mountingWorkingStationForm = {this.props.mountingWorkingStationForm}
				user = {this.props.user}
				showWorkingStationForm = {this.props.showWorkingStationForm}
				calls={ this.props.allCalls }/>
		
		</div>

	}
}
/*
* routes
*/

