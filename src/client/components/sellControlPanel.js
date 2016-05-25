/*
*	module dependencies
*/
import React from 'react';
import ReactDom from 'react-dom';

export default class SellControlPanel extends React.Component{

	render(){

		return <div className = "sellControlPanel">
			<nav>
                <ul className="wrapperBtnsSells">
                    <li className="btnNavFilterSeparator">
                        <span>33</span>
                        <a href="#">Todo</a>
                    </li>
                    <li className="btnNavFilterSeparator">
                        <span>33</span>
                        <a href="#">Mis Ventas</a>
                    </li>
                    <li>
                        <span>33</span>
                        <a href="#">Pendientes</a>
                    </li>
                </ul>
            </nav>
        </div>
    }
}