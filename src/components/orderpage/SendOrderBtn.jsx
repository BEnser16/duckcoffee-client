import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { OrderFormService } from "../../service/OrderFormService";
import { OrderItemService } from "../../service/OrderItemService";
import { useDispatch } from 'react-redux';
import { setNewOrder } from "../../slice/newOrderSlice";



const SendOrderBtn = (props) => {
  let cart = props.cart;
  let tablenum = props.tablenum;

  const [orderformId, setOrderformId] = useState(0); // response order form id
  const [rescheckoutdata, setRescheckoutdata] = useState({});
  const [show, setShow] = useState(false);
  const [showCounterCheckout, setShowCounterCheckout] = useState(false);

  // dispatch
  const dispatch = useDispatch();

  // 計算總價
  const getTotalPrice = () => {
    let total_price = 0;
    cart.forEach((item) => {
      total_price = total_price + item.menuItem.price * item.quantity;
    });

    return total_price;
  };


  async function handleSendCounterCheckout() {
    let total_price = getTotalPrice();
    let now = new Date();
    let create_time = now.toISOString();
    let responseOrderformId = 0;

    // create order form
    OrderFormService.createOrderForm(
      create_time,
      "inQueue",
      create_time,
      tablenum,
      total_price
    )
      .then((res) => {
        const selfLink = res.data._links.self.href;
        if (selfLink) {
          let resOrderform_id = selfLink.split("/").pop();
          console.log("resOrderform_id: ", resOrderform_id);
          responseOrderformId = Number(resOrderform_id);
          setOrderformId(responseOrderformId);
          console.log(
            "Created order form ID response ID:",
            responseOrderformId
          );
        }

        // set order form state to redux store
        dispatch(setNewOrder());

        setRescheckoutdata(res.data);

        // 將購物車物件整理為 order item 物件 送出 request
        cart.forEach((item) => {
          const menuItemHref = item.menuItem._links.self.href;
          const menuItemId = Number(menuItemHref.split("/").pop());
          console.log(
            "cart parse forEach menu item id , response orderform id: ",
            menuItemId,
            responseOrderformId
          );
          item.orderForm = {
            id: responseOrderformId,
          };
          item.menuItem.id = menuItemId;
        });

        console.log("parsed order items : ", cart);

        // create order item
        OrderItemService.createOrderItems(cart)
          .then((res) => {
            console.log("post create order items res: ", res);
          })
          .catch((err) => {
            console.log("post create order items error: ", err);
          });
      })
      .catch((err) => {
        console.log("post order form error: ", err);
        window.alert(err);
      });
  }

  return (
    <>
      <Button
        variant="success"
        onClick={() => {
          setShow(true);
        }}
      >
        送出訂單
      </Button>

      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>訂單資訊</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>選擇付款方式</h6>
          <div className="my-5 d-flex col-12">
            <Button
              size="lg"
              variant="info"
              className="mx-2 p-5"
              onClick={() => {
                handleSendCounterCheckout()
                  .then(() => {
                    setShowCounterCheckout(true);
                    setShow(false);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              櫃檯結帳
            </Button>
            <Button size="lg" className="p-5" variant="warning">
              線上結帳
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* 櫃檯結帳的popup  */}
      <Modal
        show={showCounterCheckout}
        onHide={() => {
          setShowCounterCheckout(false);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>訂單資訊</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>訂單已送出!</h5>
          <h6>訂單編號:{orderformId}</h6>
          <h6>訂單桌號:{tablenum}</h6>
          <h6>訂單時間:{rescheckoutdata.create_time}</h6>
          <h6>訂單總金額:{rescheckoutdata.total_price}</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowCounterCheckout(false);
            }}
          >
            取消
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShowCounterCheckout(false);
              window.location.href = "/";
            }}
          >
            完成
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SendOrderBtn;
