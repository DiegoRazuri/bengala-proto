/*
* Module Dependencies
*/

import React from 'react'
import EnterpriseRelationRow from './enterpriseRelationRow'


export default class EnterpriseRelationsTable extends React.Component{
	
	render(){
//		console.log(e_id)
		return <div className="wrapperEnterpriseprofileContent">
            <h3>Clientes</h3>
            <span className="underline"></span>
            <ul className="wrapperEnterpriseRelations">
                
                {
                    this.props.client.map((i)=>{
                        return <EnterpriseRelationRow 
                            key={i._id} 
                            relation_info={i} />
                    })
                }
            </ul>
            <h3>Proveedores</h3>
            <span className="underline"></span>
            <ul className="wrapperEnterpriseRelations">
                {
                    this.props.provider.map((i)=>{
                        return <EnterpriseRelationRow 
                            key={i._id} 
                            relation_info={i} />
                    })
                }
            </ul>
        </div>
	}
}