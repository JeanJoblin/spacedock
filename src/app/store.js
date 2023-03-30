import { configureStore } from '@reduxjs/toolkit';
import shipBuilderReducer from '../features/ShipBuilder/shipBuilderSlice';
import shipReducer from '../features/Ships/shipSlice';
import dryDockReducer from '../features/DryDockConfig/dryDockSlice';
import hangerReducer from '../features/Hanger/hangerSlice';

export const store = configureStore({
  reducer: {
    shipBuilder: shipBuilderReducer,
    ship: shipReducer,
    dryDock: dryDockReducer,
    hanger: hangerReducer,
  },
});
