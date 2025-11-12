import React, { useState, useEffect } from 'react'
import './Carousel.css'

function Carousel({ images, autoPlay = true, interval = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (autoPlay && images.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        )
      }, interval)
      
      return () => clearInterval(timer)
    }
  }, [autoPlay, interval, images.length, currentIndex])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className="carousel">
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
          >
            <img src={image.url} alt={image.alt || `Slide ${index + 1}`} />
            {/* {image.caption && (
              <div className="carousel-caption">
                <h3>{image.caption}</h3>
                {image.description && <p>{image.description}</p>}
              </div>
            )} */}
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          {/* <button 
            className="carousel-btn carousel-btn-prev" 
            onClick={goToPrevious}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button 
            className="carousel-btn carousel-btn-next" 
            onClick={goToNext}
            aria-label="Next slide"
          >
            ›
          </button> */}

          <div className="carousel-dots">
            {images.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Carousel
