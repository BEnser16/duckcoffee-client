import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { AuthService } from "../../service/AuthService";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    AuthService.login(email, password).then((res) => {
        console.log(res);
        localStorage.setItem("user-info", JSON.stringify(res.data));
        window.location.href = "/admin/dashboard";
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <Container
      style={{
        backgroundColor: "#BF8563",
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container className="p-5 col-md-4" style={{backgroundColor:"white" , borderRadius:15}} >
        <h1>DuckCoffee Admin</h1>
        <Form onSubmit={handleLogin} >
          <Form.Group controlId="email" className="mt-3" >
            <Form.Label>帳號</Form.Label>
            <Form.Control
              type="email"
              placeholder="輸入帳號"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password" className="my-3">
            <Form.Label>密碼</Form.Label>
            <Form.Control
              type="password"
              placeholder="輸入密碼"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-2" >
            登入
          </Button>
          <Button variant="info" href="/" type="submit" className="w-100 mt-3" >
            回到官網
          </Button>
        </Form>
      </Container>
    </Container>
  );
};

export default AdminLogin;
