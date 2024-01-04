import React, { Component } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Recepies from './components/Recepies';
import GoogleLoginComponent from './components/GoogleLoginComponent';
import AddRecipe from './components/AddRecipe';
import Navbar from './components/Navbar';

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Routes>
            <Route exact path="/" element={<Recepies />}/>
            <Route exact path="/addRecipe" element={<AddRecipe />}/>
            <Route exact path="/login" element={<GoogleLoginComponent />}/>
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
  
}

export default App;
