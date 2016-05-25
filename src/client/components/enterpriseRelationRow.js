/*
* Module Dependencies
*/

import React from 'react'


export default class EnterpriseRelationRow extends React.Component{
    
    render(){

        return <li>
        	<figure>
                <img src={this.props.relation_info.profileImage} alt="enterpriseImage"/>
        	</figure>
	    </li>
           
    }
}

