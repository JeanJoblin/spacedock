import { createSlice } from '@reduxjs/toolkit';
import { hulls, weapons, fittings, defenses } from '../../app/resources/tables';
import { getFittingObj, getHullObj } from '../Ships/shipSlice';

const initialState = {
  selectedHull: hulls[Object.keys(hulls)[0]],
  selectedWeapons: weapons[Object.keys(weapons)[0]],
  selectedFittings: fittings[Object.keys(fittings)[0]],
  selectedDefenses: defenses[Object.keys(defenses)[0]],
};

export const dryDockSlice = createSlice({
  name: 'dryDock',
  initialState,
  reducers: {
    changeHull: (state, action) => {
      state.selectedHull = getHullObj(action.payload);
    },
    changeSelectedItem: (state, action) => {
      
    }
  }
});

export const { changeHull, } = dryDockSlice.actions;
export default dryDockSlice.reducer