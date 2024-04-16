import React from "react";
import { useState, useEffect } from "react";
import { MenuService } from "../../service/MenuService";
import AddMenuItem from "./AddMenuItem";
import AddMenuCategory from "./AddMenuCategory";
import EditMenuItem from "./EditMenuItem";

const MenuControl = () => {
  function handleManageMode(selectMode) {
    if (selectMode !== mode) {
      setMode(selectMode);
    }
  }

  function handleDeleteMenuItem(href) {
    // get id by regex
    const idMatch = href.match(/\/(\d+)$/); // 提取最後的數字
    const id = idMatch ? idMatch[1] : null;
    console.log("Delete MenuItem ID:", id);



    MenuService.deleteMenuItemById(id).then((res) => {
      console.log("delete menu item res: " , res);
      window.alert("MenuItem has been delete.");
      window.location.reload();


    }).catch((err) => {
      console.warn("delete menu item error: " , err);
    });
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
    <div className="container ms-4" >
      <div className="mt-5">
        {/** menu control option */}
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className="nav-link active"
              data-bs-toggle="tab"
              aria-current="page"
              onClick={() => handleManageMode("coffee-tab")}
            >
              咖啡
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link"
              data-bs-toggle="tab"
              onClick={() => handleManageMode("sandwich-tab")}
            >
              三明治
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link"
              data-bs-toggle="tab"
              onClick={() => handleManageMode("dessert-tab")}
            >
              甜點
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link"
              data-bs-toggle="tab"
              onClick={() => handleManageMode("salad-tab")}
            >
              沙拉
            </button>
          </li>
        </ul>
        {/** control menu item option */}
        <div className="mt-4 d-flex">
          <AddMenuCategory />
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
                    className="card border-dark m-2"
                    style={{ width: "16rem" }}
                    id={index}
                  >
                    <img src={item.img} style={{maxHeight:"150px"}} className="card-img-top" alt="coffee" />
                    <div className="card-body">
                      <h3>{item.name}</h3>
                      <p className="card-text">{item.description}</p>
                      <h5>${item.price}</h5>
                      <div className="d-flex">
                        <button className="btn btn-danger" onClick={() => handleDeleteMenuItem(item._links.self.href)} >刪除</button>
                        <EditMenuItem menuItem={item} />
                      </div>
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
                    className="card border-dark m-2"
                    style={{ width: "16rem" }}
                  >
                    <img src={item.img} style={{maxHeight:"200px"}} className="card-img-top" alt="coffee" />
                    <div className="card-body">
                      <h3>{item.name}</h3>
                      <p className="card-text">{item.description}</p>
                      <h5>${item.price}</h5>

                      <div className="d-flex">
                        <button className="btn btn-danger" onClick={() => handleDeleteMenuItem(item._links.self.href)} >刪除</button>
                        <EditMenuItem menuItem={item} />
                      </div>
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
                    className="card border-dark m-2"
                    style={{ width: "16rem" }}
                  >
                    <img src={item.img} style={{maxHeight:"200px"}} className="card-img-top" alt="coffee" />
                    <div className="card-body">
                      <h3>{item.name}</h3>
                      <p className="card-text">{item.description}</p>
                      <h5>${item.price}</h5>

                      <div className="d-flex">
                        <button className="btn btn-danger" onClick={() => handleDeleteMenuItem(item._links.self.href)} >刪除</button>
                        <EditMenuItem menuItem={item} />
                      </div>
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
                    className="card border-dark m-2"
                    style={{ width: "16rem" }}
                  >
                    <img src={item.img} style={{maxHeight:"150px"}} className="card-img-top" alt="coffee" />
                    <div className="card-body">
                      <h3>{item.name}</h3>
                      <p className="card-text">{item.description}</p>
                      <h5>${item.price}</h5>

                      <div className="d-flex">
                        <button className="btn btn-danger" onClick={() => handleDeleteMenuItem(index)} >刪除</button>
                        <EditMenuItem menuItem={item} itemId={index}/>
                      </div>
                      
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
