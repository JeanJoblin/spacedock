import { createSlice } from "@reduxjs/toolkit";
import { getFittingObj } from "../Ships/shipSlice";

const initialState = {
  installed: [],
  maintCost: 0,
  sixMonth: 0,
  massReq: 0,
  powerReq: 0,
};

export const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {
    intakeArray: (state, action) => {
      console.log(action.payload);
      console.log('In Shopping List:', action.payload)
      action.payload.forEach((item) => {
        state.installed = [ ...state.installed, item];
      });
    },
    addSingleItem: (state, action) => {
      console.log('In Shopping List:', action.payload)
      const item = getFittingObj(action.payload);
      if(state.installed.includes(item)) {
        const ind  = state.installed.indexOf(item);
        state.installed[ind] = [ state.installed[ind], 'count'];
      } else (
        state.installed = [ ...state.installed, item ]
      );
    },
    removeItem: (state, action) => {
      const ind = state.installed.indexOf(action.payload);
      state.installed = state.installed.slice(ind, 1);
    }
  }
});

export default shoppingListSlice.reducer;

export const { intakeArray, addSingleItem, removeItem } = shoppingListSlice.actions;


export const selectMaintCost = (state) => state.shoppingList.maintCost;
export const selectSixMonth = (state) => state.shoppingList.sixMonth;
export const selectPowerReq = (state) => state.shoppingList.powerReq;
export const selectMassReq = (state) => state.shoppingList.massReq;
export const selectInstalled =(state) => state.shoppingList.installed;
