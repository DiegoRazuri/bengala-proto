/*
*	module dependencies
*/
import React from 'react';


export default class EnterpriseScoreWidget extends React.Component{
	

	render(){

		let points =[];
		let num = Math.round(this.props.score)

		let heart = <li><span className="icon-heart heart"></span></li>
		let halfHeart = <li><span className="icon-heart halfHeart"></span></li>

		for(let i = 1; i <= num; i++){
			points.push(<li><span className="icon-heart heart"></span></li>)
		}


		return <ul className="scoreWidget">
					{points}
                	
                </ul>

	}
}
