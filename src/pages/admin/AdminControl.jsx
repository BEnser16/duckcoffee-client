import React from "react";
import { useState } from "react";
import MenuControl from "../../components/adminpage/MenuControl";

const AdminControl = () => {
  function handleManageMode(selectMode) {
    setMode(selectMode);
  }

  const [mode, setMode] = useState("");
  console.log(mode)
  

  return (
    <div>
      <div className="container">
        <div className="my-4" >
          <h2>welcome to admin page</h2>

        </div>

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
           <MenuControl/> 
          </div>
          <div
            class="tab-pane fade"
            id="order-pane"
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
