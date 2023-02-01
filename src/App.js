import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Ship } from './features/Ships/Ship';

function App() {
  return (
    <div className="App">
      <header>
      </header>
      <body>
        <Ship />
      </body>
    </div>
  );
}

export default App;
