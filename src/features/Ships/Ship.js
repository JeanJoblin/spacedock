import React, { useState } from 'react';
import './ship.css';
import { getFittingList } from '../ShipBuilder/shipBuilderSlice';
import { useSelector } from 'react-redux';
import { selectDefenses, selectWeapons, selectFittings, selectHulls, selectEquippedFittings } from '../ShipBuilder/shipBuilderSlice';
import { genCrewAmount, selectHull } from './shipSlice';

const stats = [['HP', 'Power', 'AC', 'Mass', 'Armor', 'Crew', 'Speed', 'NPC CP', 'Hull Class', 'Crew Skill',], ['HP', 'power', 'AC', 'mass', 'armor', 'crew', 'speed', 'CP', 'class', 'skill']];

export function Ship(props) {
  const hulls = useSelector(selectHulls);
  const fittings = useSelector(selectFittings);
  const weapons = useSelector(selectWeapons)
  const defenses = useSelector(selectDefenses);
  const currentHull = useSelector(selectHull);
  console.log('currentHull: ', currentHull);
  const { allFittings } = props;
  let currentDefenses = [];
  let currentWeapons = [];
  let currentFittings = [];
  allFittings.forEach((input) => {
    const fitting = getFittingList(input)[input];
    const type = fitting.type + 's';
    if(type === 'defenses') {
      currentDefenses.push(fitting);
    } else if( type === 'weapons') {
      currentWeapons.push(fitting);
    } else if( type === 'fittings') {
      currentFittings.push(fitting);
    } else {
      throw(Error)
    }
  });

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
                  <span key={fitting.name}>{fitting.name}{ind + 1  !== currentFittings.length ? ', ' : null }</span>
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
