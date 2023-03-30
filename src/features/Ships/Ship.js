import React from 'react';
import './ship.css';
import { useDispatch } from 'react-redux';
import { changeShipName } from './shipSlice';
import { hulls } from '../../app/resources/tables';
import { getFittingObj } from '../../app/resources/genFunctions.js';
import { deleteShip, toggleEdit } from '../Hanger/hangerSlice';

const stats = [['HP', 'Power', 'AC', 'Mass', 'Armor', 'Crew', 'Speed', 'NPC CP', 'Hull Class', 'Crew Skill',], ['HP', 'power', 'AC', 'mass', 'armor', 'crew', 'speed', 'CP', 'class', 'skill']];

export function Ship(props) {
  // const currentHull = useSelector(selectHull);
  let {
    passedFittings,
    hull, 
    name,
    cost,
    crew,
    maint,
    pay,
    freeMass,
    freePower,
    id,
    cargoSetting,
    editable,
    role,
  } = props;

  const dispatch = useDispatch();
  
  let allFittings = [];
  if(passedFittings?.length) {
    allFittings = passedFittings;
  };
  let cargoSpaceAmount = allFittings.filter(fit => fit === 'CargoSpace' || fit?.name === 'Cargo Space').length;
  // const toggleEditThis = () => {
  //   dispatch(toggleEdit(id));
  // };
  let currentHull = hull ? hull : hulls.FreeMerchant;
  let currentDefenses = [];
  let currentWeapons = [];
  let currentFittings = [];
  let numOfFitting = {};
  let extras = {
    HP: null,
    AC: null,
    Speed: null,
    Crew: null,
  };
  const hullTonnage = {
    Fighter: 2,
    Frigate: 20,
    Cruiser: 200,
    Capital: 2000,
  }
  const cargoHandler = {
    //cargoConvert currently being passed as true from hanger
    cargoConvert: cargoSetting,
    tonnage: (cargoSpaceAmount + freeMass) * hullTonnage[hull.class],
    mass() {
      if(cargoHandler.cargoConvert === true) {
        return 0;
      } else {
        return freeMass;
      }
    },
    pushCargoSpace() {
      if(cargoHandler.cargoConvert === true) {
        for( let i = 0; i < freeMass; i++ ) {
          allFittings.push('CargoSpace');
        }
      }
      return;
    },
    massToCargo(key) {
      if(key === 'Cargo Space') {
        return ` (${cargoHandler.tonnage} tons)`;
      }
    }
  }
if(passedFittings) {
  allFittings = passedFittings.slice();
};
  console.log('allFittings:', allFittings);
  console.log(cargoHandler.tonnage);
  cargoHandler.pushCargoSpace();
//Sort all fittings passed in into respective arrays. if they have pure stat changes, add those to an array to be displayed
allFittings.forEach((input) => {
    let fitting = input;
    if(typeof(fitting) === 'string') {
      fitting = getFittingObj(input);
    }
    switch(fitting.name) {
      case 'Ablative Hull Compartements':
        extras.AC += 1;
        extras.HP += 20;
        break;
      case 'Augmented Plating':
        extras.AC += 2;
        extras.Speed -= 1;
        break;
      case 'Extended Life Support':
        const crewBonus = currentHull.crew.match(/\/(\d+)/);
        if(extras.Crew === null) {
          extras.Crew = crewBonus[1];
        } else {
          extras.Crew += crewBonus[1];
        }
        break;
      default:
        break;
    }
    if(Object.keys(numOfFitting).includes(fitting.name)) {
        numOfFitting[fitting.name] ++;
    } else {
      numOfFitting[fitting.name] = 1;
      switch(fitting.type) {
        case 'weapon':
          currentWeapons.push(fitting);
          break;
        case 'defense':
          currentDefenses.push(fitting);
          break;
        case 'fitting':
          currentFittings.push(fitting);
          break;
        default:
          throw(new Error('This has not been accounted for'));
      }
    }
  });

  //Test bit for checking role of a ship from generation:
  const dispRole = (role) => {
    return (
      <div className='Role'>
        Role: {role}
      </div>
    )
  };

  //used to display current crew only after crew min/max
  const isCrew = (key) => {
    if(key === 'Crew') {
      return `(${crew})`;
    }
  }
  
  //If stat key is either mass or power, display the remaining free
  const showFree = (key) => {
    if(key === 'Mass') {
      return `/${cargoHandler.mass()} free`;
    } else if(key === 'Power') {
      return `/${freePower} free`;
    }
  };

  //Display the number of a fitting before it in the list
  const displayNum  = (fitting) => {
    if(numOfFitting[fitting.name] > 1){
      if(fitting.name === 'Cargo Space') {
        // let tonnage = freeMass * hullTonnage[hull.class];
        // return `${tonnage} tons of `;
        return;
      } else {
        return `${numOfFitting[fitting.name]}x `;
      }
    }
  };

  const removeShip = (e) => {
    dispatch(deleteShip(e.target.value));
  };

  const displayShipName = () => {
    const changeName = (e) => {
      dispatch(changeShipName(e.target.value));
    }
    if(editable) {
      return (
        <div>
          <input value={name} onChange={changeName} placeholder="Ship Name" />
        </div>
      )
    } else {
      console.log('Name: ', name);
      return (
        <div className='Name'>
          {name ? name : 'ShipName'}
        </div>
      )
    }
  };

  const displayWeapons = () => {
    // const deleteWeapon = (e) => {
    //   dispatch(removeWeapon(e.target.value));
    // }
    if(editable) {
      return (
      <div className='ShipWeapons'>
        <span className="Fitting">Weapons:</span>
        <div className="FittingValWrapper">
        {currentWeapons.length > 0 ? currentWeapons.map((weapon, ind) => {
              return (
                <button key={weapon.name}>
                  <span key={weapon.name}>{displayNum(weapon)}{weapon.name}</span>
                  <br/>
                </button>
              )
            }) : <span>None</span>
            }
            <button>Add</button>
        </div>
      </div>
      )
    } else {
      return (
        <div className='ShipWeapons'>
          <span className='Fitting'>Weapons:</span>
          <div className='FittingValWrapper'>
            {currentWeapons.length > 0 ? currentWeapons.map((weapon, ind) => {
              return (
                <div key={weapon.name}>
                  <span key={weapon.name}>{displayNum(weapon)}{weapon.name} ({weapon.dmg}, {weapon.qualities}){ind + 1  !== currentWeapons.length ? ', ' : null }</span>
                  <br/>
                </div>
              )
            }) : <span>None</span>
            }
          </div>  
        </div>
      )
    }
  }

//todo: make the max crew render differently from generated crew. Removed the + when current crew


//Return for the full React component
  return (
    <div className='Ship'>
      <div className='ShipTitle'>
        {displayShipName()}
        <span className='Hull'>{currentHull.name}</span>
        <button onClick={removeShip} value={id}>delete</button>
        {/* <button onClick={toggleEditThis}>edit</button> */}
      </div>
      <hr/>
      <div className='ShipBody'>
        <div className='ShipStats'>
          {stats[0].map((key, ind) => {
            return (
              <div 
              key={key} 
              className={ind % 2 === 0 ? 'Stat' : 'StatRight'}
              >
                  <span key={key + 'Key'} className='StatKey'>{key}:</span>
                  <span key={key + 'Value'} className='StatValue'>{currentHull[stats[1][ind]] }{ extras[key] ? `(${extras[key] > 0 ? '+' : ''}${extras[key]})` : null }{isCrew(key)}{showFree(key)}</span>
                  
              </div>
          )})}
        </div>
        {role ? dispRole(role) : null}
        <div className='ShipParts'>
          <hr/>
          {displayWeapons()}
          <hr/>
          <div className='ShipDefenses'>
            <span className='Fitting'>Defenses:</span>
            <div className='FittingValWrapper'>
              {currentDefenses.length > 0 ? currentDefenses.map((defense, ind) => {
                return (
                  <span key={defense.name}>{displayNum(defense)} {defense.name}{ind + 1  !== currentDefenses.length ? ', ' : null }</span>
                )
              }) 
              : <span>None</span>
              }
            </div>
          </div>
          <hr/>
          <div className='ShipFittings'>
            <span className='Fitting'>Fittings: </span>
            <div className='FittingValWrapper'>
              {currentFittings.length > 0 ? currentFittings.map((fitting, ind) => {
                return (
                  <span key={fitting.name}>{displayNum(fitting)} {fitting.name}{cargoHandler.massToCargo(fitting.name)}{ind + 1  !== currentFittings.length ? ', ' : null }
                  </span>
                )
              })
            : <span>None</span>
            }
            </div>
          </div>
          <hr/>
          <div className='ShipCosts'>
            <span className='Cost'>Cost: </span>
            <div className='CostBreakdown'>
              <span>{cost} base price, {maint} maintenance</span>
              <br/>
              <span>{pay} yearly crew cost for {crew} crew</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
