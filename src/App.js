import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom'
import Recepies from './components/Recepies';

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Recepies/>
        </div>
      </BrowserRouter>
    );
  }
  
}

export default App;
