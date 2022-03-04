import { Button, Container, Row, ListGroup } from 'react-bootstrap';
import { Navigate, useParams } from 'react-router-dom';

import CampaignList from '../../components/CampaignList';

import { QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';

const Campaign = () => {

    // const { loading, data } = useQuery(
        
    // );

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