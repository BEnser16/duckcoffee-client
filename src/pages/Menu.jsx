import React from "react";
import CoffeeMenu from "../components/menupage/CoffeeMenu";
import SandwichMenu from "../components/menupage/SandwichMenu";
import DessertMenu from "../components/menupage/DessertMenu";
import SaladMenu from "../components/menupage/SaladMenu";
import { useState, useEffect } from "react";
import { MenuService } from "../service/MenuService";

const Menu = () => {
  function handleManageMode(selectMode) {
    if (selectMode !== mode) {
      setMode(selectMode);
    }
  }

  const [mode, setMode] = useState("coffee-tab");
  const [coffeeItems, setCoffeeItems] = useState([]);
  const [sandwichItems, setSandwichItems] = useState([]);
  const [dessertItems, setDessertItems] = useState([]);
  const [saladItems, setSaladItems] = useState([]);

  useEffect(() => {
    MenuService.getAllMenuItem()
      .then((res) => {
        // filter coffee
        const resMenuItems = res.data._embedded.menuItems;
        console.log("res menu item: ", resMenuItems);
        const coffeeItemArray = [];
        const sandwichItemArray = [];
        const desertItemArray = [];
        const saladItemArray = [];
        resMenuItems.forEach((element) => {
          if (element.category === "coffee") {
            coffeeItemArray.push(element);
          }
          if (element.category === "sandwich") {
            sandwichItemArray.push(element);
          }
          if (element.category === "dessert") {
            desertItemArray.push(element);
          }
          if (element.category === "salad") {
            saladItemArray.push(element);
          }
        });

        setCoffeeItems(coffeeItemArray);
        setSandwichItems(sandwichItemArray);
        setDessertItems(desertItemArray);
        setSaladItems(saladItemArray);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  return (
    <div className="container">
      <h3 className="my-4">餐點介紹</h3>
      <div className="row p-4 mb-4">
      <div className="row">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <button
              class="nav-link active"
              data-bs-toggle="tab"
              data-bs-target="#coffee-content"
              aria-current="page"
              onClick={() => handleManageMode("coffee-tab")}
            >
              咖啡
            </button>
          </li>
          <li class="nav-item">
            <button
              class="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#sandwich-content"
              onClick={() => handleManageMode("sandwich-tab")}
            >
              三明治
            </button>
          </li>
          <li class="nav-item">
            <button
              class="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#dessert-content"
              onClick={() => handleManageMode("dessert-tab")}
            >
              甜點
            </button>
          </li>
          <li class="nav-item">
            <button
              class="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#salad-content"
              onClick={() => handleManageMode("salad-tab")}
            >
              沙拉
            </button>
          </li>
        </ul>
      </div>
      <div className="mt-3">
        <div >
          {mode === "coffee-tab" && (
            
            <CoffeeMenu mode={mode} coffeeItems={coffeeItems} />
          )}
        </div>
        <div>
          {mode === "sandwich-tab" && (
            <SandwichMenu mode={mode} sandwichItems={sandwichItems} />
          )}
        </div>
        <div >
          {mode === "dessert-tab" && (
            <DessertMenu mode={mode} dessertItems={dessertItems} />
          )}
        </div>
        <div >
          {mode === "salad-tab" && (
            <SaladMenu mode={mode} saladItems={saladItems} />
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Menu;
