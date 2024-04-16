import React from "react";
import { MenuService } from "../../service/MenuService";
import { useState } from "react";

const AddMenuItem = () => {

  const [name , setName] = useState("");
  const [description , setDescription] = useState("");
  const [price , setPrice] = useState();
  const [category , setCategory] = useState("coffee");
  const [img , setImg] = useState();

  function handleCreateMenuItem(name , description , price , category , img) {
    MenuService.createMenuItem(name , description , img , price, category).then((res) => {
      console.log("create menu item res: " , res);
      window.alert("create menu item success.");
      window.location.reload();
    }).catch((err) => {
      console.warn("create menu item error: " , err);
    })
  }

  const handleInputName = (e) => {
    setName(e.target.value);
  }

  const handleInputDescription = (e) => {
    setDescription(e.target.value);
  }

  const handleInputPrice = (e) => {
    setPrice(e.target.value);
  }
  
  const handleSelectCategory = (category) => {
    setCategory(category);
  }

  const handleImgFile = (e) => {
    const img_file = e.target.files[0];
    setImg(img_file);
  }

  return (
    <div>
      <button
        className="btn btn-info"
        data-bs-toggle="modal"
        data-bs-target="#addmenuItem"
      >
        新增品項
      </button>

      <div
        className="modal fade"
        id="addmenuItem"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                新增餐點品項
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">
                  餐點名稱
                </span>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={handleInputName}
                  placeholder="請輸入餐點名稱"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">
                  餐點描述
                </span>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="請輸入餐點描述"
                  value={description}
                  onChange={handleInputDescription}
                ></textarea>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">
                  價格
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="請輸入餐點價格"
                  value={price}
                  onChange={handleInputPrice}
                />

                <div className="dropdown mx-2">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {category}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button className="dropdown-item" onClick={() => handleSelectCategory("coffee")} >
                        咖啡
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={() => handleSelectCategory("sandwich")} >
                        三明治
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={() => handleSelectCategory("desert")} >
                        甜點
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={() => handleSelectCategory("salad")} >
                        沙拉
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  上傳餐點圖片
                </label>
                <input className="form-control" type="file" id="formFile" onChange={() => handleImgFile} />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                取消
              </button>
              <button type="button" className="btn btn-primary" onClick={() => handleCreateMenuItem(name , description , price , category , img)} >
                完成
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMenuItem;
