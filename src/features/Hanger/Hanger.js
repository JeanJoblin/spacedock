import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectShips } from './hangerSlice';
import { Ship } from '../Ships/Ship';
import './hanger.css';


export function Hanger() {
  const ships = useSelector(selectShips);
 
  const renderShips = ships.map((ship, ind) => {
    return (
      <Ship 
        passedFittings={ship.fittings}
        hull={ship.hull}
        name={ship.name}
        crew={ship.crew}
        cost={ship.cost}
        maint={ship.maint}
        pay={ship.pay}
        key={ind}
        id={ind}
        freeMass={ship.freeMass}
        freePower={ship.freePower}
        cargoSetting={ship.cargoSetting}
        editable={ship.editable}
        role={ship.role}
        ></Ship>
    )
  });

  return (
    <div className='Hanger'>
      <div className='Hanger Title'>
        <span>Hanger</span>
      </div>
      {renderShips}
    </div>
  )
}


