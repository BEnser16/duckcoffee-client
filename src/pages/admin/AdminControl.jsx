import React from "react";
import { useState } from "react";
import MenuControl from "../../components/adminpage/MenuControl";
import PostControl from "../../components/adminpage/PostControl";
import OrderControl from "../../components/adminpage/orderManage/OrderControl";

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
            data-bs-target="#order-pane"
            onClick={() => handleManageMode("order")}
          >
            點餐管理
          </button>
          <a
            class="nav-link"
            href="/admin/booking"
          >
            訂位管理
          </a>
          <button
            class="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#post-pane"
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
            aria-labelledby="order-tab"
            tabindex="0"
          >
            <OrderControl/>
          </div>
          
          <div
            class="tab-pane fade"
            id="post-pane"
            role="tabpanel"
            aria-labelledby="post-tab"
            tabindex="0"
          >
            <PostControl/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminControl;
