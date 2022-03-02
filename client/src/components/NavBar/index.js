import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

import "./style.css"


const NavBar = () => {
    return (
        <div>
            <Navbar className='nav-main' bg="" variant="light">
                <Container>
                    <Navbar.Brand className="nav-brand" href="#home">
                        <img className="emblem"
                            src={`${process.env.PUBLIC_URL}/assets/images/icons8-dungeons-and-dragons-256.png`}
                        />
                        <span className='capitalD'>D</span>ungeon <span className='capitalD'>D</span>elver</Navbar.Brand>
                </Container>
                <Container>
                    <Nav className="nav me-auto">
                        <Nav.Link className="nav-item" as={Link} to="/">Home</Nav.Link>
                        <Nav.Link className="nav-item" as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link className="nav-item" as={Link} to="/signup">Sign Up</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>



    )
};

export default NavBar;