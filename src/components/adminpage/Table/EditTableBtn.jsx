import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TableService } from "../../../service/TableService";

const EditTableBtn = (props) => {
    const [editTable, setEditTable] = useState(props.editTable); // [tableNumber, tableSeat
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const handleSeatInput = (e) => {
    setEditTable({ ...editTable, seat: e.target.value });
  }

  const updateTable = () => {
    TableService.updateTableSeat(editTable._links.self.href, editTable).then((res) => {
        console.log("update table seat res: ", res);
        window.alert("update table seat success.");
        window.location.reload();
    }).catch((err) => {
        console.warn("update table seat error: ", err);
    });
  }

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        編輯
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>編輯桌位{editTable.tableNumber}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="bookingDate" className="form-label">
                人數
              </label>
              <input
                type="text"
                className="form-control"
                id="tableseat"
                defaultValue={editTable.seat}
                onChange={handleSeatInput}
                required
              />
            </div>
            
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            取消
          </Button>
          <Button variant="primary" onClick={() => updateTable()}>
            更新
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditTableBtn;
