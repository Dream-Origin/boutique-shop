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
        dispatch(setCategory('salwar-materials'))
        break
      case 'readyToWear':
        dispatch(setCategory('ready-to-wear'))
        break
      case 'bestSeller':
        dispatch(toggleBooleanFilter('bestSeller'))
        break
      case 'unique':
        dispatch(toggleBooleanFilter('unique'))
        break
      default:
        break
    }
    navigate('/products')
  }

  return applyFilter
}
