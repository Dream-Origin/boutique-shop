// src/slices/productsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { updated_products } from '../../data/updated_products';



const productsSlice = createSlice({
  name: 'products',
  initialState: updated_products,
  reducers: {
    // Add product related reducers if needed
  },
});

export default productsSlice.reducer;
