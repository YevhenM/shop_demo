import './App.css';
import {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import ProductList from './ProductList'
import ProductPage from './ProductPage';

function App() {
  return (
    <div className="App">
      {/* <div className='home'>
        <a href="/">
          Home</a>
      </div> */}
      <div className='content'>
      <Router>
          <Switch>                
                <Route exact = {true} path='/'>
                  <Redirect to='/products'/>
                </Route>
                <Route path='/products/id/:id'>
                   <ProductPage /> 
                </Route> 
                <Route exact = {false} path='/products'>
                   <ProductList /> 
                </Route>
                              
          </Switch>
      </Router>
      </div>
      
    </div>
  );
}

export default App;
