import React from "react";
import { useState } from "react";
import { MenuService } from "../../service/MenuService";

const EditMenuItem = (props) => {
  const [name, setName] = useState(props.menuItem.name);
  const [description, setDescription] = useState(props.menuItem.description);
  const [price, setPrice] = useState(props.menuItem.price);
  const [category, setCategory] = useState(props.menuItem.category);
  const [img, setImg] = useState(props.menuItem.img);

  const handleInputName = (e) => {
    setName(e.target.value);
  };

  const handleInputDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleInputPrice = (e) => {
    setPrice(e.target.value);
  };

  const handleSelectCategory = (category) => {
    setCategory(category);
  };

  const handleImgFile = (e) => {
    const img_file = e.target.files[0];
    setImg(img_file);
  };

  const handleEditMenuItem = (name , description , img , price , category) => {
    console.log("item : " , props.menuItem.name);
    MenuService.updateMenuItemById(props.itemId ,  name , description , img , price , category ).then((res) => {
        console.log("patch menu item res: " , res);
    }).catch((err) => {
        console.warn("patch menu item error: " , err);
    });
  }

  return (
    <div>
      <button
        className="btn btn-primary mx-2"
        data-bs-toggle="modal"
        data-bs-target="#editMenuItem"
        onClick={handleEditMenuItem}
      >
        編輯
      </button>

      <div
        className="modal fade"
        id="editMenuItem"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5">編輯餐點品項</h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
                <img className="mb-2" src={props.menuItem.img} alt="edit menu img" style={{maxHeight:"150px" , maxWidth:"400px"}} />
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
                  defaultValue={props.menuItem.price}
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
                      <button
                        class="dropdown-item"
                        onClick={() => handleSelectCategory("coffee")}
                      >
                        咖啡
                      </button>
                    </li>
                    <li>
                      <button
                        class="dropdown-item"
                        onClick={() => handleSelectCategory("sandwich")}
                      >
                        三明治
                      </button>
                    </li>
                    <li>
                      <button
                        class="dropdown-item"
                        onClick={() => handleSelectCategory("desert")}
                      >
                        甜點
                      </button>
                    </li>
                    <li>
                      <button
                        class="dropdown-item"
                        onClick={() => handleSelectCategory("salad")}
                      >
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
              <button type="button" class="btn btn-primary" onClick={() => handleEditMenuItem(
                name , description , img , price , category
              )} >
                完成
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMenuItem;
