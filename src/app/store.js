import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice.js';
import shipBuilderReducer from '../features/ShipBuilder/shipBuilderSlice';
import shipReducer from '../features/Ships/shipSlice';
import dryDockReducer from '../features/DryDockConfig/dryDockSlice';
import shoppingListReducer from '../features/ShoppingList/shoppingListSlice';

export const store = configureStore({
  reducer: {
    shipBuilder: shipBuilderReducer,
    ship: shipReducer,
    dryDock: dryDockReducer,
    shoppingList: shoppingListReducer,
  },
});
