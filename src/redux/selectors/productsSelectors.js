import { createSelector } from '@reduxjs/toolkit';

export const selectProductsByCategory = (category) =>
  createSelector(
    (state) => state.products,
    (products) => products
      .filter((product) => product[category])
      .slice(0, 10) // get first 5 results only
  );

export const selectProductsById = (id) =>
  createSelector(
    (state) => state.products,
    (products) => products
      .find((product) => product.id === id)
  );

export const selectProductsBySubCategoryName = (subCategory) =>
  createSelector(
    (state) => state.products,
    (products) => products
      .filter((product) => product.subCategory === subCategory)
      .slice(0, 10) // get first 5 results only
  );