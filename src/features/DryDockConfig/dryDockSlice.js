import { createSlice, current } from '@reduxjs/toolkit';
import { hulls, weapons, fittings, defenses } from '../../app/resources/tables';
import { getFittingObj, getHullObj, correctCostsForClass } from '../Ships/shipSlice';
import { getFittingList, } from '../ShipBuilder/shipBuilderSlice';

//This slice is to handle selecting and adding fittings, weapons and defenses to a ship. It may be the slice that deals with generating new ships, but that might got to a spaceport slice or smth.

const initialState = {
  selected: {
    hull: Object.keys(hulls)[0],
    weapon: Object.keys(weapons)[0],
    fitting: Object.keys(fittings)[0],
    defense: Object.keys(defenses)[0],
  },
  shoppingList: [],
  totalCost: 0,
  massReq: 0,
  powerReq: 0,
};

export const dryDockSlice = createSlice({
  name: 'dryDock',
  initialState,
  reducers: {
    changeHull: (state, action) => {
      state.selected.hull = action.payload;
    },
    changeSelectedItem: (state, action) => {
      const item = getFittingObj(action.payload);
      console.log(item);
      state.selected[item.type] = action.payload;
    },
    addSelectedToShoppingList: (state, action) => {
      console.log(action.payload)
      const item = state.selected[action.payload];
      console.log('item to add: ', item);
      state.shoppingList = [...state.shoppingList, item];
      console.log(state.selected.hull)
      const {mass, power, cost} = correctCostsForClass(item, state.selected.hull);
      console.log(mass, power, cost);
      state.massReq = state.massReq + mass;
      state.powerReq += power;
      state.totalCost += cost;
    },
    removeFromShoppingList: (state, action) => {
      console.log(action.payload);
      const item = action.payload;
      const ind = state.shoppingList.indexOf(item);
      state.shoppingList = state.shoppingList.slice(ind, 1);

    }
  }
});

export const { changeHull, changeSelectedItem, addSelectedToShoppingList} = dryDockSlice.actions;
export const selectShoppingList = (state) => state.dryDock.shoppingList;
export const selectHull = (state) => state.dryDock.selected.hull;
export const selectMassReq = (state) => state.dryDock.massReq;
export const selectPowerReq = (state) => state.dryDock.powerReq;
export const selectTotalCost = (state) => state.dryDock.totalCost;
export default dryDockSlice.reducer