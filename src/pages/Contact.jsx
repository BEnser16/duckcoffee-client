import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 處理表單提交邏輯，如驗證表單數據，發送數據到服務器等
    console.log(formData);
  };

  return (
    <Container style={{ marginTop: '20px' , minHeight:"80vh" }}>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2 className="text-center mb-4">聯絡我們</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>姓名</Form.Label>
              <Form.Control type="text" name="name" placeholder="請輸入您的姓名" value={formData.name} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>電子郵件</Form.Label>
              <Form.Control type="email" name="email" placeholder="請輸入您的電子郵件" value={formData.email} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSubject">
              <Form.Label>主題</Form.Label>
              <Form.Control type="text" name="subject" placeholder="請輸入主題" value={formData.subject} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicMessage">
              <Form.Label>留言</Form.Label>
              <Form.Control as="textarea" name="message" rows={3} placeholder="請輸入您的留言" value={formData.message} onChange={handleChange} />
            </Form.Group>

            <Button variant="primary" type="submit">
              提交
            </Button>
          </Form>
        </Col>
      </Row>
      
    </Container>
  );
};

export default Contact;
