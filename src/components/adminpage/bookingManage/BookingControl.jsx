import React from 'react'
import { Container , Table , Button} from 'react-bootstrap'
import axios from 'axios';
import DeleteBookingBtn from './DeleteBookingBtn';

const BookingControl = () => {
  const [bookingData, setBookingData] = React.useState([]);

  React.useEffect(() => { 
    axios.get("http://localhost:8080/api/reservations?page=0&size=20")
    .then((res) => {
      console.log(res);
      setBookingData(res.data._embedded.reservations);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);


  return (
    <>
      <Container style={{minHeight:"80vh"}}>
        
          <h4 className='my-4' >訂位管理</h4>
        
        <Table striped bordered hover size="sm" className='me-3' >
          <thead>
            <tr>
              <th>日期</th>
              <th>姓名</th>
              <th>電話</th>
              <th>時間</th>
              <th>備註</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {bookingData.map((reservation , index) => {
              return (
                <tr key={index}>
                  <td>{reservation.bookingDate}</td>
                  <td>{reservation.personName}</td>
                  <td>{reservation.personPhone}</td>
                  <td>{reservation.startTime} - {reservation.endTime}</td>
                  <td>{reservation.remark}</td>
                  <td>
                    <DeleteBookingBtn href={reservation._links.self.href} />
                    <Button variant="danger" className="me-2"  >
                      刪除
                    </Button>
                    <Button variant="warning">編輯</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>

    </>
  )
}

export default BookingControl