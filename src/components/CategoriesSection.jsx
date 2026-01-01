import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import salwarMaterials from '../data/images/salwarMaterials.png'
import bestSeller from '../data/images/bestSeller.png'
import readyToWear from '../data/images/readyToWear.png'
import unique from '../data/images/unique.png'
import { useApplyHomeFilter } from '../hooks/useApplyHomeFilter';
const categories = [
 
  {
    name: 'Salwar Materials',
    image: salwarMaterials,
    link: '/shop?category=salwarMaterial',
    type: 'salwarMaterial'
  },
  {
    name: 'Exclusive',
    image: unique,
    link: '/shop?category=exclusive',
    type: 'exclusive'
  },
  {
    name: 'Bestseller',
    image: bestSeller,
    link: '/shop?category=bestSeller',
    type: 'bestSeller'
  },
  {
    name: 'Ready to wear',
    image: readyToWear,
    link: '/shop?category=readyToWear',
    type: 'readyToWear'
  },
]
const CategoriesSection = () => {
  const applyFilter = useApplyHomeFilter()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategoryClick = (type) => {
    applyFilter(type)
  };

  return (
    <section className="categories-section">
      <div className="categories-scroll-wrapper">
        <div className="categories-circles-row">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className="category-circle-card"
              aria-label={cat.name}
              onClick={() => handleCategoryClick(cat.type)}
              type="button"
            >
              <img src={cat.image} alt={cat.name} loading="lazy" />
              <span className="category-circle-label">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
