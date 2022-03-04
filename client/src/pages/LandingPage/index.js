import { Button, Container, Row, Col, ListGroup, Card } from 'react-bootstrap';
import "./landingpage.css"

const LandingPage = () => {
    return (
        <Container>
            <Col className="text-center mt-4">
                <h1>Welcome, Dungeon Delver!</h1>
            </Col>
            <Col>
                <Row className="text-center mt-3">
                    <h2>Where would you like to go?</h2>
                </Row>
                <Col>
                 <Card className='selectCard'> 
                 <ListGroup defaultActiveKey="#link1">
                    <ListGroup.Item action href="/campaigns">
                        Campaigns
                    </ListGroup.Item>
                    </ListGroup>
                    </Card>
                    <ListGroup> </ListGroup>
                    <ListGroup.Item action href="/dungeons">
                        Dungeons
                    </ListGroup.Item>
                    <ListGroup.Item action href="/creatures">
                        Creatures
                    </ListGroup.Item>
             
                </Col>
            </Col>
        </Container>
    );
}

export default LandingPage;