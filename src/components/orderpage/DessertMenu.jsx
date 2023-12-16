import React from 'react'

const DessertMenu = (props) => {
    let dessertItems = props.dessertItems;
  return (
    <>
      {dessertItems.map((item, index) => {
        return (
          <div key={index} class="card border-dark m-4">
            <div className="row g-0">
              <div className="col-md-4">
                <img src={item.img} class="card-img-top" alt="coffee" />
              </div>
              <div className="col-md-8">
                <div class="card-body">
                  <h3>{item.name}</h3>
                  <p class="card-text">{item.description}</p>
                  <h5>${item.price}</h5>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  )
}

export default DessertMenu