import React from "react";

const Footer = () => {
  return (
    <div>
      <footer
        className="d-flex flex-wrap 
                justify-content-between align-items-center py-5 bg-dark"
      >
          <p className="col-md-4 text-white" >© Duck Coffee, Inc</p>
          <ul className="nav navbar-dark col-md-4 justify-content-end">
            <li className="nav-item">
              <a href="/" className="nav-link px-2 text-white">
                首頁
              </a>
            </li>
          </ul>
      </footer>
    </div>
  );
};

export default Footer;
