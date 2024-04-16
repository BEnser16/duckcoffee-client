import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AxiosInstance from "../../../service/AxiosInstance";

const EditBookingBtn = (props) => {
  const [editReservation, setEditReservation] = useState(props.editReservation); // [1
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {setShow(true)
    console.log("props send editReservation: ", editReservation);
  }

  const handleDateInput = (e) => {
    setEditReservation({ ...editReservation, bookingDate: e.target.value });
  }

  const handleNameInput = (e) => {
    setEditReservation({ ...editReservation, personName: e.target.value });
  }

  const handlePhoneInput = (e) => {
    setEditReservation({ ...editReservation, personPhone: e.target.value });
  }

  const handleStartTimeInput = (e) => {
    setEditReservation({ ...editReservation, startTime: e.target.value });
  }

  const handleEndTimeInput = (e) => {
    setEditReservation({ ...editReservation, endTime: e.target.value });
  }

  const handleRemarkInput = (e) => {
    setEditReservation({ ...editReservation, remark: e.target.value });
  }

  const updateBooking = () => {
    AxiosInstance.put(editReservation._links.self.href, editReservation)
      .then((response) => {
        console.log(response);
        window.alert("更新成功");
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  }



  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        編輯
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>編輯訂位</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="bookingDate" className="form-label">
                日期
              </label>
              <input
                type="date"
                className="form-control"
                id="bookingDate"
                defaultValue={editReservation.bookingDate}
                onChange={handleDateInput}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="personName" className="form-label">
                姓名
              </label>
              <input
                type="text"
                className="form-control"
                id="personName"
                defaultValue={editReservation.personName}
                onChange={handleNameInput}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="personPhone" className="form-label">
                電話
              </label>
              <input
                type="tel"
                className="form-control"
                id="personPhone"
                defaultValue={editReservation.personPhone}
                onChange={handlePhoneInput}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="startTime" className="form-label">
                開始時間
              </label>
              <input
                type="time"
                className="form-control"
                id="startTime"
                defaultValue={editReservation.startTime}
                onChange={handleStartTimeInput}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="endTime" className="form-label">
                結束時間
              </label>
              <input
                type="time"
                className="form-control"
                id="endTime"
                defaultValue={editReservation.endTime}
                onChange={handleEndTimeInput}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="remark" className="form-label">
                備註
              </label>
              <textarea
                className="form-control"
                id="remark"
                defaultValue={editReservation.remark}
                onChange={handleRemarkInput}
                rows="3"
              ></textarea>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            取消
          </Button>
          <Button variant="primary" onClick={() => updateBooking()}>
            更新
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditBookingBtn;
