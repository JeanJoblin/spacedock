import { createSlice } from '@reduxjs/toolkit';
import { shipRoles } from '../../app/resources/shipRoles';
import { hulls, drives } from '../../app/resources/tables';

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
    role: shipRoles.pirate,
    hull: hulls.StrikeFighter,
    crew: 'Full Range',
    drive: drives[1],
  },
  required: {
    role: false,
    hull: false,
    crew: false,
    drive: false,
  }
};


export const shipBuilderSlice = createSlice({
  name: 'shipBuilder',
  initialState,
  reducers: {
    changeParam: (state, action) => {
      console.log(`Changing param ${action.payload.target} to ${action.payload.value}`);
      state.params[action.payload.target] = action.payload.value;
    },
    toggleRequired: (state, action) => {
      if(state.required[action.payload] === false){
        state.required[action.payload] = true;
      } else {
        state.required[action.payload] = false;
      }
    },
  } 
});

export const { changeParam, toggleRequired} = shipBuilderSlice.actions;
export const selectReqs = (state) => state.shipBuilder.required;
export const selectParams = (state) => state.shipBuilder.params;
export default shipBuilderSlice.reducer;


