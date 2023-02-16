import { createSlice, current } from '@reduxjs/toolkit';

import { hulls, weapons, fittings, defenses } from '../../app/resources/tables';
import { getFittingObj, getHullObj } from '../../app/resources/genFunctions';

const costMulitpliers = [1, 10, 25, 100];
const massMulitpliers = [1, 2, 3, 4];

//I don't think I need this function anymore, just use .type key
// export const getFittingList = (imp) => {
//   let fitting = imp;
//   if (typeof(imp) === 'string') {
//     fitting = getFittingObj(imp);
//   }
//   if(Object.keys(defenses).includes(fitting)) {
//     return defenses;
//   };
//   if(Object.keys(weapons).includes(fitting)) {
//     return weapons;
//   };
//   if(Object.keys(fittings).includes(fitting)) {
//     return fittings;
//   }
// };

const initialState = {
  hull: hulls.FreeMerchant,
  equippedFittings: ['SpikeDrive1'],
  isInvalid: false,
};


export const shipBuilderSlice = createSlice({
  name: 'shipBuilder',
  initialState,
  reducers: {
    addFitting: (state, action) => {
      const fitting = action.payload;
      let fittingObj;
      if(typeof fitting === 'string') {
        fittingObj = getFittingObj(fitting);
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


