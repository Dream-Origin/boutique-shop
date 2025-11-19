import { createSelector } from '@reduxjs/toolkit';

export const selectProductsByCategory = (category) =>
  createSelector(
    (state) => state.products.items,     // <-- FIX
    (products) => products
      ?.filter((product) => product[category])
      .slice(0, 10)
  );

export const selectProductsById = (id) =>
  createSelector(
    (state) => state.products.items,     // <-- FIX
    (products) => products?.find((product) => product.productId === id)
  );


export const selectProductsBySubCategoryName = (subCategory) =>
  createSelector(
    (state) => state.products.items,     // <-- FIX
    (products) => products
      ?.filter((product) => product.subCategory === subCategory)
      .slice(0, 10)
  );
