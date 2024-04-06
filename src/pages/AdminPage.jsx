import React from 'react'
import AdminNav from '../components/adminpage/AdminNav'
import { Container , Row , Col } from 'react-bootstrap'
import AdminSideBar from '../components/adminpage/AdminSidebar'
import { Outlet } from 'react-router-dom'

const AdminPage = () => {
  return (
    <>
      <AdminNav />
      <Container fluid style={{ paddingLeft: 0, paddingRight: 0, minHeight: '95vh' }} >
        <Row className="flex-nowrap" style={{ minHeight: '95vh' }} >
          <Col md={2} className='bg-dark' style={{ minHeight: '95vh' }} >
            <AdminSideBar />
          </Col>
          <Col md={10} className='bg-light' >
            <Outlet />
          </Col>
        </Row>

      </Container>
    </>
    
  )
}

export default AdminPage