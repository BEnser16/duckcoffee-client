import React, { useState } from "react";
import { Button, Modal, Form, Dropdown, DropdownButton } from "react-bootstrap";
import AxiosInstance from "../../../service/AxiosInstance";

const EditUser = (props) => {
  const [show, setShow] = useState(false);
  const [role, setRole] = useState(props.editUser.role);
  const [editUser, setEditUser] = useState(props.editUser);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleNameInput = (e) => {
    setEditUser((prevUser) => ({
      ...prevUser,
      name: e.target.value,
    }));
  };
  // write function handle email , password, role input
  const handleEmailInput = (e) => {
    setEditUser((prevUser) => ({
      ...prevUser,
      email: e.target.value,
    }));
  };
  const handlePasswordInput = (e) => {
    setEditUser((prevUser) => ({
      ...prevUser,
      password: e.target.value,
    }));
  };
  const handleRoleSelect = (role) => {
    setRole(role);
    setEditUser((prevUser) => ({
      ...prevUser,
      role: role,
    }));
  };

  const handleUpdateUser = () => {
    console.log("update user: ", editUser);
    AxiosInstance.put(`/api/users/${editUser.id}`, editUser).then((res) => {
        console.log("update user res: ", res);
        window.alert("修改使用者成功");
        window.location.reload();
    }).catch((err) => {
        console.error("update user error: ", err);
    });
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        修改
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>修改使用者資料</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>名稱</Form.Label>
              <Form.Control
                type="text"
                placeholder="輸入名稱"
                defaultValue={editUser.name}
                onChange={handleNameInput}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>電子郵件</Form.Label>
              <Form.Control
                type="email"
                placeholder="輸入電子郵件"
                onChange={handleEmailInput}
                defaultValue={editUser.email}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>密碼</Form.Label>
              <Form.Control
                type="password"
                placeholder="輸入密碼"
                onChange={handlePasswordInput}
                defaultValue={editUser.password}
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
          <Button variant="success" onClick={() => handleUpdateUser()}>
            完成
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditUser;
