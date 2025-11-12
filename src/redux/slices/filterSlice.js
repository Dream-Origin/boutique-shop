// src/slices/filterSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchQuery: '',
  category: 'all',
  availability: null, // 'inStock' | 'outOfStock' | null
  fabrics: [],
  colors: [],
  priceRange: { from: 0, to: Infinity },
  budget: null,
  premium: null,
  exclusive: null,
  handpicked: null,
  bestSeller: null,
  unique: null,
  newArrival: null,
  sortOrder: 'default' // values like 'default', 'price-low', 'price-high', 'name-az', etc.
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload
    },
    setCategory(state, action) {
      state.category = action.payload
    },
    setAvailability(state, action) {
      state.availability = action.payload
    },
    setFabrics(state, action) {
      state.fabrics = action.payload
    },
    setColors(state, action) {
      state.colors = action.payload
    },
    setPriceRange(state, action) {
      state.priceRange = action.payload
    },
    toggleBooleanFilter(state, action) {
      const key = action.payload
      state[key] = state[key] === true ? null : true
    },
    setSortOrder(state, action) {
      state.sortOrder = action.payload
    },
    clearAllFilters(state) {
      state.searchQuery = ''
      state.category = 'all'
      state.availability = null
      state.fabrics = []
      state.colors = []
      state.priceRange = { from: 0, to: Infinity }
      state.budget = null
      state.premium = null
      state.exclusive = null
      state.handpicked = null
      state.bestSeller = null
      state.unique = null
      state.newArrival = null
      state.sortOrder = 'default'
    }
  }
})

export const {
  setSearchQuery,
  setCategory,
  setAvailability,
  setFabrics,
  setColors,
  setPriceRange,
  toggleBooleanFilter,
  setSortOrder,
  clearAllFilters
} = filterSlice.actions

export default filterSlice.reducer
