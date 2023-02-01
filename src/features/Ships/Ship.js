import React, { useState } from 'react';
import './ship.css';

const hulls = require('../../app/resources/hulls.json');
const stats = ['HP', 'Power', 'AC', 'Mass', 'Armor', 'Crew', 'Speed', 'CP', 'Skill',];

const fittings = require('../../app/resources/fittings.json');
const weapons = require('../../app/resources/weapons.json')
const defenses = require('../../app/resources/defenses.json');
const currentHull = hulls.FreeMerchant;
let freeMass = currentHull.Mass;

const currentWeapons = ['MultifocalLaser', 'ReaperBattery'];
const currentDefenses = null;
let currentFittings = ['FuelScoops'];
// currentFittings.forEach((fitting) => {
//   if(fittings[fitting].Mass.includes('#')) {
//     switch (currentHull.Class) {
//       case 'Frigate': freeMass -= 2*fittings[fitting].Mass;
//         break;
//       case 'Cruiser': freeMass -= 3*fittings[fitting].Mass;
//         break;
//       case 'Capital': freeMass -= 4*fittings[fitting].Mass;
//         break;
//     }
//     return;
//   }
// freeMass -= fittings[fitting].Mass
// });

export function Ship() {
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
            <span className='Fitting'>Weapons:</span>
            <div className='FittingValWrapper'>
              {currentWeapons ? currentWeapons.map((weapon) => {
                return (
                  <span> {weapon}({weapons[weapon].Dmg}, {weapons[weapon].Qualities})</span>
                )
              }) : <span>None</span>
            }
            </div>  
          </div>
          <div className='ShipDefenses'>
            <span className='Fitting'>Defenses:</span>
            <div className='FittingValWrapper'>
              {currentDefenses ? currentDefenses.map((defense) => {
                return (
                  <span>{defense}</span>
                )
              }) 
              : <span>None</span>
              }
            </div>
          </div>
          <div className='ShipFittings'>
            <span className='Fitting'>Fittings:</span>
            <div className='FittingValWrapper'>
              {currentFittings ? currentFittings.map((fitting) => {
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
