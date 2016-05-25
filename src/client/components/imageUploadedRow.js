/*
* Module Dependencies
*/

import React from 'react'


export default class ImageUploadedRow extends React.Component{
    
    render(){

        return <li>
	                <img src={this.props.imageInfo.profileImage} alt="enterpriseImage"/>
	                <input name="title_item" ref="title_item" type="text" placeholder="titulo"/>

	                <input name="subtitle" ref="subtitle" type="text" placeholder="subtitulo"/>

	                <input name="description" ref="description" type="text" placeholder="Escribe una descripción"/>
			
	            </li>
           
    }
}

