import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Ship } from './features/Ships/Ship.js';
import { ShipBuilder } from './features/ShipBuilder/ShipBuilder';

function App() {
  return (
    <div className="App">
      <header>
      </header>
      <body>
        <ShipBuilder />
      </body>
    </div>
  );
}

export default App;
