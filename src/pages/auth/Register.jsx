import React from 'react'

const Register = () => {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-6 mx-auto">
          <div class="mb-3 row">
            <div className="row mb-3">
              <h2>歡迎註冊</h2>
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
          <div class="mb-3 row">
            <label for="surePassword" class="col-sm-2 col-form-label">
              確認密碼
            </label>
            <div class="col-sm-10">
              <input type="password" class="form-control" id="surePassword" />
            </div>
          </div>
          <div className="d-flex justify-content-end align-items-center my-4">
            <button className="btn btn-primary btn-md">註冊</button>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Register