import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Logo from "../../static/img/duck.png";
import { Button } from 'react-bootstrap';
import { BoxArrowRight } from 'react-bootstrap-icons';

function AdminNav() {
    const handleLogout = () => {
        
        window.location.href = "http://localhost:3000/admin/login";
      };

  return (
    <>
      <Navbar style={{backgroundColor:"#BF8563"}} >
        <Container>
          <Navbar.Brand href="/admin/">
            <img
              alt=""
              src={Logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            <b>Duck Coffee Admin</b>
          </Navbar.Brand>
            <Button variant='outline-light' onClick={handleLogout} className='d-flex align-items-center' ><BoxArrowRight className='me-2' />{'登出'}</Button>
        </Container>
      </Navbar>
    </>
  );
}

export default AdminNav;