import { createSlice } from '@reduxjs/toolkit';
import { genCrewAmount, getFittingObj, getHullObj } from '../../app/resources/genFunctions';
import { hulls, weapons, fittings, defenses } from '../../app/resources/tables';

const initialState = {
  ships: [],
}

export const hangerSlice = createSlice({
  name: 'hanger',
  initialState,
  reducers: {
    addShip: (state, action) => {
      console.log('action.payload: ', action.payload);
      let crewParam;
      console.log('passed ship: ', action.payload)
      if(!action.payload.crewParam) {
        crewParam = 'fullRange';
      } else {
        crewParam = action.payload.crewParam;
      };
      let hull = action.payload.hull;
      if(typeof(hull) === 'string') {
        hull = getHullObj(action.payload.hull);
      }
      let crew = genCrewAmount(hull, crewParam);
      console.log('crew generator returned: ', crew);
      let ship = {};
      ship.name = action.payload.name;
      ship.cost = action.payload.totalCost;
      ship.maint = 0.05 * action.payload.totalCost;
      ship.crew = crew;
      ship.pay = crew * 120 * 365;
      ship.fittings = action.payload.fittings;
      ship.freeMass = action.payload.freeMass;
      ship.freePower = action.payload.freePower;
      ship.hull = hull;
      //let this be passed in to configure auto mass to cargo
      ship.cargoSetting = true;
      ship.editable = false;
      let drive = false;
      ship.fittings.forEach(fitting => {
        console.log('fitting Name: ', fitting.name)
        if(fitting.name.match(/Spike Drive/) !== null) {
          drive = true;
        }
      });
      if(drive === false) {
        ship.fittings.push('SpikeDrive1')
      }
      console.log('ship: ', ship);
      state.ships = [...state.ships, ship];
    },
    deleteShip: (state, action) => {
      state.ships = state.ships.filter((ship, ind) => ind != action.payload);
    },
    toggleEdit: (state, action) => {
      let id = action.payload;
      let target = state.ships[id];
      if(target.editable === false) {
        state.ships.forEach((ship, ind) => {
          if(ind !== target) {
            ship.editable = false;
          }
        });
        target.editable = true;
      } else {
        target.editable = false;
      }
    }
  }
});

export default hangerSlice.reducer;
export const { addShip, deleteShip, toggleEdit } = hangerSlice.actions;
export const selectShips = (state) => state.hanger.ships;
