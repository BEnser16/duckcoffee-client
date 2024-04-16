import React from "react";
import { useState } from "react";
import { Image, Modal, Button } from "react-bootstrap";
import axios from "axios";

const EditMenuItem = (props) => {
  const menuItemLink = props.menuItem._links.self.href;
  const [img, setImg] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [menuItem, setMenuItem] = useState(props.menuItem);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleInputName = (e) => {
    setMenuItem((prevMenuItem) => ({
      ...prevMenuItem,
      name: e.target.value,
    }));
  };

  const handleInputDescription = (e) => {
    setMenuItem((prevMenuItem) => ({
      ...prevMenuItem,
      description: e.target.value,
    }));
  };

  const handleInputPrice = (e) => {
    setMenuItem((prevMenuItem) => ({
      ...prevMenuItem,
      price: e.target.value,
    }));
  };

  const handleSelectCategory = (category) => {
    setMenuItem((prevMenuItem) => ({
      ...prevMenuItem,
      category: category,
    }));
  };

  const handleImgFile = (e) => {
    const img_file = e.target.files[0];
    setImg(img_file);
    setImgUrl(URL.createObjectURL(img_file));
  };

  const editMenuItemComplete = async () => {
    const formData = new FormData();
    formData.append("file", img);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/img/upload",
        formData
      );
      console.log("圖傳到伺服器成功:", response.data);
      setImgUrl(`http://localhost:8080${response.data}`);
      window.alert("圖片上傳成功");
      axios
        .put(menuItemLink, menuItem)
        .then((res) => {
          console.log("edit menu item res: ", res);
          window.alert("MenuItem has been updated.");
          window.location.reload();
        })
        .catch((err) => {
          console.warn("edit menu item error: ", err);
        });
    } catch (error) {
      console.error("圖片上傳失败:", error);
    }
  };

  return (
    <>
      <Button className="btn btn-primary mx-2" onClick={handleShow}>
        編輯
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>編輯餐點品項</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image
            className="mb-2"
            src={menuItem.img}
            alt="edit menu img"
            style={{ maxHeight: "150px", maxWidth: "400px" }}
          />
          <div className="input-group mb-3">
            <span className="input-group-text" id={menuItem.name}>
              餐點名稱
            </span>
            <input
              type="text"
              className="form-control"
              value={menuItem.name}
              onChange={handleInputName}
              placeholder="請輸入餐點名稱"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-manu-description">
              餐點描述
            </span>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="請輸入餐點描述"
              value={menuItem.description}
              onChange={handleInputDescription}
            ></textarea>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-manu-price">
              價格
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="請輸入餐點價格"
              value={menuItem.price}
              onChange={handleInputPrice}
            />

            <div className="dropdown mx-2">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {menuItem.category}
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleSelectCategory("coffee")}
                  >
                    咖啡
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleSelectCategory("sandwich")}
                  >
                    三明治
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleSelectCategory("desert")}
                  >
                    甜點
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleSelectCategory("salad")}
                  >
                    沙拉
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-3">
            {imgUrl !== null && (
              <div
                style={{ width: "100%", height: "200px", overflow: "hidden" }}
              >
                <Image
                  src={imgUrl}
                  alt="upload-img-preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            )}

            <label htmlFor="formFile" className="form-label">
              上傳餐點圖片
            </label>
            <input
              className="form-control"
              type="file"
              id="formFile"
              onChange={handleImgFile}
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            取消
          </Button>
          <Button variant="primary" onClick={() => editMenuItemComplete()}>
            完成
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditMenuItem;
