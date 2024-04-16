import React, { useState } from "react";
import { Button, Modal, Form, Dropdown, DropdownButton } from "react-bootstrap";
import AxiosInstance from "../../../service/AxiosInstance";

export const AddUser = () => {
  const [show, setShow] = useState(false);
  const [role, setRole] = useState("選擇權限");
  const [newUser, setNewUser] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleNameInput = (e) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      name: e.target.value,
    }));
  };
  // write function handle email , password, role input
  const handleEmailInput = (e) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      email: e.target.value,
    }));
  };
  const handlePasswordInput = (e) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      password: e.target.value,
    }));
  };
  const handleRoleSelect = (role) => {
    setRole(role);
    setNewUser((prevUser) => ({
      ...prevUser,
      role: role,
    }));
  };

  const handleNewUser = () => {
    console.log("add new user: ", newUser);
    AxiosInstance.post("/api/users", newUser)
      .then((res) => {
        console.log("add new user res: ", res);
        window.alert("新增使用者成功");
        window.location.reload();
      })
      .catch((err) => {
        console.error("add new user error: ", err);
      });
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        新增使用者
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>新增使用者</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>名稱</Form.Label>
              <Form.Control
                type="text"
                placeholder="輸入名稱"
                onChange={handleNameInput}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>電子郵件</Form.Label>
              <Form.Control
                type="email"
                placeholder="輸入電子郵件"
                onChange={handleEmailInput}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>密碼</Form.Label>
              <Form.Control
                type="password"
                placeholder="輸入密碼"
                onChange={handlePasswordInput}
              />
            </Form.Group>
            <Form.Group className="mb-3 d-flex" controlId="formBasicCheckbox">
              <Form.Label>權限</Form.Label>
              <DropdownButton
                className="ms-auto"
                id="dropdown-basic-button"
                title={
                  role === "member"
                    ? "會員"
                    : role === "admin"
                    ? "管理員"
                    : role === "root"
                    ? "超級管理員"
                    : "選擇權限"
                }
              >
                <Dropdown.Item
                  href="#/action-1"
                  onClick={() => handleRoleSelect("member")}
                >
                  會員
                </Dropdown.Item>
                <Dropdown.Item
                  href="#/action-2"
                  onClick={() => handleRoleSelect("admin")}
                >
                  管理員
                </Dropdown.Item>
                <Dropdown.Item
                  href="#/action-3"
                  onClick={() => handleRoleSelect("root")}
                >
                  超級管理員
                </Dropdown.Item>
              </DropdownButton>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            取消
          </Button>
          <Button variant="success" onClick={() => handleNewUser()}>
            完成
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
