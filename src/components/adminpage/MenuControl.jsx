import React from "react";
import { useState, useEffect } from "react";
import { MenuService } from "../../service/MenuService";
import AddMenuItem from "./AddMenuItem";

const MenuControl = () => {
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
    <div>
      <div className="row mt-5">
        {/** menu control option */}
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <button
              class="nav-link active"
              data-bs-toggle="tab"
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
              onClick={() => handleManageMode("sandwich-tab")}
            >
              三明治
            </button>
          </li>
          <li class="nav-item">
            <button
              class="nav-link"
              data-bs-toggle="tab"
              onClick={() => handleManageMode("dessert-tab")}
            >
              甜點
            </button>
          </li>
          <li class="nav-item">
            <button
              class="nav-link"
              data-bs-toggle="tab"
              onClick={() => handleManageMode("salad-tab")}
            >
              沙拉
            </button>
          </li>
        </ul>
        {/** control menu item option */}
        <div className="mt-4 d-flex">
          <button className="btn btn-success mx-2">新增分類</button>
          <AddMenuItem/>
        </div>
      </div>
      <div className="mt-3">
        {/* Coffee menu */}
        <div>
          <div className="row d-flex">
            {mode === "coffee-tab" &&
              coffeeItems.map((item, index) => {
                return (
                  <div
                    key={index}
                    class="card border-dark m-2"
                    style={{ width: "18rem" }}
                  >
                    <img src={item.img} class="card-img-top" alt="coffee" />
                    <div class="card-body">
                      <h3>{item.name}</h3>
                      <p class="card-text">{item.description}</p>
                      <button className="btn btn-danger">刪除</button>
                      <button className="btn btn-primary m-2">編輯</button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Sandwich manu */}
        <div>
          <div className="row d-flex">
            {mode === "sandwich-tab" &&
              sandwichItems.map((item, index) => {
                return (
                  <div
                    key={index}
                    class="card border-dark m-2"
                    style={{ width: "18rem" }}
                  >
                    <img src={item.img} class="card-img-top" alt="coffee" />
                    <div class="card-body">
                      <h3>{item.name}</h3>
                      <p class="card-text">{item.description}</p>
                      <button className="btn btn-danger">刪除</button>
                      <button className="btn btn-primary m-2">編輯</button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/** Desert manu */}
        <div>
          <div className="row d-flex">
            {mode === "dessert-tab" &&
              dessertItems.map((item, index) => {
                return (
                  <div
                    key={index}
                    class="card border-dark m-2"
                    style={{ width: "18rem" }}
                  >
                    <img src={item.img} class="card-img-top" alt="coffee" />
                    <div class="card-body">
                      <h3>{item.name}</h3>
                      <p class="card-text">{item.description}</p>
                      <button className="btn btn-danger">刪除</button>
                      <button className="btn btn-primary m-2">編輯</button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Salad menu */}
        <div>
          <div className="row d-flex">
            {mode === "salad-tab" &&
              saladItems.map((item, index) => {
                return (
                  <div
                    key={index}
                    class="card border-dark m-2"
                    style={{ width: "18rem" }}
                  >
                    <img src={item.img} class="card-img-top" alt="coffee" />
                    <div class="card-body">
                      <h3>{item.name}</h3>
                      <p class="card-text">{item.description}</p>
                      <button className="btn btn-danger">刪除</button>
                      <button className="btn btn-primary m-2">編輯</button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuControl;
