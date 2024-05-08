import React from "react";
import { DoorOpen } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { logout } from "../slice/userSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const Navbar = () => {
  
  const dispatch = useDispatch();
  const useritem = useSelector((state) => state.user.user);

  const handleLogout = () => {
    window.alert("Logout successfully! now redirect to the home page. "); 
    dispatch(logout()); 
    window.location.href = "/";
  };





  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary bg-primary my-2"
        data-bs-theme="light"
      >
        <div className="container-fluid">
          
          <a className="navbar-brand" href="/">
            <b>DUCK COFFEE</b>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link" >
                  首頁
                </Link>
                
              </li>
              <li className="nav-item">
                <Link to="/news" className="nav-link" >
                  最新消息
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link" >
                  關於我們
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  聯絡我們
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/menu">
                  餐點介紹
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/booking">
                  線上訂位
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/order">
                  我要點餐
                </Link>
              </li>
              
            </ul>
            {useritem && (
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
                      objectFit: "contain",
                    }}
                    src={useritem.imageUrl}
                    alt="user avatar"
                  />
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/user-config">
                      用戶資訊
                    </Link>
                  </li>
                  
                  <li>
                    <button className="dropdown-item" onClick={handleLogout} >
                      登出
                    </button>
                    
                  </li>
                </ul>
              </div>
            )}
            {useritem == null && (
              <Link to="/login" className="btn btn-success d-flex align-items-center" type="submit" >
                <DoorOpen className="me-2" />
                會員登入
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
