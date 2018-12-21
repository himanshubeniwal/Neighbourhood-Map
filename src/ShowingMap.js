import React, { Component } from 'react';
import {Map,InfoWindow, Marker,  GoogleApiWrapper} from 'google-maps-react';
import './App.css';
import axios from 'axios';
//import ListItem from './ListItem';
import Footer from './Footer';
class ShowingMap extends Component{
  // Creating states for all venues, filteredPlaces, and CSS 
  state = {
    venues:[],
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    venueAddress: {},
    venueCity:{},
    filteredPlaces:[],
    venueType: {},
    animatedKey:'',
    backgroundandText :{
      backgroundColor:'#282c34',
      color:'white'
    },
    styleList : {
      width:'25%',
      height:'93vh',
      backgroundColor:'#282c34',
      float:'left',
      zIndex:'10',
      color:'white',
      position:'absolute',
      overflowY:'scroll'
      },

    styleMap : {
      height:'93vh',
      width:'75%',
      marginLeft:'25%',
      marginRight:'0',
      position:'relative',
      zIndex:'9'
      } 
  }

   AllVenues = () => {
  const endPoint = "https://api.foursquare.com/v2/venues/explore?"
  const parameters = {
    client_id : "RGK01FEITDMDGTFQYNC3DTGGNMSDYKOMNWXJH24FUPE5BAYG",
    client_secret : "OYWBI0VGPNRHQLIONKJTFPYKQM4U0RDJR3F1XIWCBGM30AK5",
    query : "sights",
    near : "New Delhi",
    v: "20182507"
  }
  return(axios.get(endPoint + new URLSearchParams(parameters))
  .then( (response,Temp) => {
    this.setState({venues:response.data.response.groups[0].items,filteredPlaces:response.data.response.groups[0].items })
   })
  );
  }
  changeFilteredPlaces=(newFiltered)=>{    
      this.setState({filteredPlaces:newFiltered});

  }
  filterPlaces = (item) => {
     let val=this.state.venues.filter(SingleVenue => SingleVenue.venue.name.includes(item));
     this.changeFilteredPlaces(val);
     console.log(val);
 }
 

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  animateMarker=(key)=>{
      this.setState({animateKey:key})
  }



  componentDidMount(){
    this.AllVenues();
  }
	render(){
	var highlightedIcon = {
    url:  'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|FFFF24|40|_|%E2%80%A2', // url
    scaledSize: new this.props.google.maps.Size(30, 40), // scaled size
    };
    var defaultIcon = {
    url: 'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|0091ff|40|_|%E2%80%A2', // url
    scaledSize: new this.props.google.maps.Size(20, 30), // scaled size
    };
    console.log(this.state.filteredPlaces);
		return(



    <div className="map">
  {/*
<ListItem animateMarker = {this.animateMarker} selectedPlaces = {this.state.selectedPlaces} style = {this.state.styleList} venues={this.state.filteredPlaces} onMarkerClick={this.onMarkerClick} onMapClicked={this.onMapClicked} filterPlaces={this.filterPlaces} /> 

  */}
   <div style={this.state.styleList}>
        <h4>Places you should visit near</h4>
        <h3>New Delhi, India</h3>
              <input tabIndex='1' aria-label="Place" placeholder='Search here ... ' onChange={(event)=>this.filterPlaces(event.target.value)} style={{width:'100%' , height: '25px'}}></input>
              <ol>
              {
                this.state.filteredPlaces.map((Singlevenue,id)=>(
                <li onClick={(event)=>  this.animateMarker(event.target.id) } key={Singlevenue.referralId} id={Singlevenue.referralId}> 
                {Singlevenue.venue.name}
                </li>
                ))
              }
              </ol>      
              <Footer />
              </div>
      
            <Map 
            google={this.props.google} 
            style ={this.state.styleMap}
            zoom={12}      
            initialCenter = {{ lat: 28.5899, lng: 77.2090 }}>
          
          {
            this.state.filteredPlaces.map( (SingleVenue,referralId) => 
             <Marker 
             onClick={this.onMarkerClick.bind(this)} 
             key={SingleVenue.referralId}
              position = {{ lat: SingleVenue.venue.location.lat, lng: SingleVenue.venue.location.lng }}
              title={SingleVenue.venue.name} 
              animation = {(this.state.animateKey===SingleVenue.referralId)?2:null}
              icon={
                    this.state.mouseOnTitle!==SingleVenue.title
                    ? defaultIcon : highlightedIcon
                  }
              venueAddress = {SingleVenue.venue.location.address}
              venueCity = {SingleVenue.venue.location.city}
              venueType = {SingleVenue.venue.categories[0].name}
              />
            )
          }
               
               {
                <InfoWindow
                marker={this.state.activeMarker}
                style={this.state.backgroundandText}
                onClose={this.windowHasClosed}
                visible={this.state.showingInfoWindow}>
                  <><div>
                    <h3>{this.state.selectedPlace.title}</h3>
                    <h4>Type: {this.state.selectedPlace.venueType} </h4>
                   Address: {this.state.selectedPlace.venueAddress}
                   
                  ,  {this.state.selectedPlace.venueCity}
                  </div>
                  </>
              </InfoWindow> 
          }
			</Map>
		</div>

			);
	}
}
export default GoogleApiWrapper({
  apiKey: ("YOUR API KEY")
})(ShowingMap)