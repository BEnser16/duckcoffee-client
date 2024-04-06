import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

const RoleControl = () => {
  const [allusers, setAllusers] = React.useState([]);

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

  return (
    <>
      
      <div className="container">
        <h3 className="my-4" >權限控制</h3>
        <Button variant="success" >新增使用者</Button>
        <div className="row mt-3">
          <div className="col-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">使用者名稱</th>
                  <th scope="col">使用者郵件</th>
                  <th scope="col">使用者角色</th>
                  <th scope="col">操作</th>
                </tr>
              </thead>
              <tbody>
                {allusers.map((user) => {
                  return (
                    <tr>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <button className="btn btn-primary me-2">修改</button>
                        <button className="btn btn-danger">刪除</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoleControl;
