import { Card, Container, Row, Col, Button, CloseButton } from 'react-bootstrap';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REMOVE_CAMPAIGN } from '../../utils/mutations';
import { useSessionContext } from '../../utils/SessionContext.js'
import { QUERY_ME } from '../../utils/queries';
import "./campaignList.css";

const CampaignList = ({ campaigns }) => {
  const { currentSession, setCampaign } = useSessionContext();
  console.log('Current Session: ', currentSession);

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
    return <h4>You have no campaigns yet...</h4>
  }

  // Find out how to capture change in state in React Router 6 and pass that in useEffect function.


  return (
    <Container>

      <Row xs={1} md={2} lg={3} className="g-4">
        {campaigns && campaigns.map((campaign, pos) => (
          <Col key={pos}>
            <Card>
              {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
              <Card.Body>

                <Card.Title>
                  <Link className='campaign-title'
                  to={`/campaigns/${campaign._id}`}
                  onClick={() => setCampaign({ currentCampaign: campaign })}
                  state={{ campaignData: campaign }}>
                    {campaign.name}
                  </Link>
                </Card.Title>
                <Card.Text>
                  We can add a field for campaign description here. Need to add another field to ADD_CAMPAIGN.
                </Card.Text>

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CampaignList;
