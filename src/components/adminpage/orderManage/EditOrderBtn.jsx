import React from "react";
import { Button, Modal, Table, Dropdown } from "react-bootstrap";
import { useState } from "react";
import { OrderFormService } from "../../../service/OrderFormService";

const EditOrderBtn = (props) => {
  const [show, setShow] = useState(false);
  let { orderForm, setOrderForm } = props;
  const [totalPrice, setTotalPrice] = useState(0);

  React.useEffect(() => {
    const caculateTotalPrice = async () => {
      let totalPrice = 0;
      orderForm.orderItemDetails.forEach((item) => {
        totalPrice += item.menuItemDetails.price * item.quantity;
      });
      return totalPrice;
    };

    const fetchTotalPrice = async () => {
      const price = await caculateTotalPrice();
      setTotalPrice(price);
    };

    fetchTotalPrice();
  }, [orderForm]); // 依賴於orderForm，當orderForm變化時重新計算總價

  const handleUpdateOrder = () => {
    setOrderForm(orderForm);
    OrderFormService.updateOrderFormById(orderForm.orderFormId, orderForm);
  };

  return (
    <>
      <Button className="ms-auto" onClick={() => setShow(true)}>
        編輯
      </Button>

      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        centered
        size="lg"
      >
        <Modal.Header>
          <Modal.Title>編輯訂單</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Table>
              <thead>
                <th>圖片</th>
                <th>品名</th>
                <th>單價</th>
                <th>數量</th>
                <th>冰度</th>
                <th>甜度</th>
                <th>備註</th>
                <th>刪除</th>
              </thead>
              <tbody>
                {orderForm.orderItemDetails.map((item) => {
                  return (
                    <tr>
                      <td>
                        <img
                          src={item.menuItemDetails.img}
                          style={{
                            height: "30px",
                            width: "30px",
                            objectFit: "cover",
                          }}
                          alt="order-item-img"
                        />
                      </td>
                      <td>{item.menuItemDetails.name}</td>
                      <td>${item.menuItemDetails.price}</td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => {
                            item.quantity = e.target.value;
                          }}
                          defaultValue={item.quantity}
                          style={{ width: 40 }}
                        />
                      </td>
                      {item.category === "coffee" ? (
                        <>
                          <td>
                            <Dropdown>
                              <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                              >
                                {item.ice}
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item
                                  href="#/action-1"
                                  onClick={() => {
                                    item.ice = "去冰";
                                  }}
                                >
                                  去冰
                                </Dropdown.Item>
                                <Dropdown.Item
                                  href="#/action-2"
                                  onClick={() => {
                                    item.ice = "少冰";
                                  }}
                                >
                                  少冰
                                </Dropdown.Item>
                                <Dropdown.Item
                                  href="#/action-3"
                                  onClick={() => {
                                    item.ice = "正常";
                                  }}
                                >
                                  正常
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                          <td>
                            <Dropdown>
                              <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                              >
                                {item.sugar}
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item
                                  href="#/action-1"
                                  onClick={() => (item.sugar = "無糖")}
                                >
                                  無糖
                                </Dropdown.Item>
                                <Dropdown.Item
                                  href="#/action-2"
                                  onClick={() => (item.sugar = "微糖")}
                                >
                                  微糖
                                </Dropdown.Item>
                                <Dropdown.Item
                                  href="#/action-3"
                                  onClick={() => (item.sugar = "少糖")}
                                >
                                  少糖
                                </Dropdown.Item>
                                <Dropdown.Item
                                  href="#/action-3"
                                  onClick={() => (item.sugar = "半糖")}
                                >
                                  半糖
                                </Dropdown.Item>
                                <Dropdown.Item
                                  href="#/action-3"
                                  onClick={() => (item.sugar = "正常")}
                                >
                                  正常
                                </Dropdown.Item>
                                <Dropdown.Item
                                  href="#/action-3"
                                  onClick={() => (item.sugar = "全糖")}
                                >
                                  全糖
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </>
                      ) : (
                        <>
                        <td></td>
                        <td></td>
                        </>
                      )}

                      <td>
                        <input
                          type="text"
                          onChange={(e) => {
                            item.remark = e.target.value;
                          }}
                          defaultValue={item.remark}
                        />
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => {
                            console.log("delete item: ", item);

                            const newOrderForm =
                              orderForm.orderItemDetails.filter(
                                (i) => i !== item
                              );
                            setOrderForm(newOrderForm);
                          }}
                        >
                          X
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
              <div className="d-flex">
                <p className="ms-auto me-4">訂單總價: {totalPrice}</p>
              </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShow(false)}> 取消</Button>
          <Button variant="success" onClick={() => handleUpdateOrder()}>
            確認
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditOrderBtn;
