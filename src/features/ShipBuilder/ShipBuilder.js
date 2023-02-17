import { addFitting, selectEquippedFittings } from './shipBuilderSlice';
import React from 'react';
import { Ship } from '../Ships/Ship';
import { useDispatch, useSelector, } from 'react-redux';

export function ShipBuilder(props) {
  // const { current: fittings } = useRef(['MultifocalLaser', 'FuelScoops', 'FoxerDrones',]);
  const { passFittings, passHull } = props;
  const fittings = ['MultifocalLaser', 'FuelScoops', 'ExtendedLifeSupport', 'AugmentedPlating'];
  const dispatch = useDispatch();
    passFittings.forEach((fitting) => {
      console.log('Fitting to add: ', fitting);
      dispatch(addFitting(fitting));
    }, [fittings]);

  const allFittings = useSelector(selectEquippedFittings);


  console.log('all fittings on ship: ', allFittings);
  return (
    <Ship allFittings={allFittings}></Ship>
  )
}