import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Dropdown,
  Button,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import { Search } from "react-bootstrap-icons";
import { useToast } from "../utils/ToastManager";

const Booking = () => {
  const [people, setPeople] = React.useState(0);
  const [bookingDate, setBookingDate] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [remark, setRemark] = React.useState("");
  const [personName, setPersonName] = React.useState("");
  const [personPhone, setPersonPhone] = React.useState("");
  const [assignTableId, setAssignTableId] = React.useState(0);
  const [availableTimeSlots, setAvailableTimeSlots] = React.useState([]);
  const [modalshow, setModalShow] = React.useState(false);
  const toast = useToast();  
  

  const handleClose = () => setModalShow(false);
  const handleShow = () => {
    setModalShow(true);
    const initialStartTime = availableTimeSlots[0].substring(0, 5);
    const initialEndTime = availableTimeSlots[0].substring(8, 13);
    setStartTime(initialStartTime);
    setEndTime(initialEndTime);
  
    // Call the API after the state has been updated
    setTimeout(() => {
      getAssignTableId(bookingDate, initialStartTime, people);
    }, 0); // setTimeout is a quick fix, but consider using useEffect for a more robust solution
  };
  

  const handleDateChange = (event) => {
    setBookingDate(event.target.value);
  };

  const handleSearchTimeSlots = (bookingDate, peoples) => {
    axios
      .post("http://localhost:8080/api/query-available-reservations", null, {
        params: {
          bookingDate: bookingDate,
          peoples: peoples,
        },
      })
      .then((res) => {
        console.log(res);
        let timeSlots = res.data;
        const timeSlotFormated = [];
        timeSlots.forEach((timeSlot, index) => {
          if (index < timeSlots.length - 1) {
            timeSlotFormated.push(
              `${timeSlot.substring(0, 5)} - ${timeSlots[index + 1].substring(
                0,
                5
              )}`
            );
          }
        });

        setAvailableTimeSlots(timeSlotFormated);
        toast.addToast("查詢成功!", "success");
      })
      .catch((err) => {
        console.log(err);
        toast.addToast("查詢失敗!", "error");
      });
  };

  const getAssignTableId = (bookingDate, startTime, peoples) => {
    // Ensure this function is called after state updates have taken effect
    axios.post("http://localhost:8080/api/assign-table", {
      bookingDate,
      startTime,
      peoples,
    })
    .then((res) => {
      console.log(res);
      setAssignTableId(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  };
  

  const handleBooking = (assignTableId , bookingDate , personName , personPhone
    ,startTime , endTime , remark) => {
      let assignTableUri = "";
      axios.get(`http://localhost:8080/api/tableSeats/${assignTableId}`).then((res) => {
        assignTableUri = res.data._links.self.href;
        axios.post("http://localhost:8080/api/reservations" , { bookingDate: bookingDate , personName: personName ,
         personPhone: personPhone , startTime: startTime , endTime: endTime , remark: remark , 
         tableSeat: assignTableUri}).then((res) => {
          console.log(res);
        }).catch((err) => {
          console.log(err);
        });

      }).catch((err) => {
        console.log(err);
      });

  };

  return (
    <>
      <Container style={{ minHeight: "80vh" }}>
        <h3 className="my-4">我要訂位</h3>

        <Form className="m-2">
          <Row>
            <Form.Label className="my-4">
              <h5>選擇訂位人數與時段</h5>
            </Form.Label>
            <Col >
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {people === 0 ? "選擇人數" : people + " 位"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {[1, 2, 3, 4 , 5 ,6].map((num) => (
                    <Dropdown.Item key={num} onClick={() => setPeople(num)}>
                      {num} 位
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col>
              <Form.Label>選擇用餐日期</Form.Label>
              <input
                type="date"
                name="inputBookDate"
                className="mx-2"
                onChange={handleDateChange}
              />
            </Col>
            <Col>
              <Button
                variant="success"
                onClick={() => handleSearchTimeSlots(bookingDate, people)}
                className="d-flex align-items-center"
              >
                <Search className="me-2" />
                查詢
              </Button>
            </Col>
          </Row>

          <h5 className="my-5">目前空餘時段</h5>
          {availableTimeSlots.map((timeSlot) => (
            <Button variant="secondary" className="m-2" onClick={handleShow} >
              {timeSlot}{" "}
            </Button>
          ))}
        </Form>
        <Modal show={modalshow} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>填寫您的聯絡資訊</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>姓名</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="輸入您的姓名"
                  autoFocus
                  onChange={(e) => setPersonName(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>電話</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="輸入您的電話"
                  onChange={(e) => setPersonPhone(e.target.value)}
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>備註</Form.Label>
                <Form.Control as="textarea" onChange={(e) => setRemark(e.target.value)} rows={3} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              取消
            </Button>
            <Button variant="primary" onClick={() => handleBooking(assignTableId , bookingDate , personName,
              personPhone , startTime , endTime , remark)}>
              送出訂位
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default Booking;
