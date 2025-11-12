import { createSelector } from '@reduxjs/toolkit';

export const selectFilteredProducts = createSelector(
  (state) => state.products,
  (state) => state.filters,
  (products, filters) => {
    return products.filter(product => {
      // Filter by availability (assuming product.stock > 0 means in stock)
      if (filters.availability === 'inStock' && product.stock <= 0) return false;
      if (filters.availability === 'outOfStock' && product.stock > 0) return false;

      // Filter by category (using subCategory)
      if (filters.category && filters.category !== 'all' && product.subCategory !== filters.category) {
        return false;
      }

      // Filter by boolean attributes if present (e.g. budget, premium)
      const booleanFilterKeys = ['budget', 'premium', 'exclusive', 'handpicked', 'bestSeller', 'unique', 'newArrival'];
      for (let key of booleanFilterKeys) {
        if (filters[key] === true && !product[key]) {
          return false;
        }
      }

      // Filter by fabrics (material)
      if (filters.fabrics?.length > 0 && !filters.fabrics.includes(product.material)) {
        return false;
      }

      // Filter by colors (product.colors is array)
      if (filters.colors?.length > 0 && !product.colors.some(color => filters.colors.includes(color))) {
        return false;
      }

      // Filter by price range
      if (filters.priceRange?.from != null && filters.priceRange?.to != null) {
        if (product.price < filters.priceRange.from || product.price > filters.priceRange.to) {
          return false;
        }
      }

      // Filter by search query in title (if applicable)
      if (filters.searchQuery && !product.title.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false;
      }

      return true;
    })
  }
);
