import React, { useState } from 'react';
import './ship.css';
import { getFittingType } from '../ShipBuilder/shipBuilderSlice';

const hulls = require('../../app/resources/hulls.json');
const fittings = require('../../app/resources/fittings.json');
const weapons = require('../../app/resources/weapons.json')
const defenses = require('../../app/resources/defenses.json');
const stats = ['HP', 'Power', 'AC', 'Mass', 'Armor', 'Crew', 'Speed', 'CP', 'Skill',];

export function Ship(props) {

  const currentHull = hulls.FreeMerchant;
  const { curFittings } = props;
  console.log(curFittings);
  let currentDefenses = [];
  let currentWeapons = [];
  let currentFittings = [];
  curFittings.forEach((fitting) => {
    const type = getFittingType(fitting);
    if(type == defenses) {
      currentDefenses.push(fitting);
    } else if( type == weapons) {
      currentWeapons.push(fitting);
    } else if( type == fittings) {
      currentFittings.push(fitting);
    }
  });

  return (
    <div className='Ship'>
      <div className='ShipTitle'>
        <span className='Name'>SHIPNAME</span>
        <span className='Hull'>HULLTYPE</span>
      </div>
      <hr/>
      <div className='ShipBody'>
        <div className='ShipStats'>
          {stats.map((key, ind) => {
            return (
              <div 
              key={key} 
              className={ind %2 === 0 ? 'Stat' : 'StatRight'}
              >
                  <span key={key + 'Key'} className='StatKey'>{key}:</span>
                  <span key={key + 'Value'} className='StatValue'>{currentHull[key]}</span>
              </div>
          )})}
        </div>
        <div className='ShipParts'>
          <div className='ShipWeapons'>
            <span className='Fitting'>Weapons: </span>
            <div className='FittingValWrapper'>
              {currentWeapons.length > 0 ? currentWeapons.map((weapon) => {
                return (
                  <span>{weapon}({weapons[weapon].Dmg}, {weapons[weapon].Qualities})</span>
                )
              }) : <span>None</span>
            }
            </div>  
          </div>
          <div className='ShipDefenses'>
            <span className='Fitting'>Defenses: </span>
            <div className='FittingValWrapper'>
              {currentDefenses.length > 0 ? currentDefenses.map((defense) => {
                return (
                  <span>{defense}</span>
                )
              }) 
              : <span>None</span>
              }
            </div>
          </div>
          <div className='ShipFittings'>
            <span className='Fitting'>Fittings: </span>
            <div className='FittingValWrapper'>
              {currentFittings.length > 0 ? currentFittings.map((fitting) => {
                return (
                  <span>{fitting}</span>
                )
              })
            : <span>None</span>
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
