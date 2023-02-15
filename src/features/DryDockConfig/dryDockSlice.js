import { createSlice, current } from '@reduxjs/toolkit';
import { hulls, weapons, fittings, defenses } from '../../app/resources/tables';
import { getFittingObj, getHullObj, correctCostsForClass } from '../Ships/shipSlice';
import { getFittingList, } from '../ShipBuilder/shipBuilderSlice';

//This slice is to handle selecting and adding fittings, weapons and defenses to a ship. It may be the slice that deals with generating new ships, but that might got to a spaceport slice or smth.
const fighterMountable = ['Fighter'];
const frigateMountable = ['Fighter', 'Frigate'];
const cruiserMountable = ['Fighter', 'Frigate', 'Cruiser'];
const capitalMountable = ['Fighter', 'Frigate', 'Cruiser', 'Capital'];

const capitalWeapons = Object.keys(weapons).map(weapon => capitalMountable.includes(weapons[weapon].class));
const cruiserWeapons = Object.keys(weapons).map(weapon => cruiserMountable.includes(weapons[weapon].class));
const frigateWeapons = Object.keys(weapons).map(weapon => frigateMountable.includes(weapons[weapon].class));
const fighterWeapons = Object.keys(weapons).map(weapon => fighterMountable.includes(weapons[weapon].class));

const capitalDefenses = Object.keys(defenses).map(defense => capitalMountable.includes(defenses[defense].class));
const cruiserDefenses = Object.keys(defenses).map(defense => cruiserMountable.includes(defenses[defense].class));
const frigateDefenses = Object.keys(defenses).map(defense => frigateMountable.includes(defenses[defense].class));
const fighterDefenses = Object.keys(defenses).map(defense => fighterMountable.includes(defenses[defense].class));

const capitalFittings = Object.keys(fittings).map((fitting, ind) => capitalMountable.includes(fittings[fitting].class) && ind !== 4 && ind !== 2);
const cruiserFittings = Object.keys(fittings).map((fitting, ind) => cruiserMountable.includes(fittings[fitting].class) && ind !== 4 && ind !== 2);
const frigateFittings = Object.keys(fittings).map(fitting => frigateMountable.includes(fittings[fitting].class));
const fighterFittings = Object.keys(fittings).map(fitting => fighterMountable.includes(fittings[fitting].class));

const initialState = {
  selected: {
    hull: Object.keys(hulls)[0],
    weapon: Object.keys(weapons)[0],
    fitting: Object.keys(fittings)[0],
    defense: Object.keys(defenses)[0],
  },
  mountable: {
    weapon: fighterWeapons,
    defense: fighterDefenses,
    fitting: fighterFittings,
  },
  shoppingList: [],
  totalCost: 0,
  massReq: 0,
  powerReq: 0,
  hardReq: 0,
  available: {
    mass: 2,
    power: 5,
    hard: 1,
  }
};

export const dryDockSlice = createSlice({
  name: 'dryDock',
  initialState,
  reducers: {
    changeHull: (state, action) => {
      state.selected.hull = action.payload;
      const hullObj = getHullObj(action.payload);
      console.log('hull to change to: ', action.payload);
      console.log('hull class', getHullObj(action.payload).class);
      switch(hullObj.class) {
        case 'Frigate':
          state.mountable.weapon = frigateWeapons;
          state.mountable.defense = frigateDefenses;
          state.mountable.fitting = frigateFittings;
          break;
        case 'Cruiser':
          state.mountable.weapon = cruiserWeapons;
          state.mountable.defense = cruiserDefenses;
          state.mountable.fitting = cruiserFittings;
          break;
        case 'Capital':
          state.mountable.weapon = capitalWeapons;
          state.mountable.defense = capitalDefenses;
          state.mountable.fitting = capitalFittings;
          break;
        default:
          state.mountable.weapon = fighterWeapons;
          state.mountable.defense = fighterDefenses;
          state.mountable.fitting = fighterFittings;
          break;
      }
      state.totalCost = 0;
      state.massReq = 0;
      state.powerReq = 0;
      state.shoppingList.forEach((item) => {
        const {mass, power, cost} = correctCostsForClass(item, action.payload);
        state.totalCost += cost;
        state.massReq += mass;
        state.powerReq += power;
      });
      state.available.power = hullObj.power - state.powerReq;
      state.available.mass = hullObj.mass - state.massReq;
      state.available.hard = hullObj.hardpoints - state.hardReq;
    },
    changeSelectedItem: (state, action) => {
      const item = getFittingObj(action.payload);
      console.log(item);
      state.selected[item.type] = action.payload;
    },
    addSelectedToShoppingList: (state, action) => {
      console.log(action.payload)
      const item = state.selected[action.payload];
      console.log('item to add: ', item);
      state.shoppingList = [...state.shoppingList, item];
      console.log(state.selected.hull)
      const {mass, power, cost} = correctCostsForClass(item, state.selected.hull);
      console.log(mass, power, cost);
      state.massReq = state.massReq + mass;
      state.powerReq += power;
      state.totalCost += cost;
      state.available.power -= power;
      state.available.mass -= mass;
      const itemObj = getFittingObj(item);
      console.log('hardpoints', itemObj.hardpoints);
      if(itemObj.hardpoints) {
        console.log(typeof(itemObj.hardpoints));
        const hardNum = + itemObj.hardpoints;
        console.log('state has: ', state.available.hard, 'item has: ', hardNum);
        state.hardReq += hardNum;
        state.available.hard -= hardNum;
      }
    },
    removeFromShoppingList: (state, action) => {
      const snippy = + action.payload;
      const removedItem = state.shoppingList[snippy];
      console.log(snippy);
      console.log(removedItem);
      state.shoppingList = state.shoppingList.filter((item, ind) => ind !== snippy);
      const {mass, power, cost} = correctCostsForClass(removedItem, state.selected.hull);
      state.massReq -= mass;
      state.powerReq -= power;
      state.totalCost -= cost;
      state.available.power += power;
      state.available.mass += mass;
      const hardNum = +getFittingObj(removedItem).hardpoints;
      if(hardNum) {
        state.available.hard += hardNum;
        state.hardReq -= hardNum;
      }
    }
  }
});

export const { changeHull, changeSelectedItem, addSelectedToShoppingList, removeFromShoppingList} = dryDockSlice.actions;
export const selectShoppingList = (state) => state.dryDock.shoppingList;
export const selectHull = (state) => state.dryDock.selected.hull;
export const selectMassReq = (state) => state.dryDock.massReq;
export const selectPowerReq = (state) => state.dryDock.powerReq;
export const selectTotalCost = (state) => state.dryDock.totalCost;
export const selectHardReq = (state) => state.dryDock.hardReq;
export const selectAvPower = (state) => state.dryDock.available.power;
export const selectAvMass = (state) => state.dryDock.available.mass;
export const selectAvHard = (state) => state.dryDock.available.hard;
export const selectMountableWeapons = (state) => state.dryDock.mountable.weapon;
export const selectMountableDefenses = (state) => state.dryDock.mountable.defense;
export const selectMountableFittings = (state) => state.dryDock.mountable.fitting;
export default dryDockSlice.reducer;
