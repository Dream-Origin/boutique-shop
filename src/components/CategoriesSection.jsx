import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCategory } from '../redux/slices/categorySlice';
import newArrival from '../data/images/newArrival.png'
import salwarMaterials from '../data/images/salwarMaterials.png'
import bestSeller from '../data/images/bestSeller.png'
import readyToWear from '../data/images/readyToWear.png'
import unique from '../data/images/unique.png'
import IMG_6393 from '../data/images/IMG_6393.jpg'
import IMG_7545 from '../data/images/IMG_7545.jpg'
import IMG_6824 from '../data/images/IMG_6824.jpg'
import IMG_7439 from '../data/images/IMG_7439.jpg'
import IMG_6626 from '../data/images/IMG_6626.jpg'
import { useApplyHomeFilter } from '../hooks/useApplyHomeFilter';
const categories = [
  {
    name: 'New Arrival',
    image: newArrival,
    link: '/shop?category=New%20Arrival',
    type: 'newArrival'
  },
  {
    name: 'Salwar Materials',
    image: salwarMaterials,
    link: '/shop?category=Salwar%20Materials',
    type: 'salwarMaterial'
  },
  {
    name: 'Rare and Unique',
    image: unique,
    link: '/shop?category=Rare%20and%20Unique',
    type: 'unique'
  },
  {
    name: 'Bestseller',
    image: bestSeller,
    link: '/shop?category=Bestseller',
    type: 'bestSeller'
  },
  {
    name: 'Ready to wear',
    image: readyToWear,
    link: '/shop?category=Bestseller',
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
