import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav
        class="navbar navbar-expand-lg bg-body-tertiary bg-primary my-2"
        data-bs-theme="light"
      >
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            DUCK COFFEE
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
                  來點餐吧
                </a>
              </li>
              
            </ul>

            <a href="/login" class="btn btn-success" type="submit">
              會員登入
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
