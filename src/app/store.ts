import { combineReducers, createStore } from 'redux';
import currentCharacterReducer from '../features/currentCharacter';

const rootReducer = combineReducers({
  currentCharacter: currentCharacterReducer,
});

export const store = createStore(
  rootReducer,
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;