import { configureStore } from '@reduxjs/toolkit';
import currentCharacterReducer from '../features/currentCharacter';

export const store = configureStore({
  reducer: {
    currentCharacter: currentCharacterReducer,
  }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;