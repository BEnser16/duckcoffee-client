import React from "react";

const Login = () => {
  return (
    <div className="container">
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
              <input type="email" class="form-control" id="staticEmail" />
            </div>
          </div>
          <div class="mb-3 row">
            <label for="inputPassword" class="col-sm-2 col-form-label">
              密碼
            </label>
            <div class="col-sm-10">
              <input type="password" class="form-control" id="inputPassword" />
            </div>
          </div>
          
          <div className="d-flex justify-content-end align-items-center my-4">
            <a href="/register" >還沒有帳號嗎？ 註冊去！</a>

            <button className="btn btn-primary mx-4">登入</button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
