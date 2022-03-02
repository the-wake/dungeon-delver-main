import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

import "./style.css"


const NavBar = () => {
  
  
  
  return ( 
<div>
<Navbar className='nav-main' bg="" variant="light">
    <Container>
    <Nav className="nav me-auto">
      <Nav.Link className="nav-item" as={Link} to="/">Home</Nav.Link>
      <Nav.Link className="nav-item"as={Link} to="/login">Login</Nav.Link>
      <Nav.Link className="nav-item" as={Link} to="/signup">Sign Up</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
  </div>


       
    )
};
 
export default NavBar;