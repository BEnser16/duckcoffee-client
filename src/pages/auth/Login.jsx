import React from "react";
import { useState } from "react";
import  {AuthService}  from "../../service/AuthService";
import { useDispatch } from "react-redux";
import { login } from "../../slice/userSlice";
import TextToast from "../../utils/TextToast";




const Login = () => {
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [showToast , setShowToast] = useState();
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
      console.log("send login request.");
      console.log("login response: " , res.data);
      console.log("res email" , res.data.email);
      
      const login_userObj = {
        user_name:res.data.email,
        user_token:res.data.token,
        user_email:res.data.email
      }

      const login_user_jsonstr = JSON.stringify(login_userObj);
      localStorage.setItem("user-info" , login_user_jsonstr);
      console.log("set localstorage item user-info: " , login_user_jsonstr);
      dispatch(login());
      setShowToast(true);
      


      if(email === 'admin@gmail.com') {
        window.location.href = "http://localhost:3000/admin";
      } else {
        window.location.href = "http://localhost:3000/";
      }



    }).catch((err) =>{
      console.error("send login request error.");
      console.log("error log: " + err);
    })


  }


  return (
    <div className="container">
      <TextToast message={"登入成功！"} show={showToast} />
      <div className="row mt-5">
        <div className="col-6 mx-auto">
          <div class="mb-3 row">
            <div className="row mb-3">
              <h2>歡迎登入</h2>
            </div>
            <label for="staticEmail" class="col-sm-2 col-form-label">
              帳號
            </label>
            <div class="col-sm-10">
              <input type="email" class="form-control" id="inputEmail" value={email} onChange={handleEmailChange} />
            </div>
          </div>
          <div class="mb-3 row">
            <label for="inputPassword" class="col-sm-2 col-form-label">
              密碼
            </label>
            <div class="col-sm-10">
              <input type="password" class="form-control" id="inputPassword" value={password} onChange={handlePasswordChange} />
            </div>
          </div>
          
          <div className="d-flex justify-content-end align-items-center my-4">
            <a href="/register" >還沒有帳號嗎？ 註冊去！</a>

            <button className="btn btn-primary mx-4" onClick={handleLoginSubmit} >登入</button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
