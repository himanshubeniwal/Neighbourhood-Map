import React, { Component } from 'react';
import {Route} from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';
//import Header from './Header';
import ShowingMap from './ShowingMap';
//import Footer from './Footer';
class App extends Component {
  state = {
    venues:[],    
    styleHeader:{
      letterSpacing: '8px'
    }
  }
  render() {
    return (
      <div className="App">
      <Route path="/" render={ () => (
        <>
      <div className="App-header" style={this.state.styleHeader}>
        <h2> NEIGHBOURHOOD MAP </h2>
      </div>
        <ShowingMap />
        {/*<Footer />*/}
        </>
        )}/>
      </div>
    );
  }
}
export default App;