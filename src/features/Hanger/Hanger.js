import React from 'react';
import { useSelector } from 'react-redux';
import { selectShips } from './hangerSlice';


export function Hanger() {
  const ships = useSelector(selectShips);

  
}


