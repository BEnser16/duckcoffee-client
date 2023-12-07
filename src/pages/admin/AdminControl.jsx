import React from "react";
import { useState } from "react";
import CoffeeMenu from "../../components/menupage/CoffeeMenu";

const AdminControl = () => {
  function handleManageMode(selectMode) {
    setMode(selectMode);
  }

  const [mode, setMode] = useState("");

  return (
    <div>
      <div className="container">
        <h2>welcome to admin page</h2>

        <nav class="nav nav-pills nav-fill">
          <button
            class="nav-link active"
            data-bs-toggle="tab"
            data-bs-target="#menu-pane"
            id="manuManage"
            onClick={() => handleManageMode("menu")}
          >
            菜單管理
          </button>
          <button
            class="nav-link"
            data-bs-toggle="tab"
            onClick={() => handleManageMode("order")}
          >
            點餐管理
          </button>
          <button
            class="nav-link"
            data-bs-toggle="tab"
            onClick={() => handleManageMode("booking")}
          >
            訂位管理
          </button>
          <button
            class="nav-link"
            data-bs-toggle="tab"
            onClick={() => handleManageMode("news")}
          >
            發佈消息
          </button>
        </nav>

        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active mx-4"
            id="menu-pane"
            role="tabpanel"
            aria-labelledby="menu-tab"
            tabindex="0"
          >
            <div className="row mt-5">
                <ul class="nav nav-tabs">
                <li class="nav-item">
                    <button class="nav-link active" aria-current="page">
                    咖啡
                    </button>
                </li>
                <li class="nav-item">
                    <button class="nav-link">三明治</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link">甜點</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link ">沙拉</button>
                </li>
                </ul>
            </div>
            <div className="mt-3">
              <CoffeeMenu />
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="profile-tab-pane"
            role="tabpanel"
            aria-labelledby="profile-tab"
            tabindex="0"
          >
            ...
          </div>
          <div
            class="tab-pane fade"
            id="contact-tab-pane"
            role="tabpanel"
            aria-labelledby="contact-tab"
            tabindex="0"
          >
            ...
          </div>
          <div
            class="tab-pane fade"
            id="disabled-tab-pane"
            role="tabpanel"
            aria-labelledby="disabled-tab"
            tabindex="0"
          >
            ...
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminControl;
