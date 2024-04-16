import React from 'react';
import './App.css';
import NavBar from './components/navbar/NavBar';
import { Outlet } from 'react-router-dom';

const navBarLinks = [
  {displayName: 'Home', ref: 'home'},
  {displayName: 'Cart', ref: 'cart'}
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
