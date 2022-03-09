import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Auth from '../../utils/auth'

import "./navbar.css"


const NavBar = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
        window.location = "/"
    };
    return (
        <div>
            
            <Navbar collapseOnSelect expand='lg' className='nav-main' bg="" variant="light">
                <Container fluid>
                    <Navbar.Brand className="nav-brand" href="/">
                       <img className="emblem"
                            src={`${process.env.PUBLIC_URL}/assets/images/icons8-dungeons-and-dragons-512.png`} alt="Dungeons and Dragons icon"
                        />
                        <span className='capitalD'>D</span>ungeon <span className='capitalD'>D</span>elver</Navbar.Brand>
                        
                </Container>
                <Container fluid className="hamburger-menu">
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className="nav me-auto">
                        <Nav.Link className="nav-item" as={Link} to="/">Home</Nav.Link>
                        {/* <Nav.Link className="nav-item" as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link className="nav-item" as={Link} to="/signup">Sign Up</Nav.Link> */}
                        {Auth.loggedIn() ? ( 
                        <>
                        <Nav.Link className="nav-item" onClick={logout} as={Link} to="/">Logout</Nav.Link>
                        <Nav.Link className="nav-item" as={Link} to="/campaigns">Campaigns</Nav.Link>
                        </>
                        ) : (
                            <>
                            <Nav.Link className="nav-item" as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link className="nav-item" as={Link} to="/signup">Sign Up</Nav.Link>
                        </>
                        )}
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>



    )
};

export default NavBar;