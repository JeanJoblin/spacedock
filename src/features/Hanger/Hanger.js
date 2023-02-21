import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectShips } from './hangerSlice';
import { Ship } from '../Ships/Ship';


export function Hanger() {
  const ships = useSelector(selectShips);
 
  const renderShips = ships.map((ship, ind) => {
    return (
      <Ship 
        allFittings={ship.fittings}
        hull={ship.hull}
        name={ship.name}
        crew={ship.crew}
        cost={ship.cost}
        maint={ship.maint}
        pay={ship.pay}
        key={ind}
        ></Ship>
    )
  });

  return (
    <div className='Hanger'>
      <div className='Hanger Title'>
        <span>Hanger</span>
        {renderShips}
      </div>
    </div>
  )
}


