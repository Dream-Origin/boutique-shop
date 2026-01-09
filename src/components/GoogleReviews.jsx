import React, { useEffect, useState } from "react";
import { GoogleReviews } from "react-elfsight-reviews";
import './GoogleReviews.css';

function GoogleReviewsLayout() {
  useEffect(() => {
    // 1. Create the script element
    const script = document.createElement('script');
    script.src = "https://featurable.com/assets/v2/carousel_default.min.js";
    script.async = true;

    // 2. Add the script to the page
    document.body.appendChild(script);

    // 3. Optional: Cleanup when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []); // Empty array means this runs once after the first render
  return (
    <>
      {/* <div className="google-review-root">
        <h2>What Our Customers Say</h2>
        <GoogleReviews id="elfsight-app-c662db41-c885-4e16-8031-f0c8a8aca4fa" />
      </div> */}
      <div id="featurable-3b6dcef3-ba01-451a-9726-317d0f853a39" data-featurable-async />
    </>
  );
}

export default GoogleReviewsLayout;
