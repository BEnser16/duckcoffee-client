import React from "react";
import BaseUrl from "../../service/BaseUrl";
import { AuthService } from "../../service/AuthService";
import { useToast } from "../../utils/ToastManager";

const Register = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [surePassword, setSurePassword] = React.useState("");
  const toast = useToast();

  const handleRegister = () => {
    if (password !== surePassword) {
      alert("密碼不一致");
      return;
    }

    const newUser = {
      name:username,
      email:email,
      password:password,
      role:"member",
      img:`${BaseUrl}/img/defaultAvatar.jpg`
    }

    AuthService.register(newUser).then((res) => {
      console.log("register response: " + JSON.stringify(res.data));
      toast.addToast("註冊成功! 3秒後回到登入頁", "success");
      setTimeout(function() {
        window.location.href = '/login';
      }, 3000);
    }).catch((err) => {
      console.error("register error.");
      console.log("error log: " + err);
    });
  }

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="row col-6">
        <div className="mb-3 row">
          <div className="row mb-3">
            <h2>歡迎註冊</h2>
          </div>
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
            用戶名稱
          </label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="userName" onChange={(e) => {
              setUsername(e.target.value);            
            }} />
          </div>
          
        </div>
        <div className="mb-3 row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
            電子郵件
          </label>
          <div className="col-sm-10">
            <input type="email" className="form-control" id="staticEmail" onChange={(e) => {
              setEmail(e.target.value);            
            }} />
          </div>
          
        </div>
        <div className="mb-3 row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            密碼
          </label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="inputPassword" onChange={(e) => {
              setPassword(e.target.value);            
            }}/>
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="surePassword" className="col-sm-2 col-form-label">
            確認密碼
          </label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="surePassword" onChange={(e) => {
              setSurePassword(e.target.value);            
            }} />
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-center my-4">
          <button className="btn btn-primary btn-md" onClick={() => handleRegister()} >註冊</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
