import "./singleRoom.css";

import { Container, Col, Row, Button } from "react-bootstrap";

import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CreatureForm from '../../components/CreatureForm';
import CreatureList from '../../components/CreatureList';
import { QUERY_CREATURES } from "../../utils/queries";
import { useSessionContext } from '../../utils/SessionContext.js';
import { Link } from 'react-router-dom';

const SingleRoom = () => {
  const { currentSession } = useSessionContext();
  console.log(currentSession);
  const { currentCampaign, currentArea, currentRoom } = currentSession;

  const location = useLocation();
  // May want/need to add more state data.
  const { campaignData } = location.state;
  const { areaData } = location.state;
  const { roomData } = location.state;
  console.log(campaignData);
  console.log(areaData);
  console.log(roomData);

  const { loading, data } = useQuery(QUERY_CREATURES, {
    variables: { room: roomData._id },
  });

  const creatures = data?.getCreatures || [];

  if (!loading) {
    console.log(creatures)
  };
  // console.log(areaData);


  return (
    <Container className='my-room-container'>
      <Row className="page-header">
        <Col xs={6}>
          <h1 className="area-name mt-1">{roomData.name}</h1>
        </Col>
        <Col className="flex right-justify">
          {/* <EditRoom room={roomData}></EditRoom> */}
          <Link to={`/areas/${areaData._id}`} state={{ campaignData, areaData }}><h4>{areaData.name}</h4>
          </Link>
        </Col>
      </Row>

      <hr className='w-100 m-auto' />

      {roomData.blurb ? (
        <Row>
          <Col className="blurb" xs={10} lg={8}>
            <div>
              <p>"{roomData.blurb}"</p>
            </div>
          </Col>
        </Row>
      ) :
        <></>
      }

      <Row>
        <Col>
          <CreatureForm campaign={campaignData} area={areaData} room={roomData}></CreatureForm>
          <h2 className="mb-3 mt-3 mx-3">Creatures in {roomData.name}</h2>
        </Col>
        {loading ? (
          <h2>
            Retrieving Data...
          </h2>
        ) : (
          <CreatureList campaign={campaignData} area={areaData} room={roomData} creatures={creatures}></CreatureList>
        )}

      </Row>

    </Container>
  );
}


export default SingleRoom;
