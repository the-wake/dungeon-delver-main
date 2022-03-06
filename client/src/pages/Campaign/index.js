import { Button, Container, Row, ListGroup, Col } from 'react-bootstrap';

import CampaignForm from '../CampaignForm';

import { QUERY_CAMPAIGNS } from '../../utils/queries';

import { Navigate, useParams, Link } from 'react-router-dom';
import "./campaign.css";
import CampaignList from '../../components/CampaignList';

import { QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';




const Campaign = () => {
    const { loading, data } = useQuery(QUERY_CAMPAIGNS);
  console.log(data)

    const campaigns = data?.campaigns || [];
    console.log(campaigns);

    return ( 
        <Container className='my-campaign-container'>
        <Col>
            <h1>My Campaigns</h1>
            {/* <div>
               {campaignText && campaigns.map((text) => (
                   <div key={campaigns._id} className="card">{campaigns}</div>
               ))}
                </div> */}
        </Col>
        <Col>
            <Row>
        
{/*             
            <ListGroup defaultActiveKey="#link1">
                <ListGroup.Item action href="">
                 
                </ListGroup.Item>
                <ListGroup.Item action href="">
                 
                </ListGroup.Item>
                <ListGroup.Item action href="">
               
                </ListGroup.Item>
            </ListGroup> */}
            </Row>
        </Col>
        <Col>
            <Link to="/campaigns/new">
            <Button className="mt-4">
                Create Campaign
            </Button>
            </Link>
        </Col>
     <CampaignForm
     campaigns={campaigns}/>
     <CampaignList
     campaigns={campaigns} />
        </Container>
    );
}


 
export default Campaign;