import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ReservationService } from "../../../service/ReservationService";


const DeleteBookingBtn = (props) => {
    let href = props.href;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteBooking = () => {
    ReservationService.delete(href)
      .then((response) => {
        console.log(response);
        window.alert("刪除成功");
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      <Button variant="danger" className="ms-2" onClick={handleShow}>
        刪除
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>刪除訂位</Modal.Title>
        </Modal.Header>
        <Modal.Body>確定刪除此訂位？</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            取消
          </Button>
          <Button variant="danger" onClick={() => deleteBooking()}>
            確定
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteBookingBtn;
