import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Ship } from './features/Ships/Ship.js';
import { ShipBuilder } from './features/ShipBuilder/ShipBuilder';
import { DryDock } from './features/DryDockConfig/DryDock';
import { Hanger } from './features/Hanger/Hanger';
import './app/resources/fonts/RoboGirls.ttf';

function App() {

  return (
    <div className="App">
      <header>
      </header>
      <h1>SPACEDOCK</h1>
        <DryDock />
        <Hanger />
    </div>
  );
}

export default App;
