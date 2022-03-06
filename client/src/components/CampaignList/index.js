import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REMOVE_CAMPAIGN } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import "./campaignList.css";

const CampaignList = ({campaigns}) => {
    const [removeCampaign, { error }] = useMutation(REMOVE_CAMPAIGN, {
        update(cache, { data: { removeCampaign } }) {
            try {
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: removeCampaign },
                });
            } catch (error) {
                console.error(error);
            }
        },
    });

    const handleRemoveCampaign = async (_id) => {
        try {
            const { data } = await removeCampaign({
                variables: { _id },
            });
        } catch (err) {
            console.error(err);
        }
        console.log("right there", _id)
    };

    if (!campaigns.length) {
        return <h3>You have no campaigns yet...</h3>
    }


    return ( 
        <Container>

<Row xs={1} md={2} lg={3} className="g-4">
  {campaigns && campaigns.map((campaign) => (
    <Col>
      <Card>
        {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
        <Card.Body>
          <Card.Title key={campaign._id} className="campaign-title">{campaign.name}</Card.Title>
          <Card.Text>
            We can add a field for campaign description here. Need to add another field to ADD_CAMPAIGN.
          </Card.Text>
          {Auth.loggedIn && (  <Button 
          onClick={() => handleRemoveCampaign(campaign)}
          >X</Button> )}
        
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
        </Container>
     );
}
 
export default CampaignList;