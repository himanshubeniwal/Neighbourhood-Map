import React, {Component} from 'react';
export default class Header extends Component{


	render(){
		return(
				<div className="center-text"> 
				<hr />
	                <h3 className="bookshelf-titlee">
	                    About this Page
	                </h3>
	                <p> Made with 
	                  <i className="fa fa-fw fa-coffee"></i> 
	                  and<i className="fa fa-fw fa-music"></i>
	                  by <b>Himanshu Beniwal</b> </p>
              	</div>

			);
	}
}