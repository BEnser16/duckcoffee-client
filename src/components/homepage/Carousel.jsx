import React from "react";
import nathanImg from '../../static/img/nathan.jpg';
import threehandImg from '../../static/img/threehand.jpg';
import famiImg from '../../static/img/fami.jpg';

const Carousel = () => {
  return (
    <div>
      <div
        id="carouselExampleAutoplaying"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={nathanImg} class="d-block w-100" alt="..." />
          </div>
          <div class="carousel-item">
            <img src={threehandImg} class="d-block w-100" alt="..." />
          </div>
          <div class="carousel-item">
            <img src={famiImg} class="d-block w-100" alt="..." />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
