import { Card, Container, Row, Col, Button, CloseButton } from 'react-bootstrap';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useParams, useLocation } from 'react-router-dom';
import { REMOVE_DUNGEON } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import { useSessionContext } from '../../utils/SessionContext.js';
import "./dungeonList.css";

const DungeonList = ({ dungeons, campaign }) => {
  const { currentSession, setCampaign, setDungeon } = useSessionContext();

  const [removeDungeon, { error }] = useMutation(REMOVE_DUNGEON, {
    update(cache, { data: { removeDungeon } }) {
      try {
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: removeDungeon },
        });
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleRemoveDungeon = async (_id) => {
    try {
      const { data } = await removeDungeon({
        variables: { _id },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!campaign) {
    return <h4>Please select a campaign first.</h4>
  }

  if (!dungeons.length) {
    return <h4>You have no dungeons in this campaign.</h4>
  }
  // console.log(dungeons);
  // console.log(campaign._id);

  const dungeonList = dungeons.filter(dungeon => dungeon.campaign._id === campaign._id);
  // console.log(dungeonList);

  return (
    <Container>

      <Row xs={1} md={2} lg={3} className="g-4">
        {dungeonList && dungeonList.map((dungeon, pos) => (
          <Col key={pos}>
            {/* <Card style={{ background: "black", color: "red" }}> */}
            <Card>
              {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
              <Card.Body>
                <Card.Title key={dungeon._id}>
                  {/* <Link className='dungeon-title' style={{ color: "red" }} to={`/dungeons/${dungeon._id}`} */}
                  <Link className='dungeon-title' to={`/dungeons/${dungeon._id}`}
                    onClick={() => {
                      setCampaign({ currentCampaign: dungeon.campaign });
                      setDungeon({ currentDungeon: dungeon });
                    }}
                    state={{ campaignData: campaign, dungeonData: dungeon }}>
                    {dungeon.name}
                  </Link>
                  {Auth.loggedIn && (<CloseButton className="close-button float-end"
                    onClick={() => handleRemoveDungeon(dungeon)}>

                  </CloseButton>)}
                </Card.Title>
                <Card.Text className='hidden'>
                  We can add a field for dungeon description here. Need to add another field to ADD_DUNGEON.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DungeonList;