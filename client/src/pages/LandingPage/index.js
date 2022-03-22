import { Button, Container, Row, Col, ListGroup, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./landingpage.css"

const LandingPage = () => {



    return (
        <Container>
            <Col className="text-center mt-4">
                <h1>Welcome, Dungeon Delver!</h1>
            </Col>
            
                <Row className="text-center mt-3">
                    <h2>Where would you like to go?</h2>
                </Row>
                <Container className="mt-5 mb-5">
                    <Row>
                    <Col>
                    <Link to="/campaigns">
                    <Card className='selectCard text-center camp'>
                      <span className='card-title my-auto red'>Campaigns</span>
                    </Card>
                    </Link>
                    </Col>
                   <Col>
                   <Link to="/areas">
                    <Card className='selectCard text-center dunge'>
                      <span className='card-title my-auto blue'>Areas</span>
                    </Card>
                    </Link>
                    </Col>
                    <Col>
                    <Link to="/creatures">
                    <Card className='selectCard text-center creat'>
                       <span className='card-title my-auto green'>Creatures</span>
                    </Card>
                    </Link>
                    </Col>
                    </Row>
                </Container>
            
        </Container>
    );
}

export default LandingPage;