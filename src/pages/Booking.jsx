import React from "react";
import { Container, Row, Col, Form, Dropdown, Button } from "react-bootstrap";
import axios from "axios";

const Booking = () => {
  const [people, setPeople] = React.useState(0);
  const [bookingDate, setBookingDate] = React.useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = React.useState([]);

  const handleDateChange = (event) => {
    setBookingDate(event.target.value);
  };

  const handleSearchTimeSlots = (bookingDate, peoples) => {
    axios.post("http://localhost:8080/api/query-available-reservations", null, {
      params: {
        bookingDate: bookingDate,
        peoples: peoples,
      },
    }).then((res) => {
      console.log(res);
      setAvailableTimeSlots(res.data);
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
            <Col className="col-md-2" >
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {people === 0 ? "選擇人數" : people + " 位"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {[1, 2, 3, 4].map((num) => (
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
              <Button variant="success" onClick={() => handleSearchTimeSlots(bookingDate , people)} >查詢</Button>
            </Col>
          </Row>
          
            <h5 className="my-5" >目前空餘時段</h5>
            {availableTimeSlots.map((timeSlot) => (
              <Button variant="secondary" className="m-2">{timeSlot} </Button>
            ))}
            
          
        </Form>
      </Container>
    </>
  );
};

export default Booking;
