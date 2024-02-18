import React from 'react'
import { Container , Row , Col, Form , Dropdown} from 'react-bootstrap'


const Booking = () => {
  return (
    <>
      <Container>
        <h3 className='my-4'>我要訂位</h3>
        
        <Form className='m-2'>
          <Row >
            <Form.Label>
              <h5>
                選擇訂位人數與時段
              </h5>
            </Form.Label>
            <Col>
              
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  選擇人數
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item >一位</Dropdown.Item>
                  <Dropdown.Item >兩位</Dropdown.Item>
                  <Dropdown.Item >三位</Dropdown.Item>
                  <Dropdown.Item >四位</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col>
              <Form.Label>
                選擇用餐日期
              </Form.Label>
              <input type="date" name="inputBookDate" className='mx-2' />
            </Col>

          </Row>
          <Row className='mt-3'>
            <h5>目前空餘時段</h5>
          </Row>
          
        </Form>
        
        

      </Container>
    </>
  )
}

export default Booking