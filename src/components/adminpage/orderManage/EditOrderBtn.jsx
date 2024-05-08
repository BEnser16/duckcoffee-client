import React, { useState } from "react";
import { Button, Modal, Table, Dropdown } from "react-bootstrap";
import { OrderItemService } from "../../../service/OrderItemService";
import { useToast } from "../../../utils/ToastManager";
import axios from "axios";

const EditOrderBtn = (props) => {
  const [show, setShow] = useState(false);
  let { orderForm } = props;
  const [editOrderItems, setEditOrderItems] = useState(orderForm.orderItemDetails);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showPending, setShowPending] = useState(false);
  const [ice, setIce] = useState(Array(editOrderItems.length).fill("")); // 冰度狀態陣列
  const [sugar, setSugar] = useState(Array(editOrderItems.length).fill("")); // 甜度狀態陣列
  const deleteItemLinks = [];
  const toast = useToast();

  React.useEffect(() => {
    console.log("orderForm props: ", orderForm);
    const calculateTotalPrice = () => {
      let totalPrice = 0;
      orderForm.orderItemDetails.forEach((item) => {
        totalPrice += item.menuItemDetails.price * item.quantity;
      });
      setTotalPrice(totalPrice);
    };
  
    calculateTotalPrice(); // 計算初始總價
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderForm]);
  

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    editOrderItems.forEach((item) => {
      totalPrice += item.menuItemDetails.price * item.quantity;
    });
    setTotalPrice(totalPrice);
  };

  const handleDeleteItem = (item) => {
    setShowPending(true);
    deleteItemLinks.push(item._links.self.href);
    const newOrderItemDetails = editOrderItems.filter((i) => i !== item);
    setEditOrderItems(newOrderItemDetails);
    calculateTotalPrice(); // 刪除項目後重新計算總價
    setShowPending(false);
  };

  const handleUpdateOrder = () => {
    setShowPending(true);
    console.log("編輯後更新執行中...");

    // 迴圈刪除訂單項
    deleteItemLinks.forEach(async (link) => {
      console.log("delete item link: ", link);
      await OrderItemService.deleteOrderItemByLink(link)
        .then((res) => {
          console.log("delete item: ", res);
          toast.addToast("刪除訂單項成功", "success");
        })
        .catch((err) => {
          console.log("delete item error: ", err);
        });
    });

    // 更新訂單項的內容
    editOrderItems.forEach(async (item) => {
      await OrderItemService.updateOrderItemByLink(item._links.self.href, item)
        .then((res) => {
          console.log("update item by link: ", res);
        })
        .catch((err) => {
          console.log("update item error: ", err);
        });
    });

    // 更新訂單總價
    axios
      .put(orderForm._links.self.href, {
        form_status: orderForm.form_status,
        create_time: orderForm.create_time,
        last_update_time: orderForm.last_update_time,
        table_number: orderForm.table_number,
        total_price: totalPrice,
      })
      .then((res) => {
        console.log("update order form total price: ", res);
      })
      .catch((err) => {
        console.log("update order form total price error: ", err);
      });

    toast.addToast("更新訂單項成功", "success");

    setShowPending(false);
    window.location.reload();
  };

  const handleQuantityChange = (e, item) => {
    const quantity = parseInt(e.target.value);
    item.quantity = quantity;
    setEditOrderItems([...editOrderItems]); // 更新訂單項數據
    calculateTotalPrice(); // 重新計算總價
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
                <tr>
                  <th>圖片</th>
                  <th>品名</th>
                  <th>單價</th>
                  <th>數量</th>
                  <th>冰度</th>
                  <th>甜度</th>
                  <th>備註</th>
                  <th>刪除</th>
                </tr>
              </thead>
              <tbody>
                {showPending && <div>處理中...</div>}

                {!showPending &&
                  editOrderItems.map((item, index) => {
                    return (
                      <tr key={item.menuItemDetails.id}>
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
                            type="number"
                            min="1"
                            onChange={(e) => handleQuantityChange(e, item)}
                            defaultValue={item.quantity}
                            style={{ width: 40 }}
                          />
                        </td>
                        {item.menuItemDetails.category === "coffee" ? (
                          <>
                            <td>
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="success"
                                  id="dropdown-basic"
                                >
                                  {ice[index] === "" ? item.ice : ice[index]}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    href="#/action-1"
                                    onClick={() => {
                                      const newIce = [...sugar];
                                      item.sugar = "正常";
                                      newIce[index] = "去冰";
                                      setIce(newIce);
                                    }}
                                  >
                                    去冰
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    href="#/action-1"
                                    onClick={() => {
                                      const newIce = [...ice];
                                      item.ice = "少冰";
                                      newIce[index] = "少冰";
                                      setIce(newIce);
                                    }}
                                  >
                                    少冰
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    href="#/action-1"
                                    onClick={() => {
                                      const newIce = [...ice];
                                      item.ice = "正常";
                                      newIce[index] = "正常";
                                      setIce(newIce);
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
                                  {sugar[index] === "" ? item.sugar : sugar[index]}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    href="#/action-1"
                                    onClick={() => {
                                      const newSugar = [...sugar];
                                      item.sugar = "無糖";
                                      newSugar[index] = "無糖";
                                      setSugar(newSugar);
                                    }}
                                  >
                                    無糖
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    href="#/action-1"
                                    onClick={() => {
                                      const newSugar = [...sugar];
                                      item.sugar = "微糖";
                                      newSugar[index] = "微糖";
                                      setSugar(newSugar);
                                    }}
                                  >
                                    微糖
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    href="#/action-1"
                                    onClick={() => {
                                      const newSugar = [...sugar];
                                      item.sugar = "半糖";
                                      newSugar[index] = "半糖";
                                      setSugar(newSugar);
                                    }}
                                  >
                                    半糖
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    href="#/action-1"
                                    onClick={() => {
                                      const newSugar = [...sugar];
                                      item.sugar = "正常";
                                      newSugar[index] = "正常";
                                      setSugar(newSugar);
                                    }}
                                  >
                                    正常
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    href="#/action-1"
                                    onClick={() => {
                                      const newSugar = [...sugar];
                                      item.sugar = "全糖";
                                      newSugar[index] = "全糖";
                                      setSugar(newSugar);
                                    }}
                                  >
                                    全糖
                                  </Dropdown.Item>
                                  
                                  
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </>
                        ) : (
                          <>
                            <td>無</td>
                            <td>無</td>
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
                            onClick={() => handleDeleteItem(item)}
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
          <Button
            onClick={() => {
              setShow(false);
              window.location.reload();
            }}
          >
            取消
          </Button>
          <Button variant="success" onClick={() => handleUpdateOrder()}>
            確認
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditOrderBtn;
