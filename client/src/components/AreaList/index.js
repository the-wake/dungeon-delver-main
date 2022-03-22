import { Card, Container, Row, Col, Button, CloseButton } from 'react-bootstrap';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useParams, useLocation } from 'react-router-dom';
import { REMOVE_AREA } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import { useSessionContext } from '../../utils/SessionContext.js';
import "./areaList.css";

const AreaList = ({ areas, campaign }) => {
  const { currentSession, setCampaign, setArea } = useSessionContext();

  const [removeArea, { error }] = useMutation(REMOVE_AREA, {
    update(cache, { data: { removeArea } }) {
      try {
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: removeArea },
        });
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleRemoveArea = async (_id) => {
    try {
      const { data } = await removeArea({
        variables: { _id },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!campaign) {
    return <h4>Please select a campaign first.</h4>
  }

  if (!areas.length) {
    return <h4>You have no areas in this campaign.</h4>
  }
  // console.log(areas);
  // console.log(campaign._id);

  const areaList = areas.filter(area => area.campaign._id === campaign._id);
  // console.log(areaList);

  return (
    <Container>

      <Row xs={1} md={2} lg={3} className="g-4">
        {areaList && areaList.map((area, pos) => (
          <Col key={pos}>
            {/* <Card style={{ background: "black", color: "red" }}> */}
            <Card>
              {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
              <Card.Body>
                <Card.Title key={area._id}>
                  {/* <Link className='area-title' style={{ color: "red" }} to={`/areas/${area._id}`} */}
                  <Link className='area-title' to={`/areas/${area._id}`}
                    onClick={() => {
                      setCampaign({ currentCampaign: area.campaign });
                      setArea({ currentArea: area });
                    }}
                    state={{ campaignData: campaign, areaData: area }}>
                    {area.name}
                  </Link>
                  {Auth.loggedIn && (<CloseButton className="close-button float-end"
                    onClick={() => handleRemoveArea(area)}>

                  </CloseButton>)}
                </Card.Title>
                <Card.Text className='hidden'>
                  We can add a field for area description here. Need to add another field to ADD_AREA.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AreaList;