// src/hooks/useApplyHomeFilter.js
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearAllFilters, setCategory, toggleBooleanFilter } from '../redux//slices/filterSlice'

export function useApplyHomeFilter() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function applyFilter(filterType) {
    dispatch(clearAllFilters())
    switch (filterType) {
      case 'newArrival':
        dispatch(toggleBooleanFilter('newArrival'))
        break
      case 'salwarMaterial':
        dispatch(setCategory('Salwar Materials'))
        break
      case 'readyToWear':
        dispatch(setCategory('Ready to Wear'))
        break
      case 'bestSeller':
        dispatch(toggleBooleanFilter('bestSeller'))
        break
      case 'exclusive':
        dispatch(toggleBooleanFilter('exclusive'))
        break
      default:
        break
    }
    if (filterType === 'salwarMaterial' || filterType === 'readyToWear') {
      navigate('/products?attribute=' + filterType)
    }
    else {
      navigate('/products?attribute=' + filterType)
    }
  }


  return applyFilter
}
