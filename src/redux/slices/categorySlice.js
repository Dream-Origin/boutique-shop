import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'selectedCategory',
  initialState: null, // no category selected initially
  reducers: {
    setCategory(state, action) {
      return action.payload; // store selected category object
    },
    clearCategory() {
      return null;
    },
  },
});

export const { setCategory, clearCategory } = categorySlice.actions;
export default categorySlice.reducer;
