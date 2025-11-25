import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchQuery,
  setCategory,
  setFabrics,
  setColors,
  setPriceRange,
  toggleBooleanFilter
} from "../redux/slices/filterSlice";

export default function useFilterUrlSync() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const filters = useSelector((state) => state.filters);
  const {
    searchQuery,
    category,
    fabrics,
    colors,
    priceRange,
    exclusive,
    bestSeller,
    newArrival
  } = filters;

  // ---- IMPORTANT ----
  // We use a ref to ensure URL hydration runs exactly ONCE
  const hasLoadedFromUrl = useRef(false);

  /* ------------------------------------------------
     1. APPLY URL → REDUX (RUN ONLY ONCE)
  -------------------------------------------------*/
  useEffect(() => {
    if (hasLoadedFromUrl.current) return; // prevent second run
    hasLoadedFromUrl.current = true;

    const params = Object.fromEntries([...searchParams]);

    if (params.search) dispatch(setSearchQuery(params.search));
    if (params.category) dispatch(setCategory(params.category));

    if (params.fabrics) dispatch(setFabrics(params.fabrics.split(",")));
    if (params.colors) dispatch(setColors(params.colors.split(",")));

    if (params.priceFrom && params.priceTo) {
      dispatch(
        setPriceRange({
          from: Number(params.priceFrom),
          to: params.priceTo === "inf" ? Infinity : Number(params.priceTo)
        })
      );
    }

    // Boolean flags
    ["exclusive", "bestSeller", "newArrival"].forEach((flag) => {
      if (params[flag] === "true") dispatch(toggleBooleanFilter(flag));
    });
  }, []);


  /* ------------------------------------------------
     2. SYNC REDUX → URL (ONLY AFTER URL WAS HYDRATED)
  -------------------------------------------------*/
  useEffect(() => {
    if (!hasLoadedFromUrl.current) return; // wait until URL hydration is done

    const params = {};

    if (searchQuery) params.search = searchQuery;
    if (category !== "all") params.category = category;

    if (fabrics.length > 0) params.fabrics = fabrics.join(",");
    if (colors.length > 0) params.colors = colors.join(",");

    if (priceRange.from !== 0 || priceRange.to !== Infinity) {
      params.priceFrom = priceRange.from;
      params.priceTo = priceRange.to === Infinity ? "inf" : priceRange.to;
    }

    if (exclusive) params.exclusive = true;
    if (bestSeller) params.bestSeller = true;
    if (newArrival) params.newArrival = true;

    setSearchParams(params);
  }, [
    searchQuery,
    category,
    fabrics,
    colors,
    priceRange,
    exclusive,
    bestSeller,
    newArrival
  ]);
}
