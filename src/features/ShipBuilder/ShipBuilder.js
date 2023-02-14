import { addFitting, selectFittings, addFittingArr, selectWeapons, selectDefenses, selectEquippedFittings } from './shipBuilderSlice';
import React, { useEffect, useRef } from 'react';
import { Ship } from '../Ships/Ship';
import { useDispatch, useSelector, } from 'react-redux';

export function ShipBuilder() {
  // const { current: fittings } = useRef(['MultifocalLaser', 'FuelScoops', 'FoxerDrones',]);
  const fittings = ['MultifocalLaser', 'FuelScoops', 'FoxerDrones', 'AugmentedPlating'];
  const dispatch = useDispatch();
    fittings.forEach((fitting) => {
      console.log('Fitting to add: ', fitting);
      dispatch(addFitting(fitting));
    }, []);

  const allFittings = useSelector(selectEquippedFittings);


  console.log('all fittings on ship: ', allFittings);
  return (
    <Ship allFittings={allFittings}></Ship>
  )
}