import React , {useState} from "react";
import axios from "axios";
import { AddUser } from "./Role/AddUser";
import AxiosInstance from "../../service/AxiosInstance";
import { Modal , Button } from "react-bootstrap";
import EditUser from "./Role/EditUser";

const RoleControl = () => {
  const [allusers, setAllusers] = React.useState([]);
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  React.useEffect(() => {
    axios
      .get("http://localhost:8080/api/users")
      .then((res) => {
        console.log(res.data);
        setAllusers(res.data._embedded.users);
      })
      .catch((err) => {
        console.error("get all users error.");
        console.log("error log: " + err);
      });
  }, []);

  const handleDelete = (id) => {
    AxiosInstance.delete(`/api/users/${id}`).then((res) => {
      console.log("delete user res: ", res);
      window.alert("刪除使用者成功");
      window.location.reload();
    }).catch((err) => {
      console.error("delete user error: ", err);
    });
  }

  return (
    <>
      
      <div className="container">
        <h3 className="my-4" >權限控制</h3>
        <AddUser />
        <div className="row mt-3">
          <div className="col-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">使用者名稱</th>
                  <th scope="col">使用者郵件</th>
                  <th scope="col">權限</th>
                  <th scope="col">操作</th>
                </tr>
              </thead>
              <tbody>
                {allusers.map((user , index) => {
                  return (
                    <tr key={index} >
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <EditUser editUser={user} />
                        <button className="btn btn-danger ms-2" onClick={
                          () => {
                            handleShow();
                            setDeleteId(user.id);
                          }
                        } >刪除</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} centered >
        <Modal.Header closeButton>
          <Modal.Title>刪除使用者</Modal.Title>
        </Modal.Header>
        <Modal.Body>確定要刪除此帳號嗎？</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            取消
          </Button>
          <Button variant="danger" onClick={() => handleDelete(deleteId)}>
            刪除
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RoleControl;
