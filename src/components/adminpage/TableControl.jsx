import React from "react";
import { Container, Button, Dropdown, Form, InputGroup } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { TableService } from "../../service/TableService";
import {QRCodeSVG} from 'qrcode.react';
import axios from "axios";

const TableControl = () => {
  const [tableSeats, setTableSeats] = React.useState([]);
  const [people, setPeople] = React.useState(0);
  const [tableNumber, setTableNumber] = React.useState(1);

  React.useEffect(() => {
    TableService.getAllTableSeats()
      .then((res) => {
        setTableSeats(res.data._embedded.tableSeats);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSelectPeople = (num) => {
    setPeople(num);
    console.log("people: ", people);
  };

  const handleAddTable = () => {
    console.log("people state: ", people);
    TableService.createTableSeat(tableNumber , people)
      .then((res) => {
        console.log("create table seat res: ", res);
        window.alert("create table seat success.");
        window.location.reload();
      })
      .catch((err) => {
        console.warn("create table seat error: ", err);
      });
  };

  const deleteTableSeatById = (url) => {
    axios.delete(url)
      .then(response => {
        console.log('Delete response:', response);
        // 处理成功响应
        window.location.reload();
      })
      .catch(error => {
        console.error('Delete error:', error);
        // 处理错误响应
      });
  };

  return (
    <>
      <Container style={{ minHeight: "80vh" }}>
        <h3 className="my-4">桌位管理</h3>
        <div className="mb-4 d-flex">
          
            <div className="col-md-2 me-2">
              <InputGroup >
                <InputGroup.Text id="inputGroup-sizing-default">
                  桌號
                </InputGroup.Text>
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                    type="number"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                />
              </InputGroup>
            
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {people === 0 ? "選擇人數" : people + " 位"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <Dropdown.Item
                  key={num}
                  onClick={() => handleSelectPeople(num)}
                >
                  {num}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="success" className="ms-2" onClick={handleAddTable}>
            新增桌位
          </Button>
        </div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>桌號</th>
              <th>人數</th>
              <th>操作</th>
              <th>點餐 QRCODE</th>
            </tr>
          </thead>
          <tbody>
            {tableSeats.map((table , index) => {
              return (
                <tr key={index}>
                  <td>{table.tableNumber}</td>
                  <td>{table.seat}</td>
                  <td>
                    <Button variant="danger" className="me-2" onClick={() => deleteTableSeatById(table._links.self.href)} >
                      刪除
                    </Button>
                    <Button variant="warning">編輯</Button>
                  </td>
                  <td>
                    <QRCodeSVG value={`http://localhost:3000/order?table-number=${table.tableNumber}`} size={70} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default TableControl;
