import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { OrderFormService } from "../../service/OrderFormService";

const SendOrderBtn = (props) => {
  let cart = props.cart;
  let tablenum = props.tablenum;
  
  
    const [orderform_id , setOrderform_id] = useState(null);
  const [rescheckoutdata , setRescheckoutdata] = useState({});
  const [show, setShow] = useState(false);
  const [showCounterCheckout, setShowCounterCheckout] = useState(false);

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
    console.log("create_time: ", create_time , "tablenum: ", tablenum , "total_price: ", total_price);
    OrderFormService.createOrderForm(
        create_time
      ,
      create_time,
      tablenum,
      total_price
    )
      .then((res) => {
        console.log("post order form res: ", res);
        const selfLink = res.data._links.self.href;
        if (selfLink) {
            setOrderform_id(selfLink.split('/').pop());
            console.log("Created order form ID:", orderform_id);
        }
        console.log("res data: ", res.data);
        console.log("orderform id: ", orderform_id);
        setRescheckoutdata(res.data);
        
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
          <h5>選擇付款方式</h5>
          <div className="my-5 d-flex col-12">

            <Button
                size="lg"
                variant="info"
                className="mx-2 p-5"
                onClick={() => {
                    handleSendCounterCheckout().then(() => {
                        setShowCounterCheckout(true);
                        setShow(false);
                        
                    }).catch((err) => {
                        console.log(err);
                    });
                }}
                >
                櫃檯結帳
            </Button>
            <Button size="lg" className="p-5" variant="warning">線上結帳</Button>
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
          <h5>訂單編號:{orderform_id}</h5>
          <h5>訂單桌號:{tablenum}</h5>
          <h5>訂單時間:{rescheckoutdata.create_time}</h5>
          <h5>訂單總金額:{rescheckoutdata.total_price}</h5>
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
