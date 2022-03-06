import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import "./campaignList.css";

const CampaignList = ({campaigns}) => {
    if (!campaigns.length) {
        return <h3>You have no campaigns yet...</h3>
    }


    return ( 
        <Container>
            {/* <Row>
            {
                campaigns &&
                campaigns.map((campaign) => (
                    <Col>
                    <Card
                        
                       key={campaign._id} className="campaign-card">
                       <p>{campaign.name}</p> 
                    
                       
                        </Card>
                        </Col>
                ))
            } */}

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
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
{/* </Row> */}
        </Container>
     );
}
 
export default CampaignList;