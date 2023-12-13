import React from 'react'

const SaladMenu = (props) => {
  let tab = props.mode;
  let saladItems = props.saladItems;
  console.log("start salad effect tab is :" , tab);
  

  return (
    <div className="row d-flex">
      {saladItems.map((item, index) => {
        return (
          <div key={index} class="card border-dark m-2" style={{ width: "18rem" }} >
            <img src={item.img} class="card-img-top" alt="coffee" />
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
}

export default SaladMenu