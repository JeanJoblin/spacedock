import React from "react";
import { useSelector } from "react-redux";
import { selectHulls } from "../ShipBuilder/shipBuilderSlice";
import "./ship.css";
import tables from '../../app/resources/tables'


export function ShipCard() {
 const { hull, fittings, weapons, defenses } = tables;
 const extras = {};
 function populateBonuses() {
  equippedFittings.forEach((item) => {
    switch(item.type) {
      case 'weapon':
        return;
      case 'fitting':
        if(item.name === 'Extended Life Support') {
          //double max crew
        }
        return;
      case 'defense':
        
        }
    });
  }

 return (
  <div className='Ship'>
  <div className='ShipTitle'>
    <span className='Name'>SHIPNAME</span>
    <span className='Hull'>{currentHull.name}</span>
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
              <span key={key + 'Value'} className='StatValue'>{currentHull[stats[1][ind]]}</span>
          </div>
      )})}
    </div>
    <div className='ShipParts'>
      <div className='ShipWeapons'>
        <span className='Fitting'>Weapons:</span>
        <div className='FittingValWrapper'>
          {currentWeapons.length > 0 ? currentWeapons.map((weapon, ind) => {
            return (
              <span key={weapon.name}> {weapon.name}({weapon.dmg}, {weapon.qualities}){ind + 1  !== currentWeapons.length ? ', ' : null }</span>
            )
          }) : <span>None</span>
        }
        </div>  
      </div>
      <div className='ShipDefenses'>
        <span className='Fitting'>Defenses: </span>
        <div className='FittingValWrapper'>
          {currentDefenses.length > 0 ? currentDefenses.map((defense, ind) => {
            return (
              <span key={defense.name}>{defense.name}{ind + 1  !== currentDefenses.length ? ', ' : null }</span>
            )
          }) 
          : <span>None</span>
          }
        </div>
      </div>
      <div className='ShipFittings'>
        <span className='Fitting'>Fittings: </span>
        <div className='FittingValWrapper'>
          {currentFittings.length > 0 ? currentFittings.map((fitting, ind) => {
            return (
              <span key={fitting.name}>{fitting.name}{ind + 1  !== currentFittings.length ? ', ' : null }
              </span>
            )
          })
        : <span>None</span>
        }
        </div>
      </div>
    </div>
  </div>
</div>
 )
}
