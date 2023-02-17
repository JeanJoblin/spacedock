import { createSlice } from '@reduxjs/toolkit';
import { hulls, weapons, fittings, defenses } from '../../app/resources/tables';

const initialState = {
  ships: [],
}

export const hangerSlice = createSlice({
  name: 'hanger',
  initialState,
  reducers: {

  }
});

export default hangerSlice.reducer;
export const selectShips = (state) => state.hanger.ships;
