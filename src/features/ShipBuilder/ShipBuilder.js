import './shipBuilder.css';
import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { shipRoles } from '../../app/resources/shipRoles';
import { changeParam, selectReqs, toggleRequired, selectParams } from './shipBuilderSlice';
import { drives, hulls } from '../../app/resources/tables';
import { crewQuals } from '../../app/resources/genFunctions';
import { genShip } from '../../app/resources/shipGen';
import { addShip } from '../Hanger/hangerSlice';

export function ShipBuilder() {
  
  const dispatch = useDispatch();
  const required = useSelector(selectReqs);
  const params = useSelector(selectParams);

  const paramSelector = (paramsList, paramName) => {
    let obj;
    switch(paramName) {
      case 'role':
        obj = shipRoles;
        break;
      case 'crew':
        break;
      case 'drive':
        obj = drives;
        break;
      case 'hull':
        obj = hulls;
        break;
      default:
        throw new Error('Param is not assignable');
    };
    function handleParamChange(e) {
      let action = {
        target: paramName,
        value: obj ? obj[e.target.value] : e.target.value,
      }
      dispatch(changeParam(action));
    }
    return (
      <select onInput={handleParamChange} >
        {paramsList.map((param, id) => {
          return (
            <option
            key = {(param?.name ? param.name : param) + id}
            value = {param}
            >{obj ? obj[param].name : param}</option>
          );
        })}
      </select>
    )
  };
  //End Param Selector

  const requiredCheck = (role) => {
    function handleToggleReq(e) {
      dispatch(toggleRequired(e.target.value))
    }
    return (
      <input type="checkbox" value={role} onChange={handleToggleReq}>
      </input>
    )
  }
  //End requiredCheck

  const handleGenShip = () => {
    console.log('Clicked');
    let setParams = {};
    Object.keys(required).forEach(key => {
      if(required[key] === true) {
        let paramName = key + "Param";
        setParams[paramName] = params[key];
      };
    });
    dispatch(addShip(genShip(setParams)));
  }

  return (
    <div className="ShipBuilder Floater">
          <div>Role: </div>
          {paramSelector(Object.keys(shipRoles), 'role')}
          {requiredCheck('role')}
          <div>Hull: </div>
          {paramSelector(Object.keys(hulls), 'hull')}
          {requiredCheck('hull')}
          <div>Crew: </div>
          {paramSelector(crewQuals, 'crew')}
          {requiredCheck('crew')}
          <div>Drive: </div>
          {paramSelector(Object.keys(drives), 'drive')}
          {requiredCheck('drive')}
      <button onClick={handleGenShip}>Generate Ship</button>
    </div>
  )
}