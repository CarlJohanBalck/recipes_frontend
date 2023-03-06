import React, { Component } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Recepies from './components/Recepies';
import AddRecipe from './components/AddRecipe';
import AddIngredients from './components/AddIngredients';
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
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
  
}

export default App;
