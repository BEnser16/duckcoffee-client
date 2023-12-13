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
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                新增餐點品項
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">
                  餐點名稱
                </span>
                <input
                  type="text"
                  class="form-control"
                  value={name}
                  onChange={handleInputName}
                  placeholder="請輸入餐點名稱"
                />
              </div>
              <div className="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">
                  餐點描述
                </span>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="請輸入餐點描述"
                  value={description}
                  onChange={handleInputDescription}
                ></textarea>
              </div>
              <div className="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">
                  價格
                </span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="請輸入餐點價格"
                  value={price}
                  handleInputPrice={handleInputPrice}
                />

                <div class="dropdown mx-2">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {category}
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <button class="dropdown-item" onClick={() => handleSelectCategory("coffee")} >
                        咖啡
                      </button>
                    </li>
                    <li>
                      <button class="dropdown-item" onClick={() => handleSelectCategory("sandwich")} >
                        三明治
                      </button>
                    </li>
                    <li>
                      <button class="dropdown-item" onClick={() => handleSelectCategory("desert")} >
                        甜點
                      </button>
                    </li>
                    <li>
                      <button class="dropdown-item" onClick={() => handleSelectCategory("salad")} >
                        沙拉
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="mb-3">
                <label for="formFile" class="form-label">
                  上傳餐點圖片
                </label>
                <input class="form-control" type="file" id="formFile" onChange={() => handleImgFile} />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                取消
              </button>
              <button type="button" class="btn btn-primary" onClick={() => handleCreateMenuItem(name , description , price , category , img)} >
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
