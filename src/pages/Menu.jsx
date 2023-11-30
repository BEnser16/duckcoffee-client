import React from "react";
import CoffeeMenu from "../components/menupage/CoffeeMenu";

const Menu = () => {
  return (
    <div className="container">
      <div className="row mt-5">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <button class="nav-link active" aria-current="page">
              咖啡
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link" >
              三明治
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link" >
              甜點
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link ">
              沙拉
            </button>
          </li>
        </ul>
      </div>
      <div className="mt-3">
        <CoffeeMenu/>
      </div>
    </div>
  );
};

export default Menu;
