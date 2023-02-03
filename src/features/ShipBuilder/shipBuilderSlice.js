import { createSlice, current } from '@reduxjs/toolkit';

const hulls = require('../../app/resources/hulls.json');
const fittings = require('../../app/resources/fittings.json');
const defenses = require('../../app/resources/defenses.json');
const weapons = require('../../app/resources/weapons.json');

const costMulitpliers = [1, 10, 25, 100];
const massMulitpliers = [1, 2, 3, 4];

export const getFittingList = (fitting) => {
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
  hulls: require('../../app/resources/hulls.json'),
  weapons: require('../../app/resources/weapons.json'),
  defenses: require('../../app/resources/defenses.json'),
  fittings: require('../../app/resources/fittings.json'),
  equippedFittings: ['SpikeDrive1'],
  isInvalid: false,
  cost: 500000,
};

const correctCostsForClass = (fitting) => {
  console.log(fitting)
  const type = getFittingList(fitting);
  console.log(type);
  const curFitting = type[fitting];
  let mass = curFitting.mass;
  let power = curFitting.power;
  let cost = curFitting.cost;
  if(cost !== 'Special') {
    cost = curFitting.cost.match(/^\d*/)[0];
    console.log(cost);
  }
  let massMult = curFitting.mass.includes('#');
  let powMult = curFitting.power.includes('#');
  let costMult = curFitting.cost.includes('*');
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
    default:
      multSel = 0;
      break;
  }
  if(massMult) {
    mass = curFitting.mass.replace('#', '') * massMulitpliers[multSel];
  };
  if(powMult) {
    power = curFitting.power.replace('#', '') * massMulitpliers[multSel];
  };
  if(costMult) {
    let flag = curFitting.cost.replace('*', '');
    flag = flag.replaceAll(/\d/g, '');
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
    addFitting: (state, action) => {
      const fitting = action.payload;
      let fittingObj;
      if(typeof fitting === 'string') {
        fittingObj = getFittingList(fitting)[fitting];
      } else {
        fittingObj = fitting;
      }
      const type = 'equipped' + fittingObj.type + 's';
      state.equippedFittings = [...state.equippedFittings, fitting];
    },
  } 
});

export const {addFitting, addFittingArr} = shipBuilderSlice.actions;
export const selectFittings = (state) => state.shipBuilder.fittings;
export const selectWeapons = (state) => state.shipBuilder.weapons;
export const selectDefenses = (state) => state.shipBuilder.defenses;
export const selectHulls = (state) => state.shipBuilder.hulls;
export const selectEquippedFittings = (state) => state.shipBuilder.equippedFittings;
export default shipBuilderSlice.reducer;


