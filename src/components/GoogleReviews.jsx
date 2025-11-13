import React, { useState } from "react";
import { GoogleReviews } from "react-elfsight-reviews";
import './GoogleReviews.css';

function GoogleReviewsLayout() {
  return (
    <>
      <div className="google-review-root">
        <h2>What Our Customers Say</h2>
        <GoogleReviews id="elfsight-app-c662db41-c885-4e16-8031-f0c8a8aca4fa" />
      </div>
    </>
  );
}

export default GoogleReviewsLayout;
