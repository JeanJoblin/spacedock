import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Ship } from './features/Ships/Ship.js';
import { ShipBuilder } from './features/ShipBuilder/ShipBuilder';

function App() {

  return (
    <div className="App">
      <header>
      </header>
        <ShipBuilder />
    </div>
  );
}

export default App;
