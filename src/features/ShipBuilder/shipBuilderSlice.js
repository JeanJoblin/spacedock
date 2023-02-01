import { createSlice } from '@reduxjs/toolkit';

const hulls = require('../../app/resources/hulls.json');
const fittings = require('../../app/resources/fittings.json');
const defenses = require('../../app/resources/defenses.json');
const weapons = require('../../app/resources/weapons.json');

const costMulitpliers = [1, 10, 25, 100];
const massMulitpliers = [1, 2, 3, 4];

export const getFittingType = (fitting) => {
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

const correctCostForClass = (fitting) => {
  const type = getFittingType(fitting);
  const curFitting = type[fitting];
  let mass = curFitting.Mass;
  let power = curFitting.Power;
  let cost = curFitting.Cost;
  if(cost != 'Special') {
    cost = curFitting.Cost.match(/^\d*/);
    console.log(cost);
  }
  let massMult = curFitting.Mass.includes('#');
  let powMult = curFitting.Power.includes('#');
  let costMult = curFitting.Cost.includes('*');
  let multSel;
  switch(initialState.Class) {
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
    if(flag === 'k') {
      cost = cost * 1000;
    }
    if(flag === 'm') {
      cost = cost * 1000000;
    }
    cost = cost * costMulitpliers[multSel];
  };
  console.log(cost)
  return [mass, power, cost];
};



export const shipBuilderSlice = createSlice({
  name: 'shipBuilder',
  initialState,
  reducers: {
    addFitting: (state, fitting) => {
      const {fittingMass, fittingPower, fittingCost} = correctCostForClass(fitting);
      state.freeMass -= fittingMass;
      state.freePower -= fittingPower;
      state.Cost += fittingCost;
      if(state.freeMass > state.Mass || state.freePower > state.Power) {
        state.isInvalid = true;
      }
    },
  } 
});

export const {addFitting} = shipBuilderSlice.actions;
export const selectFittings = (state) => state.shipBuilder.Fittings;
export default shipBuilderSlice.reducer;


