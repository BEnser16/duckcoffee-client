import React from "react";
import { Button, Modal, Table , Badge } from "react-bootstrap";
import { useState } from "react";

const CheckCartBtn = (props) => {
  const [show, setShow] = useState(false);
  let cart  = props.cart;
    let setCart = props.setCart;

  return (
    <>
      <Button
        variant="success"
        onClick={() => {
          setShow(true);
        }}
      >
        查看購物車
        <Badge bg="secondary" className="mx-2" >{cart.length}</Badge>
      </Button>

      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title> 購物車 </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table>
            <thead>
              <tr>
                <th>品項</th>
                <th>數量</th>
                <th>價格</th>
                <th>冰度</th>
                <th>甜度</th>
                <th>備註</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => {
                return (
                  <tr>
                    <td>{item.menuItem.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.menuItem.price * item.quantity}</td>
                    <td>{item.ice}</td>
                    <td>{item.sugar}</td>
                    <td>{item.mark}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="danger" onClick={() => {setCart([])}} >
                清空購物車

            </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setShow(false);
            }}
          >
            取消
          </Button>
          <Button variant="primary">結帳</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CheckCartBtn;
