import React , {useEffect , useState} from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import IncomeChart from "./IncomeChart";
import { OrderFormService } from "../../service/OrderFormService";
import axios from "axios";
import BaseUrl from "../../service/BaseUrl";


const AdminDashboard = () => {
  const [totalSales , setTotalSales] = useState(0);
  const [totalOrderForm , setTotalOrderForm] = useState(0);
  const [totalMember , setTotalMember] = useState(0);

  useEffect(() => {
    OrderFormService.getAllOrderForm().then((res) => {
      console.log("get all order form response: " + JSON.stringify(res.data));
      let total = 0;
      res.data._embedded.orderForms.forEach((order) => {
        total += order.total_price;
      });
      setTotalSales(total);
      setTotalOrderForm(res.data._embedded.orderForms.length);
    }).catch((err) => {
      console.error("get all order form error.");
      console.log("error log: " + err);
    });

    axios.get(`${BaseUrl}/api/users`).then((res) => {
      console.log("get all member response: " + JSON.stringify(res.data));
      let members = [];
      res.data._embedded.users.forEach((user) => {
        if(user.role === "member") {
          members.push(user);
        }
      });
      setTotalMember(members.length);
    }).catch((err) => {
      console.error("get all member error.");
      console.log("error log: " + err);
    });

    

  }, []);


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
                  {totalSales}元
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>訂單數量</Card.Title>
                <Card.Text>
                  {totalOrderForm}筆
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>會員數量</Card.Title>
                <Card.Text>
                  {totalMember}人
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
