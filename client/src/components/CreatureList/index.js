import { Card, Container, Row, Col, CloseButton } from 'react-bootstrap';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useParams, useLocation } from 'react-router-dom';
import { REMOVE_ROOM } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import { useSessionContext } from '../../utils/SessionContext.js';
import "./creatureList.css";

const CreatureList = ({ campaign, area, room, creatures }) => {
  const { currentSession, setCampaign, setArea, setRoom } = useSessionContext();

  // const [removeRoom, { error }] = useMutation(REMOVE_ROOM, {
  //     update(cache, { data: { removeRoom } }) {
  //         try {
  //             cache.writeQuery({
  //                 query: QUERY_ME,
  //                 data: { me: removeRoom },
  //             });
  //         } catch (error) {
  //             console.error(error);
  //         }
  //     },
  // });

  // const handleRemoveRoom = async (_id) => {
  //     try {
  //         const { data } = await removeRoom({
  //             variables: { _id },
  //         });
  //     } catch (err) {
  //         console.error(err);
  //     }
  // };

  console.log(creatures);
  console.log(room._id);

  if (!room) {
    return <h4>Please select a room first.</h4>
  }

  if (!creatures.length) {
    return <h4>You have no creatures in this area.</h4>
  }

  const creatureList = creatures.filter(creature => creature.room._id === room._id);
  console.log(creatureList);

  return (
    <Container>

      <Row xs={1} md={2} lg={3} className="g-4">
        {creatureList && creatureList.map((creature, pos) => (
          <Col key={pos}>
            <Card className="crature-card">
              {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
              <Card.Body>
                <Card.Title className='creature-title'>
                  {/* <Link className='campaign-title'
                                        to={`/campaigns/${campaign._id}`}
                                        onClick={() => setCampaign({ currentCampaign: campaign })}
                                        state={{ campaignData: campaign }}> */}
                  {creature.name}
                  {/* </Link> */}
                  {/* {Auth.loggedIn && (<CloseButton className="close-button float-end"
                                        onClick={() => handleRemoveCampaign(campaign)}></CloseButton>)} */}
                </Card.Title>
                <Card.Text>
                  HP: {creature.hp}
                </Card.Text>
                <Card.Text>
                  Status: {creature.is_alive ? 'Alive' : 'Dead'}
                </Card.Text>
                <Card.Text>
                  {creature?.loot}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CreatureList;
