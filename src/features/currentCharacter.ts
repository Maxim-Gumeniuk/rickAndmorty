import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const currentIdSlice = createSlice({
  name: 'currentId',
  initialState: 0,
  reducers: {
    setCharacter: (value, action: PayloadAction<number>) => value + action.payload,
    clear: () => 0,
  },
});

export default currentIdSlice.reducer;
export const { actions } = currentIdSlice;