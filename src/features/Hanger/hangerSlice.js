import { createSlice, current } from '@reduxjs/toolkit';
import { genCrewAmount, getHullObj } from '../../app/resources/genFunctions';

const initialState = {
  ships: [],
  idCounter: 0,
}

export const hangerSlice = createSlice({
  name: 'hanger',
  initialState,
  reducers: {
    addShip: (state, action) => {
      state.idCounter++;
      let crewParam;
      // console.log('passed ship: ', action.payload)
      let drive = false;
      let passedFittings = action.payload.fittings;
      // console.log(passedFittings);
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
      // console.log('crew generator returned: ', crew);
      let ship = {};
      ship.name = action.payload.name;
      ship.cost = action.payload.totalCost;
      ship.maint = 0.05 * action.payload.totalCost;
      ship.crew = crew;
      ship.pay = crew * 120 * 365;
      if(!hull.name.includes('Station')) {
        if(typeof(action.payload.fittings[0]) === 'string') {
          action.payload.fittings.forEach((fitting) => {
            if(fitting.includes('SpikeDrive')){
              drive = true;
            }
          });
          if(drive === true) {
            ship.fittings = passedFittings;
          } else {
            ship.fittings = ['SpikeDrive1', ...passedFittings];
          }
        } else {
          ship.fittings = action.payload.fittings;
        };
      }
      ship.freeMass = action.payload.freeMass;
      ship.freePower = action.payload.freePower;
      ship.hull = hull;
      //let this be passed in to configure auto mass to cargo
      ship.cargoSetting = true;
      ship.editable = false;
      ship.id = state.idCounter;
      // console.log('ship: ', ship);
      if(action.payload.role) {
        ship.role = action.payload.role;
      }
      state.ships = [...state.ships, ship];
    },
    deleteShip: (state, { payload }) => {
      const num = +payload;
      state.ships = state.ships.filter((ship) => ship.id !== num);
    },
  }
});

export default hangerSlice.reducer;
export const { addShip, deleteShip, toggleEdit } = hangerSlice.actions;
export const selectShips = (state) => state.hanger.ships;
