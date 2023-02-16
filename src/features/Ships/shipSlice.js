import { createSlice, current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { selectHulls, selectDefenses, selectFittings, selectWeapons } from "../ShipBuilder/shipBuilderSlice";
import { genCrewAmount, getHullObj, getFittingObj, correctCostsForClass } from "../../app/resources/genFunctions.mjs";

const hulls = require('../../app/resources/hulls.json');
const fittings = require('../../app/resources/fittings.json');
const defenses = require('../../app/resources/defenses.json');
const weapons = require('../../app/resources/weapons.json');


const initialState = {
  equippedFittings: ['SpikeDrive1'],
  isInvalid: false,
  currentHull: hulls.FreeMerchant,
  freePower: hulls.FreeMerchant.power,
  freeMass: hulls.FreeMerchant.mass,
  currentCrew: genCrewAmount(hulls.FreeMerchant),
  //Total cost should be a number rather than \d+k
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
      console.log('installing fitting: ', action.payload)
      let curHull = state.currentHull;
      const fitting = action.payload;
      if(fitting.includes('SpikeDrive')) {
        let oldDrive = state.equippedFittings.match(/SpikeDrive\d/);
        console.log('oldDrive: ', oldDrive);
        oldDrive = getFittingObj(oldDrive);
        let { mass, power } = correctCostsForClass(oldDrive, current(state.currentHull));
        state.freePower = state.freePower + power;
        state.freeMass = state.freeMass + mass;
      }
      let { mass, power, cost } = correctCostsForClass(fitting, current(state.currentHull));
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