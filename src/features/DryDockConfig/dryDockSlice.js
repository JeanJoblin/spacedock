import { createSlice } from '@reduxjs/toolkit';
import { hulls, weapons, fittings, defenses } from '../../app/resources/tables';
import { getFittingObj, getHullObj } from '../Ships/shipSlice';
import { getFittingList, } from '../ShipBuilder/shipBuilderSlice';

//This slice is to handle selecting and adding fittings, weapons and defenses to a ship. It may be the slice that deals with generating new ships, but that might got to a spaceport slice or smth.

const initialState = {
  selected: {
    hull: hulls[Object.keys(hulls)[0]],
    weapon: weapons[Object.keys(weapons)[0]],
    fitting: fittings[Object.keys(fittings)[0]],
    defense: defenses[Object.keys(defenses)[0]],
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
      state.selected.hull = getHullObj(action.payload);
    },
    changeSelectedItem: (state, action) => {
      const item = getFittingObj(action.payload);
      state.selected[item.type] = item;
    },
    addSelectedToShoppingList: (state, action) => {
      state.shoppingList = [...state.shoppingList, state.selected[action.payload]];
    },
    removeFromShoppingList: (state, action) => {
      const item = action.payload;
      const ind = state.shoppingList.indexOf(item);
      state.shoppingList = state.shoppingList.slice(ind, 1);
    }
  }
});

export const { changeHull, changeSelectedItem, addSelectedToShoppingList} = dryDockSlice.actions;
export const selectShoppingList = (state) => state.dryDock.shoppingList;
export const selectHull = (state) => state.dryDock.selected.hull;
export default dryDockSlice.reducer