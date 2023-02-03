import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice.js';
import shipBuilderReducer from '../features/ShipBuilder/shipBuilderSlice';

export const store = configureStore({
  reducer: {
    shipBuilder: shipBuilderReducer,
  },
});
