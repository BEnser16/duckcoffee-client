import React from "react";
import { useState ,useEffect } from "react";
import latteImg from "../../static/img/coffee/latte.jpg";
import americanoImg from "../../static/img/coffee/americano.jpg";
import cappuccinoImg from "../../static/img/coffee/cappuccino.jpg";
import vanillaImg from "../../static/img/coffee/vanillalatte.jpg";
import mochaImg from "../../static/img/coffee/mocha.jpg";
import goldenImg from "../../static/img/coffee/golden.jpg";
import smoothieImg from "../../static/img/coffee/smoothie.jpg";
import espressoImg from "../../static/img/coffee/espresso.jpg";

const CoffeeMenu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    setMenuItems([
        {
          name: "拿鐵咖啡",
          description: "香濃的咖啡配以絲滑的牛奶，絕佳的平衡。",
          image: latteImg,
        },
        {
          name: "美式咖啡",
          description: "簡單純粹的美式咖啡，帶來濃郁的咖啡香。",
          image: americanoImg,
        },
        {
          name: "卡布奇諾",
          description: "濃縮咖啡和蒸汽牛奶的完美結合，帶有一層柔軟的奶泡。",
          image: cappuccinoImg,
        },
        {
          name: "香草拿鐵",
          description: "香草風味的拿鐵咖啡，帶來一絲甜蜜的味道。",
          image: vanillaImg,
        },
        {
          name: "摩卡咖啡",
          description: "巧克力和咖啡的絕妙融合，豐富的口感令人愉悅。",
          image: mochaImg,
        },
        {
          name: "義式濃縮",
          description: "其口感醇厚渾重、豐富飽滿，表面有一層咖啡脂，香濃可口。",
          image: espressoImg,
        },
        {
          name: "黃金曼特寧",
          description: "煙燻、辛香料味，細膩口感且醇厚回甘，餘韻如優質巧克力持久。",
          image: goldenImg,
        },
        {
          name: "巧克力冰沙",
          description:
            "以牛奶及可可碎片調製，加上細緻鮮奶油及摩卡醬，濃厚的巧克力風味及多重口感，深獲歡迎。",
          image: smoothieImg,
        }
      ]);
  } , []);
  

  return (
    <div className="row d-flex">
      {menuItems.map((item, index) => {
        return (
          <div key={index} class="card border-dark m-2" style={{ width: "18rem" }} >
            <img src={item.image} class="card-img-top" alt="coffee" />
            <div class="card-body">
              <h3>{item.name}</h3>
              <p class="card-text">{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CoffeeMenu;
