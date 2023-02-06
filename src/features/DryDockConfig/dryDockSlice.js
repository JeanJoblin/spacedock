import { createSlice } from '@reduxjs/toolkit';
import { hulls, weapons, fittings, defenses } from '../../app/resources/tables';
import { getFittingObj, getHullObj } from '../Ships/shipSlice';
import { getFittingList, } from '../ShipBuilder/shipBuilderSlice';

const initialState = {
  selected: {
    hull: hulls[Object.keys(hulls)[0]],
    weapon: weapons[Object.keys(weapons)[0]],
    fitting: fittings[Object.keys(fittings)[0]],
    defense: defenses[Object.keys(defenses)[0]],
  },
  shoppingList: [],
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
      console.log(action.payload)
      state.shoppingList = [...state.shoppingList, state.selected[action.payload]];
    }
  }
});

export const { changeHull, changeSelectedItem, addSelectedToShoppingList} = dryDockSlice.actions;
export const selectShoppingList = (state) => state.dryDock.shoppingList;
export default dryDockSlice.reducer