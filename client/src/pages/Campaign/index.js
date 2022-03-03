import { Button, Container, Row, ListGroup } from 'react-bootstrap';

const Campaign = () => {


    return ( 
        <div>
        <Container>
            <h1>My Campaigns</h1>
        </Container>
        <Container>
            <Row>
        
            
            <ListGroup defaultActiveKey="#link1">
                <ListGroup.Item action href="">
                 
                </ListGroup.Item>
                <ListGroup.Item action href="">
                 
                </ListGroup.Item>
                <ListGroup.Item action href="">
               
                </ListGroup.Item>
            </ListGroup>
            </Row>
        </Container>
        <Container>
            <Button className="mt-4">
                Create Campaign
            </Button>
        </Container>
    </div>
    );
}


 
export default Campaign;