import React, {Component} from 'react';
export default class Header extends Component{
	state ={
		styleHeader:{
			letterSpacing: '8px'
		}
	}
	render(){
		return(
			<div className="App-header" style={this.state.styleHeader}>
			<img src={logo} className="App-logo" alt="logo" />
				 NEIGHBOURHOOD MAP 
			</div>
			);
	}
}