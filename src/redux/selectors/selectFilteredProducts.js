import { createSelector } from '@reduxjs/toolkit';

export const selectFilteredProducts = createSelector(
  (state) => state.products.items,   // <-- FIXED
  (state) => state.filters,
  (products, filters) => {
    if (!products) return [];

    return products.filter(product => {

      // Filter by availability
      if (filters.availability === 'inStock' && product.stock <= 0) return false;
      if (filters.availability === 'outOfStock' && product.stock > 0) return false;

      // Category filter
      if (
        filters.category &&
        filters.category !== 'all' &&
        product.subCategory !== filters.category
      ) {
        return false;
      }

      // Boolean attribute filters
      const booleanFilterKeys = [
        'budget', 'premium', 'exclusive',
        'handpicked', 'bestSeller', 'unique', 'newArrival'
      ];

      for (let key of booleanFilterKeys) {
        if (filters[key] === true && !product[key]) return false;
      }

      // Fabric (material) filter
      if (filters.fabrics?.length > 0 && !filters.fabrics.includes(product.material)) {
        return false;
      }

      // Color filter (if product.colors is an array)
      if (
        filters.colors?.length > 0 &&
        !product.colors?.some(color => filters.colors.includes(color))
      ) {
        return false;
      }

      // Price range filter
      if (filters.priceRange?.from != null && filters.priceRange?.to != null) {
        const { from, to } = filters.priceRange;
        if (product.price < from || product.price > to) return false;
      }

      // Search by title
      if (
        filters.searchQuery &&
        !product.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }
);
