import { Button, Container, Row, ListGroup } from 'react-bootstrap';


const LandingPage = () => {


    function alertClicked() {
        alert('You clicked the third ListGroupItem');
    }


    return (
        <div>
            <Container>
                <h1>Welcome to dungeon delver!</h1>
            </Container>
            <Container>
                <Row>
                    <h2>Where would you like to go?</h2>
                </Row>
                <ListGroup defaultActiveKey="#link1">
                    <ListGroup.Item action href="/campaigns">
                        Campaigns
                    </ListGroup.Item>
                    <ListGroup.Item action href="/dungeons">
                        Dungeons
                    </ListGroup.Item>
                    <ListGroup.Item action href="/creatures">
                        Creatures
                    </ListGroup.Item>
                </ListGroup>
            </Container>
        </div>
    );
}

export default LandingPage;