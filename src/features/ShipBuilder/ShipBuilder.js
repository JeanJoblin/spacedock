import { addFitting, selectFittings, shipBuilderSlice } from './shipBuilderSlice';
import React from 'react';
import { Ship } from '../Ships/Ship';
import { useSelector } from 'react-redux';

let fittings = ['MultifocalLaser', 'BoardingCountermeasures', 'FuelScoops', 'SpinalBeamCannon' ];

fittings.forEach((fitting) => addFitting(fitting));

export function ShipBuilder() {

  let Fittings = useSelector(selectFittings);

  return (
    <Ship fits={Fittings}></Ship>
  )
}