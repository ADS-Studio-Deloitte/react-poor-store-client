import React from 'react';
import './App.css';
import NavBar from './components/navbar/NavBar';
import { Outlet } from 'react-router-dom';
import * as paths from './router/pagePaths';

const navBarLinks = [
  {displayName: 'Catalogue', ref: paths.productCataloguePath},
  {displayName: 'Cart', ref: paths.cartPath}
];

function App() {
  return (
    <div className="App">
      <NavBar title="My Favourite Shop" links={navBarLinks} />
      <Outlet />
    </div>
  );
}

export default App;
