import React from "react";
import { AuthService } from "../service/AuthService";

const Navbar = (props) => {
  let {currentUser , setCurrentUser} = props;

  const handleLogout = () => {
    AuthService.logout();
    window.alert("Logout successfully! now redirect to the home page. ");  
    setCurrentUser(null);
    window.location.href = "http://localhost:3000/";
  };



  return (
    <div>
      <nav
        class="navbar navbar-expand-lg bg-body-tertiary bg-primary my-2"
        data-bs-theme="light"
      >
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            <b>DUCK COFFEE</b>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/">
                  首頁
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/news">
                  最新消息
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/about">
                  關於我們
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/contact">
                  聯絡我們
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/menu">
                  餐點介紹
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/booking">
                  線上訂位
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/order">
                  我要點餐
                </a>
              </li>
            </ul>
            {currentUser && (
              <div className="dropdown-center">
                <button
                  className="btn dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    style={{
                      maxHeight: 50,
                      maxWidth: 50,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="admin avatar"
                  />
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="/user-info">
                      用戶資訊
                    </a>
                  </li>
                  
                  <li>
                    <button class="dropdown-item" onClick={handleLogout} >
                      登出
                    </button>
                    
                  </li>
                </ul>
              </div>
            )}
            {!currentUser && (
              <a href="/login" class="btn btn-success" type="submit">
                會員登入
              </a>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
