import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import Carousel from "../components/Carousel";
import ScrollableCategoryCarousel from "../components/ScrollableCategoryCarousel";
import { useDispatch, useSelector } from "react-redux";
import { selectProductsByCategory } from "../redux/selectors/productsSelectors";
import FeaturesSection from "../components/FeaturesSection";
import CategoriesSection from "../components/CategoriesSection";
import banner1 from "../data/images/banner1.png";
import banner2 from "../data/images/banner2.png";
import BoutiqueCard from "../components/BoutiqueCard";
import HeroCard from "../components/HeroCard";
import PriceFilterSection from "../components/PriceFilterSection";
import GoogleReviews from "../components/GoogleReviews";

function Home() {
  const [selectedPriceRange, setSelectedPriceRange] = React.useState();

  const newArrivalsImags = useSelector(selectProductsByCategory("newArrival"));
  const bestSellerImages = useSelector(selectProductsByCategory("bestSeller"));
  const uniqueImages = useSelector(selectProductsByCategory("unique"));

  const carouselImages = [
    {
      url: banner1,
      alt: "Women Fashion Collection",
      caption: "New Women Collection",
      description: "Discover the latest trends",
    },
    {
      url: banner2,
      alt: "Women Fashion Collection",
      caption: "New Women Collection",
      description: "Discover the latest trends",
    },
  ];

  const filterOptions = {
    priceRanges: [
      { value: "below-1000", from: 0, to: 999 },
      { value: "1000-2000", from: 1000, to: 2000 },
      { value: "above-2000", from: 2001, to: null },
    ],
  };

  const handlePriceRangeChange = (value) => {
    let selectedRange = filterOptions.priceRanges.find(
      (range) => range.value === value
    );
    if (selectedRange) {
      dispatch(
        setPriceRange({ from: selectedRange.from, to: selectedRange.to })
      );
      setSelectedPriceRange(value);
    }
  };

  return (
    <>
      <CategoriesSection />

      {/* Carousel Section */}
      <section className="carousel-section">
        <Carousel images={carouselImages} autoPlay={true} interval={4000} />
      </section>
      {/* <section className="">
        <BoutiqueCard />
      </section> */}

      <section>
        <ScrollableCategoryCarousel
          header="New Arrivals"
          images={newArrivalsImags}
          headerStyle={{ color: "#333" }}
          type="newArrival"
        />
      </section>

      <section>
        <ScrollableCategoryCarousel
          header="Bestseller"
          images={bestSellerImages}
          headerStyle={{ color: "#333" }}
          type="bestSeller"
        />
      </section>

      <section>
        <ScrollableCategoryCarousel
          header="Rare & Unique"
          images={uniqueImages}
          headerStyle={{ color: "#333" }}
          type="unique"
        />
      </section>

      <section>
        <PriceFilterSection
          selected={selectedPriceRange}
          onChange={handlePriceRangeChange}
        />
      </section>

      <FeaturesSection />
      {/* Features Section */}

      <section>
        <GoogleReviews />
      </section>
    </>
  );
}

export default Home;
