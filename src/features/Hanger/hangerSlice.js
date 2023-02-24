import { createSlice } from '@reduxjs/toolkit';
import { genCrewAmount, getHullObj } from '../../app/resources/genFunctions';
import { hulls, weapons, fittings, defenses } from '../../app/resources/tables';

const initialState = {
  ships: [],
}

export const hangerSlice = createSlice({
  name: 'hanger',
  initialState,
  reducers: {
    addShip: (state, action) => {
      let crewParam;
      if(!action.payload.crewParam) {
        crewParam = 'fullRange';
      } else {
        crewParam = action.payload.crewParam;
      };
      let hull = getHullObj(action.payload.hull);
      let crew = genCrewAmount(hull, crewParam);
      let ship = {};
      ship.crew = crew;
      ship.maint = action.payload.sixMonth;
      ship.cost = action.payload.totalCost;
      ship.pay = crew * 120 * 365;
      ship.fittings = action.payload.fittings;
      ship.freeMass = action.payload.freeMass;
      ship.freePower = action.payload.freePower;
      ship.hull = hull;
      state.ships = [...state.ships, ship];
    },
    deleteShip: (state, action) => {
      state.ships = state.ships.filter((ship, ind) => ind != action.payload);
    }
  }
});

export default hangerSlice.reducer;
export const { addShip, deleteShip } = hangerSlice.actions;
export const selectShips = (state) => state.hanger.ships;
