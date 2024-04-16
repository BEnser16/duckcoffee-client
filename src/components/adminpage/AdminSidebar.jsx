import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const AdminSideBar = () => {
    

    return (
        <Nav className="flex-column bg-dark p-3" variant="underline" justify='true' >
            <Nav.Item className="mb-3">
                <Nav.Link as={NavLink} end to="/admin/" className="text-light">儀表面板</Nav.Link>
            </Nav.Item>
            <Nav.Item className="mb-3">
                <Nav.Link as={NavLink} to="/admin/order-control"  className="text-light">訂餐管理</Nav.Link>
            </Nav.Item>
            <Nav.Item className="mb-3">
                <Nav.Link as={NavLink} to="/admin/menu-control"  className="text-light">菜單管理</Nav.Link>
            </Nav.Item>
            <Nav.Item className="mb-3">
                <Nav.Link as={NavLink} to="/admin/post-control"  className="text-light">消息發布</Nav.Link>
            </Nav.Item>
            <Nav.Item className="mb-3">
                <Nav.Link as={NavLink} to="/admin/table-control"  className="text-light">桌位管理</Nav.Link>
            </Nav.Item>
            <Nav.Item className="mb-3">
                <Nav.Link as={NavLink} to="/admin/booking-control"  className="text-light">訂位管理</Nav.Link>
            </Nav.Item>
            <Nav.Item className="mb-3">
                <Nav.Link as={NavLink} to="/admin/role-control"  className="text-light">權限控制</Nav.Link>
            </Nav.Item>
        </Nav>
    );
};

export default AdminSideBar;
