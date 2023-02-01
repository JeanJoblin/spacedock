import { createSlice } from '@reduxjs/toolkit';

const hulls = require('../../app/resources/hulls.json');
const fittings = require('../../app/resources/fittings.json');
const defenses = require('../../app/resources/defenses.json');
const weapons = require('../../app/resources/weapons.json');
const costMulitpliers = [1, 10, 25, 100];
const massMulitpliers = [1, 2, 3, 4];
const getFittingType = (fitting) => {
  if(Object.keys(defenses).includes(fitting)) {
    return defenses;
  };
  if(Object.keys(weapons).includes(fitting)) {
    return weapons;
  };
  if(Object.keys(fittings).includes(fitting)) {
    return fittings;
  }
};

const correctCostForClass = (fitting) => {
  const type = getFittingType(fitting);
  const curFitting = type[fitting];
  let mass = curFitting.Mass;
  let power = curFitting.Power;
  let cost = curFitting.Cost;
  if(cost != 'Special') {
    cost = curFitting.Cost.match(/(^\d*)/);
  }
  let massMult = curFitting.Mass.includes('#');
  let powMult = curFitting.Power.includes('#');
  let costMult = curFitting.Cost.includes('*');
  let multSel;
  switch(state.Class) {
    case 'Fighter':
      multSel = 0;
      break;
    case 'Frigate':
      multSel = 1;
      break;
    case 'Cruiser':
      multSel = 2;
      break;
    case 'Capital':
      multSel = 3;
      break;
  }
  if(massMult) {
    mass = curFitting.Mass.replace('#', '') * massMulitpliers[multSel];
  };
  if(powMult) {
    power = curFitting.Power.replace('#', '') * massMulitpliers[multSel];
  };
  if(costMult) {
    let flag = curFitting.Cost.replace('*', '');
    flag = flag.replaceAll(/\d/, '');
    if(flag === k) {
      cost = cost * 1000;
    }
    if(flag === m) {
      cost = cost * 1000000;
    }
    cost = cost * costMulitpliers[multSel];
  };
  return [mass, power, cost];
}

console.log(correctCostForClass('ReaperBattery'));

const initialState = {
  Class: 'Frigate',
  HP: 20,
  Power: 10,
  freePower: 10,
  AC: 14,  
  curAc: 14,
  Mass: 15,
  freeMass: 15,
  Armor: 2,
  curArmor: 2,
  Crew: '1/6',
  curCrew: 1,
  Speed: 3,
  curSpeed: 3,
  CP: 4,
  curCP: 4,
  Skill: 1,
  Weapons: null,
  Defenses: null,
  Fittings: ['SpikeDrive-1'],
  isInvalid: false,
  Cost: 500000,
};

export const shipBuilderSlice = createSlice({
  name: 'shipBuilder',
  initialState,
  reducers: {
    addFitting: (state, fitting) => {
      let massCost;
      let powerCost;
      let cost;
      let digit;
      if(fittings[fitting].Mass.includes('#')) {
        switch(state.Class) {
          case 'Fighter':
            digit = +fittings[fitting].Mass.replace("#", '');
            digit = digit * massMulitpliers[0];
            state.freeMass -= digit;
            break;
          case 'Frigate':
            digit = +fittings[fitting].Mass.replace("#", '');
            digit = digit * massMulitpliers[1];
            state.freeMass -= digit;
            break;
          case 'Cruiser':
            digit = +fittings[fitting].Mass.replace("#", '');
            digit = digit * massMulitpliers[2];
            state.freeMass -= digit;
            break;
          case 'Capital':
            digit = +fittings[fitting].Mass.replace("#", '');
            digit = digit * massMulitpliers[3];
            state.freeMass -= digit;
            break;
        }
      }
      if(fittings[fitting].Mass.includes('#')) {
        switch(state.Class) {
          case 'Fighter':
            digit = +fittings[fitting].Mass.replace("#", '');
            digit = digit * massMulitpliers[0];
            state.freeMass -= digit;
            break;
          case 'Frigate':
            digit = +fittings[fitting].Mass.replace("#", '');
            digit = digit * massMulitpliers[1];
            state.freeMass -= digit;
            break;
          case 'Cruiser':
            digit = +fittings[fitting].Mass.replace("#", '');
            digit = digit * massMulitpliers[2];
            state.freeMass -= digit;
            break;
          case 'Capital':
            digit = +fittings[fitting].Mass.replace("#", '');
            digit = digit * massMulitpliers[3];
            state.freeMass -= digit;
            break;
        }
      }
      state.Fittings += fitting;
      if(state.freeMass > state.Power || state.freePower > state.Power) {
        state.isInvalid = true;
      }
    },
    addWeapon: (state, weapon) => {
      state.freeMass -= weapons[weapon].Mass;
      state.freePower -= weapons[weapon].Power
      state.Weapons += weapon;
      if(state.freeMass > state.Power || state.freePower > state.Power) {
        state.isInvalid = true;
      }
    },
    addDefense: (state, defense) => {
      state.freeMass -= defenses[defense].Mass;
      state.freePower -= defenses[defense].Power
      state.Defenses += defense;
      if(state.freeMass > state.Power || state.freePower > state.Power) {
        state.isInvalid = true;
      }
    },
  }
})



