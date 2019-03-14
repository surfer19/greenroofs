import React, { Component } from 'react';
import Map from './map/Map';
import axios from 'axios';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        {/* <header className="App-header"> */}        
        <Map/>
      </div>
    );
  }
}

export default App;
