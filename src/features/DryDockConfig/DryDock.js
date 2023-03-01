import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './DryDock.css';
import { hulls, fittings, weapons, defenses } from '../../app/resources/tables';
import { installFitting, rehull } from '../Ships/shipSlice';
import { changeHull, changeSelectedItem,
  selectShoppingList, addSelectedToShoppingList,
  selectHull, selectMassReq,
  selectPowerReq, selectTotalCost,
  removeFromShoppingList, selectMountableDefenses,
  selectMountableFittings, selectMountableWeapons, selectAvPower, selectAvMass, selectAvHard, selectHardReq, clearShoppingList, changeName, selectName, clearName, selectCrewParam, changeCrewParam } from './dryDockSlice';
import { getHullObj, getFittingObj, crewQuals } from '../../app/resources/genFunctions.js';
import { addShip } from '../Hanger/hangerSlice';
import { PopoutList } from '../PopoutList/PopoutList';

export function DryDock() {

  const dispatch = useDispatch();
  const massReq = useSelector(selectMassReq);
  const powerReq = useSelector(selectPowerReq);
  const hardReq = useSelector(selectHardReq);
  const totalCost = useSelector(selectTotalCost);
  const name = useSelector(selectName);
  const handleHullChange = (e) => {
    dispatch(changeHull(e.target.value));
  };
  const shoppingList = useSelector(selectShoppingList);
  const hull = useSelector(selectHull);
  const mountableWeapons = useSelector(selectMountableWeapons);
  const mountableDefenses = useSelector(selectMountableDefenses);
  const mountableFittings = useSelector(selectMountableFittings);
  const avMass = useSelector(selectAvMass);
  const avPower = useSelector(selectAvPower);
  const avHard = useSelector(selectAvHard);
  const crewParam = useSelector(selectCrewParam);

  const isOverweight = () => {
    if(massReq > getHullObj(hull).mass) {
      return true;
    } else {
      return false;
    }
  }

  const isOverpower = () => {
    if(powerReq > getHullObj(hull).power) {
      console.log('hull power: ', hull.power);
      console.log('powerReq: ', powerReq);
      return true;
    } else {
      return false;
    }
  }

  const isOverhard = () => {
    if(hardReq > getHullObj(hull).hardpoints) {
      return true;
    } else {
      return false;
    }
  }

  const crewParams = [ 'Crew Amount', ...crewQuals ];
  
  const passShip = () => {
    console.log('crewParam in passShip: ', crewParam);
    dispatch(addShip({
        name: name,
        hull: hull,
        fittings: shoppingList,
        freeMass: avMass,
        freePower: avPower,
        totalCost: totalCost,
        sixMonth: (0.05 * totalCost),
        crewParam: crewParam,
      }
    ));
    dispatch(clearShoppingList());
    dispatch(clearName());
  }
 
  const addAnyFitting = (e) => {
    console.log(e);
    console.log(e.target);
    console.log(e.target.value);
    dispatch(changeSelectedItem(e.target.value));
  };
  const refitHull = (e) => {
    e.preventDefault();
    dispatch(rehull(e.target.value));
    alert('This currently changes the ship card displayed below.');
  };
  const handleAddShopping = (e) => {
    e.preventDefault();
    dispatch(addSelectedToShoppingList(e.target.value));
  };
  const deleteItem = (e) => {
    e.preventDefault();
    console.log('event', e);
    console.log('event.target', e.target);
    console.log('event.target.key', e.target.value);
    dispatch(removeFromShoppingList(e.target.value));
  };
  console.log('shoppingList: ', shoppingList);

  const clearShopping = (e) => {
    e.preventDefault();
    dispatch(clearShoppingList());
  }

  const nameInput = () => {
    const updateName = (e) => {
      console.log(e);
      dispatch(changeName(e.target.value));
    }
    return (
      <div>
        <input 
        className='ShipName' 
        placeholder='Ship Name'
        onChange={updateName}
        type='text'
        value={name}
        ></input>
      </div>
    );
  }

  const crewSelector = () => {
    const handleCrewChange = (e) => {
      dispatch(changeCrewParam(e.target.value));
      console.log(crewParam);
    }
    return (
      <form>
        <label>
          Crew:
        </label>
        <select onInput={handleCrewChange}>
          {crewParams.map((param, id) => {
            return (
              <option
              key={param + id}
              value={param}
              >{param}
              </option>
            );
          })}
        </select>
      </form>

    );
  }

  //actual React function return
  return (
    <div className='DryDock'>
      <div className='Options'>
      <div className='Outline'>
        {nameInput()}
        <form>
          <label>
            Hull:
          </label>
          <select onInput={handleHullChange}>
            {Object.keys(hulls).map((key) => {
              return (
                <option key={key} value={key}>
                  {hulls[key].name}
                </option>
              )
            })}
          </select>
        </form>
        {crewSelector()}
        <div className='Available'>
          <div>Mass: {avMass}</div>
          <div>Power: {avPower}</div>
          <div>Hardpoints: {avHard}</div>
        </div>
      </div>
      <div className='Outfit'>
        <form>
          <label>
            Weapons:
          </label>
          <br/>
          <select onInput={addAnyFitting}>
            {Object.keys(weapons).map((key, ind) => {
              return (
                <option key={key+ind} value={key} disabled={mountableWeapons[ind] ? false : true} >
                  {weapons[key].name}
                </option>
              )
            })}
          </select>
          <button onClick={handleAddShopping} value='weapon'>
              Add
          </button>
        </form>
        <form>
          <label for="Defense">
           Defenses:
          </label>
          <br/>
          <select onInput={addAnyFitting} name="Defense">
            {Object.keys(defenses).map((key, ind) => {
                return (
                <option key={key+ind} value={key} disabled={mountableDefenses[ind] ? false : true}>
                {defenses[key].name}
                </option>
              )
            })}
          </select>
          <button onClick={handleAddShopping} value='defense'>
            Add
          </button>
       </form>
        <form>
          <label>
            Fittings:
          </label>
          <br/>
          <select onInput={addAnyFitting}>
            {Object.keys(fittings).map((key, ind) => {
              return (
                <option key={key} value={key} disabled={mountableFittings[ind] ? false : true}>
                  {fittings[key].name}
                </option>
              )
            })}
          </select>
          <button onClick={handleAddShopping}
            value='fitting'>
              Add
          </button>
        </form>
      </div>
     
      </div>
      {shoppingList.length > 0 ?
        <div className='Shopping'>
          <div className='List'>
          {shoppingList.map((item, ind) => {
            return (
              <div key={item+ind}>
                <span>{ind + 1 < shoppingList.length ? getFittingObj(item).name + ', ' : getFittingObj(item).name }
                  <button value={ind} onClick={deleteItem} className='RemoveButton'>x</button>
                </span>
                <br/>
              </div>
              
            )
          })}
          </div>
          <div className="Receipt">
            <div>Costs:</div>
            <span>Credits: {totalCost}</span><br />
            <span>Mass: </span>
            <span className={isOverweight() ? 'Disallowed' : null}>{massReq}</span>
            <br />
            <span>Power: </span>
            <span className={isOverpower() ? 'Disallowed' : null}>{powerReq} </span>
            <br />
            <span>Hardpoint: </span>
            <span className={isOverhard() ? 'Disallowed' : null}>{hardReq}</span>
          </div>
          <br/>
        </div>
      : null}
      <div className='ListButtons'>
        <button className='BuildShip' onClick={passShip}>Build This Ship
        </button>
        <button className='ClearShopping' onClick={clearShopping}>Clear List
        </button>
      </div>
    </div>


  )
}