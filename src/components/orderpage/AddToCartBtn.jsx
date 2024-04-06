import React from "react";
import { Modal, Button, Dropdown, Form } from "react-bootstrap";
import { useState } from "react";

const AddToCartBtn = (props) => {
  let cart = props.cart;
  let setCart = props.setCart;
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [sugar, setSugar] = useState("正常");
  const [ice, setIce] = useState("正常");
  const [mark, setMark] = useState("");

  function handleAddToCart(item) {
    try {
      if (item.menuItem.category !== "coffee") {
        item.ice = "";
        item.sugar = "";
      }
      let newCart = [...cart];

      newCart.push(item);
      setCart(newCart);
      window.alert("已加入購物車");
      setShow(false);
    } catch (err) {
      window.alert(err);
    }
  }

  const handleInputQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const handleSelectIce = (ice) => {
    setIce(ice);
  };

  const handleSelectSugar = (sugar) => {
    setSugar(sugar);
  };

  const handleInputMark = (e) => {
    setMark(e.target.value);
  };

  return (
    <>
      <button
        className="btn btn-primary mx-3"
        onClick={() => {
          setShow(true);
        }}
      >
        加入購物車
      </button>

      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.item.name}</Modal.Title>
        </Modal.Header>
        {props.item.category === "coffee" ? (
          <Modal.Body>
            <b>數量</b>
            <Button
              className="mx-4"
              size="md"
              onClick={() => {
                setQuantity(quantity + 1);
              }}
            >
              +
            </Button>
            <input
              className="mx-4"
              type="text"
              value={quantity}
              onChange={handleInputQuantity}
            />
            <Button
              size="md"
              onClick={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                }
              }}
            >
              -{" "}
            </Button>
            <div className="d-flex mt-2">
              <b>選擇冰度</b>
              <Dropdown className="mx-4">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {ice}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    href="#/action-1"
                    onClick={() => handleSelectIce("去冰")}
                  >
                    去冰
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-2"
                    onClick={() => handleSelectIce("少冰")}
                  >
                    少冰
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    onClick={() => handleSelectIce("正常")}
                  >
                    正常
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="d-flex mt-2">
              <b>選擇甜度</b>
              <Dropdown className="mx-4">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {sugar}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    href="#/action-1"
                    onClick={() => handleSelectSugar("無糖")}
                  >
                    無糖
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-2"
                    onClick={() => handleSelectSugar("微糖")}
                  >
                    微糖
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    onClick={() => handleSelectSugar("少糖")}
                  >
                    少糖
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    onClick={() => handleSelectSugar("半糖")}
                  >
                    半糖
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    onClick={() => handleSelectSugar("正常")}
                  >
                    正常
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    onClick={() => handleSelectSugar("全糖")}
                  >
                    全糖
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <Form.Label>備註</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={mark}
              onChange={handleInputMark}
            />
          </Modal.Body>
        ) : (
          <Modal.Body>
            <b>數量</b>
            <Button
              className="mx-4"
              size="md"
              onClick={() => {
                setQuantity(quantity + 1);
              }}
            >
              +
            </Button>
            <input
              className="mx-4"
              type="text"
              value={quantity}
              onChange={handleInputQuantity}
            />
            <Button
              size="md"
              onClick={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                }
              }}
            >
              -{" "}
            </Button>
            <div>
              <Form.Label>備註</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={mark}
                onChange={handleInputMark}
              />
            </div>
          </Modal.Body>
        )}

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShow(false);
            }}
          >
            取消
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              
              handleAddToCart({
                menuItem: props.item,
                quantity: quantity,
                sugar: sugar,
                ice: ice,
                mark: mark,
              });
            }}
          >
            加入
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddToCartBtn;
