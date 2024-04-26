import React from "react";

const Register = () => {
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
            帳號
          </label>
          <div className="col-sm-10">
            <input type="email" className="form-control" id="staticEmail" />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            密碼
          </label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="inputPassword" />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="surePassword" className="col-sm-2 col-form-label">
            確認密碼
          </label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="surePassword" />
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-center my-4">
          <button className="btn btn-primary btn-md">註冊</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
