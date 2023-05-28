import './shipBuilder.css';
import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { shipRoles } from '../../app/resources/shipRoles';
import { changeParam, selectReqs, toggleRequired, selectParams, clearAll } from './shipBuilderSlice';
import { drives, hulls } from '../../app/resources/tables';
import { crewQuals } from '../../app/resources/genFunctions';
import { genShip } from '../../app/resources/shipGen';
import { addShip } from '../Hanger/hangerSlice';

export function ShipBuilder() {
  
  const dispatch = useDispatch();
  const required = useSelector(selectReqs);
  const params = useSelector(selectParams);

  const paramSelector = (paramsList, paramName) => {
    //Load object if there is one
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
    //Send currently selected option to state. This action is attached to each selector
    function handleParamChange(e) {
      console.log(e);
      e.preventDefault();
      let action = {
        target: paramName,
        //Changed from obj ? obj[e.target.value] : e.target.value
        value: obj?.[e.target.value] ?? e.target.value
      }
      dispatch(changeParam(action));
    };

    console.log('checking state-held value', params[paramName]?.name ?? params[paramName]);
    console.log('checking required: ', required[paramName]);
    //for each entry in the list, create a selector element with that entry's name (if it has one) or the entry if it's a string
    return (
      <select className={paramName + 'Select'} onInput={handleParamChange} >
        {paramsList.map((param) => {
          // console.log('param:', param)
          // console.log('obj', obj ?? 'no object');
          // console.log("obj[param]?.name or param", obj ? obj[param]?.name ?? param : false);
          //Key and text of option check for obj, if it exists, check if param consists in obj. If no obj or, param is not in obj, use param.
          return (
            <option
            key = { 'opt' + (obj ? ( obj[param]?.name ?? param ) : param)}
            value = {param}
            >{obj ? ( obj[param]?.name ?? param ) : param}</option>
          );
        })}
      </select>
    )
  };
  //End Param Selector

  const handleClearAll = () => {
    ['role', 'hull', 'crew', 'drive'].forEach(type => {
      document.querySelector(`.${type}Select`).value = 'Random';
    });
    dispatch(clearAll());
  }

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
  //End Generate Ship function

  return (
    <div className="ShipBuilder Floater">
      <h3 className="title">Generate Random Ship</h3>
          <div className="Names">Role: </div>
          {paramSelector(['Random', ...Object.keys(shipRoles)], 'role')}
          <div className="Names">Hull: </div>
          {paramSelector(['Random', ...Object.keys(hulls)], 'hull')}
          <div className="Names">Crew: </div>
          {paramSelector(['Random', ...crewQuals], 'crew')}
          <div className="Names">Drive: </div>
          {paramSelector(['Random', ...Object.keys(drives)], 'drive')}
      <button className="GenShip" onClick={handleGenShip}>Generate Ship</button>
      <button className="ClearAll" onClick={handleClearAll}>Clear All</button>
    </div>
  )
}