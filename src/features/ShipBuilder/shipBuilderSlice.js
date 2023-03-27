import { createSlice, current } from '@reduxjs/toolkit';

import { hulls, weapons, fittings, defenses } from '../../app/resources/tables';
import { getFittingObj, getHullObj } from '../../app/resources/genFunctions.js';

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
  params: {
    role: null,
    hull: null,
    crew: null,
    drive: null,
  }
};


export const shipBuilderSlice = createSlice({
  name: 'shipBuilder',
  initialState,
  reducers: {
    changeParam: (state, action) => {
      console.log('Change Param payload', action.payload);
      state.params[action.payload.target] = action.payload.value;
    }
  } 
});

export const { changeParam, } = shipBuilderSlice.actions;
export default shipBuilderSlice.reducer;


