import React from "react";

const SandwichMenu = (props) => {
  let sandwichmenuItems = props.sandwichItems;

  
  

  return (
    <div className="row d-flex">
      {sandwichmenuItems != null && sandwichmenuItems.map((item, index) => {
        return (
          <div key={index} class="card border-dark m-2" style={{ width: "18rem" }} >
            <img src={item.img} class="card-img-top" alt="sandwich" />
            <div class="card-body">
              <h3>{item.name}</h3>
              <p class="card-text">{item.description}</p>
              <h5>${item.price}</h5>

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SandwichMenu;
