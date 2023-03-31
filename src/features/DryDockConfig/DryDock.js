import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './DryDock.css';
import { hulls, fittings, weapons, defenses } from '../../app/resources/tables';
import { changeHull, changeSelectedItem,
  selectShoppingList, addSelectedToShoppingList,
  selectHull, selectMassReq,
  selectPowerReq, selectTotalCost,
  removeFromShoppingList, selectMountableDefenses,
  selectMountableFittings, selectMountableWeapons, selectAvPower, selectAvMass, selectAvHard, selectHardReq, clearShoppingList, changeName, selectName, clearName, selectCrewParam, changeCrewParam} from './dryDockSlice';
import { getHullObj, getFittingObj, crewQuals, } from '../../app/resources/genFunctions.js';
import { addShip } from '../Hanger/hangerSlice';

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

  const mountable = {
    weapon: mountableWeapons,
    defense: mountableDefenses,
    fitting: mountableFittings,
  }

  const isOverweight = () => {
    if(massReq > getHullObj(hull).mass) {
      return true;
    } else {
      return false;
    }
  }

  const isOverpower = () => {
    if(powerReq > getHullObj(hull).power) {
      // console.log('hull power: ', hull.power);
      // console.log('powerReq: ', powerReq);
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
  
  // useEffect(() => {
  //   dispatch(addShip(genShip()))
  // }, [])
  
  const passShip = () => {
    // console.log('crewParam in passShip: ', crewParam);
    // console.log('Shopping list to be passed: ', shoppingList);
    // let drive = false;
    // shoppingList.forEach(fitting => {
    //   if(fitting.includes('SpikeDrive')) {
    //     console.log("Found a spike drive!");
    //     drive = true;
    //   }
    // });
    // if(drive === false) {
    //   console.log('I should be pushing a drive');
    //   dispatch(addSpikeDrive());
    // };
    // console.log('Here is the shoppingList to be fittings: ', shoppingList);
    dispatch(addShip({
        name: name,
        hull: hull,
        fittings: shoppingList,
        freeMass: avMass,
        freePower: avPower,
        totalCost: totalCost,
        crewParam: crewParam,
      }
    ));
    dispatch(clearShoppingList());
    dispatch(clearName());
  }
 
  const addAnyFitting = (e) => {
    dispatch(changeSelectedItem(e.target.value));
  };
  const handleAddShopping = (e) => {
    e.preventDefault();
    dispatch(addSelectedToShoppingList(e.target.value));
  };
  const deleteItem = (e) => {
    e.preventDefault();
    // console.log('event', e);
    // console.log('event.target', e.target);
    // console.log('event.target.key', e.target.value);
    dispatch(removeFromShoppingList(e.target.value));
  };
  // console.log('shoppingList: ', shoppingList);

  const clearShopping = (e) => {
    e.preventDefault();
    dispatch(clearShoppingList());
  }

  //name input mini component
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
        id="Name"
        />
      </div>
    );
  }

  //Crew size selector mini-component
  const crewSelector = () => {
    const paramsWithNames = [crewQuals, ['Crew Size', 'Below Minimum', 'Skeleton', 'Low', 'Medium', 'High', 'Packed', 'Any']]

    const handleCrewChange = (e) => {
      dispatch(changeCrewParam(e.target.value));
      console.log(crewParam);
    }
    //label used to be here, but that made styling much harder
    return (
        <select onInput={handleCrewChange} id="Crew">
          {paramsWithNames[0].map((param, id) => {
            return (
              <option
              key={param + id}
              value={param}
              >{paramsWithNames[1][id]}
              </option>
            );
          })}
        </select>
    );
  };

  //Fitting Selector mini-component
  const fittingSelector = (list) => {
    const keys = Object.keys(list);
    const type = list[keys[0]].type;
    // console.log('type: ', type);
    let newList = keys.map((item, ind) => {
      let disabled = (mountable[type][ind] ? (hull.includes('Station') && item.includes('SpikeDrive')) : true )
      return [item, disabled];
    });
    let sortedList = newList.sort((a, b) => {
      if(a[1] === true && b[1] === false) {
        return 1;
      } else if(a[1] === false && b[1] === true) {
        return -1;
      } else {
        return 0;
      };
    });
    return (
      <select onInput={addAnyFitting} id={type + 's'}>
      {sortedList.map((key, ind) => {
          return (
          <option key={key[0]+ind} value={key[0]} disabled={key[1]}>
          {list[key[0]].name}
          </option>
        )
      })}
    </select>
    )
  }

  //actual React function return
  return (
    <div className='DryDock Floater'>
      <div className='Options'>
        <div className='Frame'>
          <div className="Inputs">
            <div>
              <label htmlFor="Name">Name: </label>
              <label htmlFor="Crew">Crew: </label>
              <label htmlFor="Hulls">Hull: </label>
            </div>
            <div>
              {nameInput()}
              {crewSelector()}
              <select onInput={handleHullChange} id="Hulls">
                {Object.keys(hulls).map((key) => {
                  return (
                    <option key={key} value={key}>
                      {hulls[key].name}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className='Available'>
            <div>Mass:</div> <div className="Num">{avMass}</div>
            <div>Power:</div> <div className="Num">{avPower}</div>
            <div>Hardpoints:</div> <div className="Num">{avHard}</div>
          </div>
        </div>
      <div className='Outfit'>
        <div>
          <label htmlFor='weapons'>Weapons: </label>
          <label htmlFor='defenses'>Defenses: </label>
          <label htmlFor='fittings'>Fittings: </label>
        </div>
        <div className="SelectContainer">
        {fittingSelector(weapons)}
        {fittingSelector(defenses)}
        {fittingSelector(fittings)}
        </div>
        <div>
        <button onClick={handleAddShopping} value='weapon'>Add</button>
        <button onClick={handleAddShopping} value='defense'>Add</button>
        <button onClick={handleAddShopping} value='fitting'>Add</button>
        </div>
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
      {shoppingList.length > 0 ? 
          <div className='ListButtons'>
            <button className='BuildShip' onClick={passShip}>Build This Ship
            </button>
            <button className='ClearShopping' onClick={clearShopping}>Clear List
            </button>
          </div>
        : null}
    </div>
  )
}