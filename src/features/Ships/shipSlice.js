import { createSlice, current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { selectHulls, selectDefenses, selectFittings, selectWeapons } from "../ShipBuilder/shipBuilderSlice";

const hulls = require('../../app/resources/hulls.json');
const fittings = require('../../app/resources/fittings.json');
const defenses = require('../../app/resources/defenses.json');
const weapons = require('../../app/resources/weapons.json');

export const getHullObj = (inputHullStr) => {
  return hulls[inputHullStr];
}

export const genCrewAmount = (inputHull) => {
  //This function grabs the min and max crew from a given hull and generate a number in between. Us it for generating amount of crew for a ship. Add extra functionality later for running with a lean, medium, or higher crew amount.
  const min = inputHull.crew.match(/^\d*/)[0];
  const max = inputHull.crew.match(/\/(\d*)/)[1];
  const dif = max - min;
  const crew = Math.floor(Math.random() * dif);
  return crew;
};

const correctCostsForClass = (fitting, hull = 'Frigate') => {
  const costMulitpliers = [1, 10, 25, 100];
  const massMulitpliers = [1, 2, 3, 4];
  const curFitting = getFittingObj(fitting);
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
  switch(hull) {
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

export const getFittingObj = (input) => {
  if(Object.keys(defenses).includes(input)) {
    return defenses[input];
  };
  if(Object.keys(weapons).includes(input)) {
    return weapons[input];
  };
  if(Object.keys(fittings).includes(input)) {
    return fittings[input];
  }
};

const initialState = {
  equippedFittings: ['SpikeDrive1'],
  isInvalid: false,
  currentHull: hulls.FreeMerchant,
  freePower: hulls.FreeMerchant.power,
  freeMass: hulls.FreeMerchant.mass,
  currentCrew: genCrewAmount(hulls.FreeMerchant),
  totalCost: hulls.FreeMerchant.cost,
  sixMonthMainenance: hulls.FreeMerchant.cost * 0.05,
}
export const shipSlice = createSlice({
  name: 'ship',
  initialState,
  reducers: {
    rehull: (state, action) => {
      console.log('action.payload:', action.payload)
      const newHull = getHullObj(action.payload);
      console.log(newHull);
      state.currentHull = newHull;
      state.freePower = newHull.power;
      state.freeMass = newHull.mass;
      state.currentCrew = genCrewAmount(newHull);
    },
    installFitting: (state, action) => {
      const fitting = action.payload;
      if(fitting.includes('SpikeDrive')) {
        let oldDrive = state.equippedFittings.match(/SpikeDrive\d/);
        oldDrive = getFittingObj(oldDrive);
        let { mass, power } = correctCostsForClass(oldDrive, state.currentHull);
        state.freePower = state.freePower + power;
        state.freeMass = state.freeMass + mass;
      }
      let { mass, power, cost } = correctCostsForClass(fitting, state.currentHull);
      state.freePower = state.freePower - power;
      state.freeMass = state.freeMass - mass;
      state.totalCost += cost;
      state.sixMonthMainenance += cost * 0.05;
    }
  }
});

export const selectHull = (state) => state.ship.currentHull;
export const selectTotalCost = (state) => state.ship.totalCost;
export const selectSixMonth = (state) => state.ship.sixMonthMainenance;

export const { rehull, installFitting } = shipSlice.actions;

export default shipSlice.reducer;