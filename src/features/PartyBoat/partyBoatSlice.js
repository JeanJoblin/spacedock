import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: null,
  speed: 3,
  armour: 2,
  hp: 20,
  crew: {
    min: 1,
    max: 6,
    current: 0,
  },
  ac: 14,
  power: 10,
  mass: 15,
  hardpoints: 2,
  class: 'Frigate'
};

export const partyBoatSlice = createSlice({
  name: 'partyBoat',
  initialState,
  reducers: {
  }
})