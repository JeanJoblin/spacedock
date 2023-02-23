import React, { useState } from 'react';
import './ship.css';
import { useSelector } from 'react-redux';
import {  selectHull } from './shipSlice';
import { hulls } from '../../app/resources/tables';
import { getFittingObj, genCrewAmount } from '../../app/resources/genFunctions.js';

const stats = [['HP', 'Power', 'AC', 'Mass', 'Armor', 'Crew', 'Speed', 'NPC CP', 'Hull Class', 'Crew Skill',], ['HP', 'power', 'AC', 'mass', 'armor', 'crew', 'speed', 'CP', 'class', 'skill']];

export function Ship(props) {
  // const currentHull = useSelector(selectHull);
  const { 
    allFittings, 
    hull, 
    name,
    cost,
    crew,
    maint,
    pay, 
  } = props;
  console.log(crew)
  let actualCrew = crew;
  console.log(hull);

  let currentHull = hull ? hull : hulls.FreeMerchant;
  let currentDefenses = [];
  let currentWeapons = [];
  let currentFittings = [];
  let extras = {
    HP: null,
    AC: null,
    Speed: null,
    Crew: null,
  };

  allFittings.forEach((input) => {
    const fitting = getFittingObj(input);
    const type = fitting.type + 's';
    if(type === 'defenses') {
      currentDefenses.push(fitting);
      switch(fitting.name) {
        case 'Ablative Hull Compartements':
          extras.AC += 1;
          extras.HP += 20;
          break;
        case 'Augmented Plating':
          extras.AC += 2;
          extras.Speed -= 1;
          break;
        default:
          break;
      }
    } else if( type === 'weapons') {
      currentWeapons.push(fitting);
    } else if( type === 'fittings') {
      currentFittings.push(fitting);
      if(fitting.name === 'Extended Life Support') {
        const crewBonus = currentHull.crew.match(/\/(\d+)/);
        if(extras.Crew === null) {
          extras.Crew = crewBonus[1];
        } else {
          extras.Crew += crewBonus[1];
        }
      }
    } else {
      throw(Error)
    }
  });

  const isCargoSpace = (fitting) => {
    if(fitting.name === 'Cargo Space') {
      return (
        <span key={fitting.name}></span>
      )
    }
  };

  const isCrew = (key) => {
    if(key === 'crew') {
      return `(current: ${crew})`;
    }
  }

//todo: make the max crew render differently from generated crew. Removed the + when current crew

  return (
    <div className='Ship'>
      <div className='ShipTitle'>
        <span className='Name'>{name ? name : 'SHIPNAME' }</span>
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
                  <span key={key + 'Value'} className='StatValue'>{currentHull[stats[1][ind]] }{ extras[key] ? `(${extras[key] > 0 ? '+' : ''}${extras[key]})` : null }{isCrew(stats[1][ind])}</span>
                  
              </div>
          )})}
        </div>
        <div className='ShipParts'>
          <hr/>
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
          <hr/>
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
          <hr/>
          <div className='ShipFittings'>
            <span className='Fitting'>Fittings: </span>
            <div className='FittingValWrapper'>
              {currentFittings.length > 0 ? currentFittings.map((fitting, ind) => {
                isCargoSpace(fitting);
                return (
                  <span key={fitting.name}>{fitting.name}{ind + 1  !== currentFittings.length ? ', ' : null }
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
              <span>{cost} base price, {maint} maintenace</span>
              <br/>
              <span>{pay} yearly crew cost for {crew} crew</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
