import React from 'react';
import './App.css';
import { ShipBuilder } from './features/ShipBuilder/ShipBuilder';
import { DryDock } from './features/DryDockConfig/DryDock';
import { Hanger } from './features/Hanger/Hanger';
import './app/resources/fonts/RoboGirls.ttf';
import { Intro } from './features/Intro/Intro';
// PopoutList function component is for mouseover adding fittings to shoppinglist 
function App() {

  return (
    <div className="App">
      <header>
      </header>
      <h1>SPACEDOCK</h1>
        {/* <PopoutList/> */}
        <Intro/>
        <div className="Build">
          <DryDock />
          <ShipBuilder />
        </div>
        <Hanger />
    </div>
  );
}

export default App;
