import React from "react";
import { useState, useEffect } from "react";
import { OrderFormService } from "../../../service/OrderFormService";
import { Card, Button, Table } from "react-bootstrap";
import { OrderItemService } from "../../../service/OrderItemService";
import { ReturnIDfromUri } from "../../../utils/ReturnIDfromUri";
import MakeSureModal from "../../../utils/MakeSureModal";
import axios from "axios";

const OrderControl = () => {
  const [orderForms, setOrderForms] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [showMakesure, setShowMakesure] = useState(false);
  const [selectDeleteId, setSelectDeleteId] = useState();

  useEffect(() => {
    const parseOrderItemData = async () => {
      try {
        const orderItemsRes = await OrderItemService.getAllOrderItem();
        const orderItemPromises = orderItemsRes.data._embedded.orderItems.map(
          async (item) => {
            const menuItemRes = await axios.get(item._links.menuItem.href);
            const orderFormRes = await axios.get(item._links.orderForm.href);
            return {
              ...item,
              orderFormId: ReturnIDfromUri(orderFormRes.data._links.self.href),
              menuItemDetails: menuItemRes.data,
            };
          }
        );

        const orderItemsWithDetailsFormId = await Promise.all(
          orderItemPromises
        );

        setOrderItems(orderItemsWithDetailsFormId);

        const orderFormsRes = await OrderFormService.getAllOrderForm();
        const orderFormsWithDetails =
          orderFormsRes.data._embedded.orderForms.map((form) => {
            const idbyUri = ReturnIDfromUri(form._links.self.href);
            console.log("orderitem with id: ", orderItemsWithDetailsFormId);
            const orderItemDetails = orderItemsWithDetailsFormId.filter(
              (item) => item.orderFormId === idbyUri
            );
            console.log("orderItemDetails: ", orderItemDetails);
            return {
              ...form,
              orderFormId: idbyUri,
              orderItemDetails: orderItemDetails,
            };
          });
        setOrderForms(orderFormsWithDetails);
      } catch (err) {
        console.warn("err: ", err);
      }
    };

    parseOrderItemData();
  }, []); // 依赖数组为空，表示只在组件挂载时执行

  async function deleteOrderForm(id) {
    try {
      OrderFormService.deleteOrderFormById(id)
        .then((res) => {
          console.log("res: ", res);
        })
        .catch((err) => {
          console.warn("delete orderform by id err: ", err);
        });
    } catch (error) {
      console.warn("delete orderform by id err: ", error);
    }
  }

  async function deleteRelateOrderItems(id) {
    try {
      // delete related orderItems
      orderItems.forEach((item) => {
        if (item.orderItemId === id) {
          OrderItemService.deleteOrderItemById(item.orderItemId)
            .then((res) => {
              console.log("res: ", res);
            })
            .catch((err) => {
              console.warn("err: ", err);
            });
        }
      });
    } catch (err) {
      console.warn("delete relate orderitems err: ", err);
    }
  }

  const handleConfirmDelete = async (id) => {
    await deleteRelateOrderItems(id);
    await deleteOrderForm(id);
    window.location.reload();
  };

  return (
    <>
      <div className="row mx-2 mt-5">
        <h5>訂單序列</h5>
        <div className="mt-3 d-flex flex-wrap ">
          {orderForms.map((form) => {
            return (
              <Card
                className="m-2"
                style={{ minWidth: "18rem", width: "18rem" }}
                border={
                  form.form_status === "inQueue"
                    ? "primary"
                    : "success" || form.form_status === "completed"
                    ? "success"
                    : "danger"
                }
              >
                <Card.Body>
                  <Card.Title>訂單編號: {form.orderFormId}</Card.Title>
                  <Card.Text>
                    <p>訂單狀態: {form.form_status}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </div>
        <h5 className="mt-3">待完成</h5>
        <div className="mt-3 d-flex flex-wrap">
          {orderForms.map((form) => {
            if (form.form_status === "inQueue") {
              return (
                <Card
                  className="m-2"
                  style={{ minWidth: "18rem", width: "18rem" }}
                >
                  <Card.Body>
                    <div className="d-flex align-items-center">
                      <Card.Title>訂單編號: {form.orderFormId} </Card.Title>
                      <Button className="ms-auto">編輯</Button>
                    
                    </div>
                    <p className="mt-2">桌號: {form.table_number}<br/>
                    訂單時間: {form.create_time}</p>
                    <hr />
                    <Table>
                      <tbody>
                        {/* <button
                          onClick={() => {
                            console.log("now form is : ", form);
                          }}
                          >
                          here
                        </button> */}
                        {form.orderItemDetails.map((item) => {
                          return (
                            <tr>
                              <td>
                                <img
                                  src={item.menuItemDetails.img}
                                  style={{ maxHight: "30px", maxWidth: "30px" }}
                                  alt=""
                                />
                              </td>
                              <td>{item.menuItemDetails.name}</td>
                              <td>${item.menuItemDetails.price}</td>
                              <td>{item.quantity}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <div></div>
                        <p className="ms-auto">訂單總價: {form.total_price}</p>
                      </tfoot>
                    </Table>
                  </Card.Body>
                  <Card.Footer>
                    <Button
                      variant="success"
                      className="mx-2"
                      onClick={() => {
                        form.form_status = "completed";
                        OrderFormService.updateOrderFormById(
                          form.orderFormId,
                          form.create_time,
                          "completed",
                          form.create_time,
                          form.table_number,
                          form.total_price
                        )
                          .then((res) => {
                            console.log("res: ", res);
                            window.location.reload();
                          })
                          .catch((err) => {
                            console.warn("err: ", err);
                          });
                      }}
                    >
                      完成
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        setShowMakesure(true);
                        setSelectDeleteId(form.orderFormId);
                      }}
                    >
                      刪除
                    </Button>
                  </Card.Footer>
                </Card>
              );
            } else {
              return <div></div>;
            }
          })}
        </div>
        <h5 className="mt-3">已完成</h5>
      </div>

      <MakeSureModal
        showMakesure={showMakesure}
        setShowMakesure={setShowMakesure}
        onConfirm={() => {
          handleConfirmDelete(selectDeleteId);
        }}
        title={"刪除確認"}
        content={"確定刪除此訂單？"}
      />
    </>
  );
};

export default OrderControl;
