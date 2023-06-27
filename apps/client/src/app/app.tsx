// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from 'react';
import styles from './app.module.css';
import NxWelcome from './nx-welcome';
import '../assets/css/app.css'
import Footer from './components/Footer';
import Order from './components/Order';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';


import Map from './components/Map';
import Home from './components/Home';
import Products from './components/Products';

export function App() {

  
  return (
   <>
        
        
      
        <BrowserRouter>
      

      <div>

      <Link to="/" style="{inLineStyles}" >
      Home
      </Link>
      <Link to="/" style="{inLineStyles}" >
      Map
      </Link>
      <Link to="/" style="{inLineStyles}" >
      Productos
      </Link>


      </div>



      <Switch>


    <Route path='/'>
    <Home/>
    </Route>

    <Route path='/map'>
    <Map/>
    </Route>

    <Route path='/products'>
    <Products/>
    </Route>
    </Switch>
    
    </BrowserRouter>

        
   </>
  );
}

export default App;
