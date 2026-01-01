import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Home.css'
import Carousel from '../components/Carousel'
import ScrollableCategoryCarousel from '../components/ScrollableCategoryCarousel'
import { useDispatch, useSelector } from 'react-redux';
import { selectProductsByCategory } from '../redux/selectors/productsSelectors';
import CategoriesSection from '../components/CategoriesSection';
import banner3 from '../data/images/banner3.png';
import BoutiqueCard from '../components/BoutiqueCard'
import PriceFilterSection from '../components/PriceFilterSection'
import { setPriceRange } from '../redux/slices/filterSlice'
import HorizontalProductSkeleton from '../components/HorizontalProductSkeleton'


function Home({ onAddToCart }) {

  const navigate = useNavigate()
  const [selectedPriceRange, setSelectedPriceRange] = React.useState();

  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, [dispatch]);



  const newArrivalsImags = useSelector(selectProductsByCategory('newArrival'));
  const bestSellerImages = useSelector(selectProductsByCategory('bestSeller'));
  const exclusiveImages = useSelector(selectProductsByCategory('exclusive'));

  const carouselImages = [
    {
      url: banner3,
      alt: 'Women Fashion Collection',
      caption: 'New Women Collection',
      description: 'Discover the latest trends'
    },

  ]


  const filterOptions = {
    priceRanges: [
      { value: "below-1000", from: 0, to: 999 },
      { value: "1000-2000", from: 1000, to: 2000 },
      { value: "above-2000", from: 2001, to: null }
    ]
  };

  const handlePriceRangeChange = (value) => {
    let selectedRange = filterOptions.priceRanges.find(range => range.value === value);
    if (selectedRange) {
      dispatch(setPriceRange({ from: selectedRange.from, to: selectedRange.to }));
      setSelectedPriceRange(value);
      navigate('/products?priceRanges=' + `{from:${selectedRange.from},to:${selectedRange.to}}`)
    }
  };


  return (
    <>
      <CategoriesSection />


      {/* Carousel Section */}
      {/* <section className="carousel-section">
        <Carousel images={carouselImages} autoPlay={true} interval={4000} />
       
      </section> */}
      <section className='banner-image-wrapper'>
        <img  src={banner3} alt='banner' loading='lazy' />
      </section>

      <BoutiqueCard />

      <section>
        {loading ? (
          <div className="scrollable-carousel">
            {Array.from({ length: 8 }).map((_, i) => (
              <HorizontalProductSkeleton key={i} />
            ))}
          </div>) :

          (<ScrollableCategoryCarousel
            header="New Arrivals"
            images={newArrivalsImags}
            headerStyle={{ color: '#333' }}
            type="newArrival"
            onAddToCart={onAddToCart}
          />)}
      </section>


      <section>
        {loading ? (
          <div className="scrollable-carousel">
            {Array.from({ length: 8 }).map((_, i) => (
              <HorizontalProductSkeleton key={i} />
            ))}
          </div>) :

          (<ScrollableCategoryCarousel
            header="Bestseller"
            images={bestSellerImages}
            headerStyle={{ color: '#333' }}
            type="bestSeller"
            onAddToCart={onAddToCart}
          />)}
      </section>

      <section>
        {loading ? (
          <div className="scrollable-carousel">
            {Array.from({ length: 8 }).map((_, i) => (
              <HorizontalProductSkeleton key={i} />
            ))}
          </div>) :

          (<ScrollableCategoryCarousel
            header="Exclusive"
            images={exclusiveImages}
            headerStyle={{ color: '#333' }}
            type="exclusive"
            onAddToCart={onAddToCart}
          />)}
      </section>


      <section>
        <PriceFilterSection
          selected={selectedPriceRange}
          onChange={handlePriceRangeChange}
        />

      </section>

      {/* <section>
        <GoogleReviews />
      </section> */}

      {/* <FeaturesSection /> */}
      {/* Features Section */}

    </>
  )
}

export default Home
