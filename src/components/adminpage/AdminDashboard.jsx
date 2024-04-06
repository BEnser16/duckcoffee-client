import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import IncomeChart from "./IncomeChart";

const AdminDashboard = () => {
  return (
    <>
      <Container fluid className="mt-3">
        <Row title="title-head" >
          <h1>歡迎光臨</h1>
        </Row>
        <Row title="shop-info" className="mt-3">
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>銷售總額</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>訂單數量</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>會員數量</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row title="income-chart" className="mt-5">
          <h3>營收趨勢</h3>
          <Col className="mt-3" >
            
            <Card style={{width:"30rem"}}>
              <Card.Body>
                <Card.Title>營收趨勢圖</Card.Title>
                <IncomeChart/>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminDashboard;
