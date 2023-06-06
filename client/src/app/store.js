import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import goingReducer from '../features/counter/goingSlice';
import notGoingReducer from '../features/counter/notGoingSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    going: goingReducer,
    notGoing: notGoingReducer
  },
});
