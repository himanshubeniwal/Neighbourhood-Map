import React, {Component } from 'react';
import './App.css';
import './ShowingMap';
//import Footer from './Footer';
export default class SideBar extends Component {

	render(){
    console.log(this.props.venues);
	return(
    <>
        <div style={this.props.style}>
        <h4>Places you should visit near</h4>
        <h3>New Delhi, India</h3>
              <input tabIndex='1' aria-label="Place" placeholder='Search here ... ' onChange={(event)=>this.props.filterPlaces(event.target.value)} style={{width:'100%' , height: '25px'}}></input>
              <ol>
              {
                this.props.venues.map((Singlevenue,id)=>(
                <li onClick={(event)=>  {this.props.animateMarker(event.target.id); this.props.onMarkerClick(event.target.id); }} key={Singlevenue.referralId} id={Singlevenue.referralId}> 
                {Singlevenue.venue.name}
                </li>
                ))}
              </ol>      <Footer />
              </div>

      </>
		);
	}
}