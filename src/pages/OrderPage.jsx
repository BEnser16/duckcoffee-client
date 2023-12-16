import React from "react";
import { useState, useEffect } from "react";
import { MenuService } from "../service/MenuService";
import { Nav } from "react-bootstrap";
import OrderMenu from "../components/orderpage/OrderMenu";


const OrderPage = () => {
  const [cart , setCart] = useState([]); // orderItem list
  const [mode, setMode] = useState("coffeeOrder");
  const [coffeeItems, setCoffeeItems] = useState([]);
  const [sandwichItems, setSandwichItems] = useState([]);
  const [dessertItems, setDessertItems] = useState([]);
  const [saladItems, setSaladItems] = useState([]);

  function handleManageMode(selectMode) {
    if (selectMode !== mode) {
      setMode(selectMode);
    }
  }

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
      <h2 className="mt-4">今天想吃點什麼呢？</h2>

      <div className="row mt-5 mx-2">
        <Nav variant="tabs" defaultActiveKey="coffeeLink" >
          <Nav.Item>
            <Nav.Link eventKey="coffeeLink" onClick={() => handleManageMode("coffeeOrder")} >咖啡</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="sandwichLink" onClick={() => handleManageMode("sandwichOrder")} >三明治</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link  eventKey="dessertLink" onClick={() => handleManageMode("dessertOrder")} >
              甜點
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="saladLink" onClick={() => handleManageMode("saladOrder")} >
              沙拉
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <div className="d-flex mt-3">
          <button className="btn btn-success " >查看購物車</button>

        </div>
      </div>
      <div className="mt-3" id="orderTabContent" >
        {mode === "coffeeOrder" && <OrderMenu Items={coffeeItems} cart={cart} setCart={setCart} />}
        {mode === "sandwichOrder" && <OrderMenu Items={sandwichItems} cart={cart} setCart={setCart}/>}
        {mode === "dessertOrder" && <OrderMenu Items={dessertItems} cart={cart} setCart={setCart} />}
        {mode === "saladOrder" && <OrderMenu Items={saladItems} cart={cart} setCart={setCart} />}
      </div>
    </div>
  );
};

export default OrderPage;
