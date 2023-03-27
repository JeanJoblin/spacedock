import './shipBuilder.css';
import { addFitting, selectEquippedFittings } from './shipBuilderSlice';
import React from 'react';
import { Ship } from '../Ships/Ship';
import { useDispatch, useSelector, } from 'react-redux';
import { shipRoles } from '../../app/resources/shipRoles';
import { changeParam } from './shipBuilderSlice';
import { hullsArray, drivesArray, hulls } from '../../app/resources/tables';
import { crewQuals } from '../../app/resources/genFunctions';

export function ShipBuilder() {
  
  const dispatch = useDispatch();

  const paramSelector = (paramsList, paramName) => {
    function handleParamChange(e) {
      console.log('e:', e);
      console.log('e.target: ', e.target);
      let action = {
        target: paramName,
        value: e.target.value,
      }
      dispatch(changeParam(action));
    }
    return (
      <select onInput={handleParamChange} >
        {paramsList.map((param, id) => {
          return (
            <option
            key = {(param?.name ? param.name : param) + id}
            value = {param?.name}
            >{param?.name ? param.name : param}</option>
          );
        })}
      </select>
    )
  }

  return (
    <div className="ShipBuilder">
      <h2>ShipBuilder</h2>
      <div className="Param Container">
        <div className="Param Names">
          <div>Role: </div>
          <div>Hull: </div>
          <div>Crew: </div>
          <div>Drive: </div>
        </div>
        <div className="Param Values">
          {paramSelector(Object.keys(shipRoles), 'role')}
          {paramSelector(Object.keys(hulls), 'hull')}
          {paramSelector(crewQuals, 'crew')}
          {paramSelector(drivesArray, 'drive')}
        </div>
      </div>
    </div>
  )
}