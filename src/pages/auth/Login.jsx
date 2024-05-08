import React from "react";
import { useState } from "react";
import  {AuthService}  from "../../service/AuthService";
import { useDispatch } from "react-redux";
import { login } from "../../slice/userSlice";
import BaseUrl from "../../service/BaseUrl";
import axios from "axios";
import { useToast } from "../../utils/ToastManager";


const Login = () => {
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const toast = useToast();  
  const dispatch = useDispatch();

  const handleEmailChange = event => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  }

  async function handleLoginSubmit(e) {
    e.preventDefault();
    AuthService.login(email , password).then((res) => {
      console.log("login response: " + JSON.stringify((res.data)));
      // 拿圖片
      axios.get(`${BaseUrl}/api/auth/member/get-by-email?email=${res.data.email}`).then((res) => {
        console.log("get user info by email: " + JSON.stringify(res.data));
        const userObj = {
          user_name:res.data.email,
          user_token:res.data.token,
          user_email:res.data.email,
          imageUrl:res.data.img
        }
        dispatch(login(userObj));
      }).catch((err) => {
        console.error("get user info by email error.");
        console.log("error log: " + err);
      })

      // const login_userObj = {
      //   user_name:res.data.email,
      //   user_token:res.data.token,
      //   user_email:res.data.email
      // }

      // dispatch(login(login_userObj));
      toast.addToast("登入成功! 3秒後回到首頁", "success");

      // 延遲 3 秒後重定向到首頁
      setTimeout(function() {
        window.location.href = '/';
      }, 3000); 

    }).catch((err) =>{
      console.error("send login request error.");
      console.log("error log: " + err);
    })


  }


  return (
    <div className="container d-flex justify-content-center align-items-center" style={{minHeight:"80vh"}} >
        <div className="col-6">
          <div className="mb-3 row">
            <div className="row mb-3">
              <h2>歡迎登入</h2>
            </div>
            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
              帳號
            </label>
            <div className="col-sm-10">
              <input type="email" className="form-control" id="inputEmail" value={email} onChange={handleEmailChange} />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
              密碼
            </label>
            <div className="col-sm-10">
              <input type="password" className="form-control" id="inputPassword" value={password} onChange={handlePasswordChange} />
            </div>
          </div>
          
          <div className="d-flex justify-content-end align-items-center my-4">
            <a href="/register" >還沒有帳號嗎？ 註冊去！</a>

            <button className="btn btn-primary mx-4" onClick={handleLoginSubmit} >登入</button>
          </div>
          
        </div>
      </div>
  );
};

export default Login;
