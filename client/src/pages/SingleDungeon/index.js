import "./singleDungeon.css";

import { Container, Col, Row, Button } from "react-bootstrap";

import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import EditDungeon from '../../components/EditDungeon';
import RoomForm from '../../components/RoomForm';
import RoomList from '../../components/RoomList';
import { QUERY_ROOMS } from "../../utils/queries";
import { useSessionContext } from '../../utils/SessionContext.js';
import { Link } from 'react-router-dom';



const SingleDungeon = () => {
  const { currentSession } = useSessionContext();
  // console.log(currentSession);

  const location = useLocation();
  const { dungeonData } = location.state;

  // I used to pull the campaign data from the state, but now I can populate it from the dungeon's data.
  const campaignData = dungeonData.campaign;
  console.log(campaignData);

  const { loading, data } = useQuery(QUERY_ROOMS, {
    variables: { dungeon: dungeonData._id },
  });

  const rooms = data?.getRooms || [];

  if (!loading) {
    console.log(rooms)
  };


  return (
    <Container className='my-dungeon-container'>
      <Row className="page-header">
        <Col xs={6}>
          {/* <h1 className="dungeon-name" style={{ color: "seagreen" }}>{dungeonData.name}</h1> */}
          <h1 className="dungeon-name mt-1">{dungeonData.name}<EditDungeon dungeon={dungeonData} /></h1>
        </Col>
        <Col className="flex right-justify">
          {/* <Link to={`/campaigns/${campaignData._id}`} state={{ campaignData }}><h4 style={{ color: "seagreen" }}>{campaignData.name}</h4> */}
          <Link to={`/campaigns/${campaignData._id}`} state={{ campaignData }}><h4>{campaignData.name}</h4>
          </Link>
        </Col>
      </Row>

      <hr className='w-100 m-auto' />

      <Row>
        <Col>
          <RoomForm dungeon={dungeonData} campaign={campaignData}></RoomForm>
          <h2 className="mb-3 mt-3 mx-3">Rooms in {dungeonData.name}</h2>
        </Col>
        {loading ? (
          <h2>
            Retrieving Data...
          </h2>
        ) : (
          <RoomList campaign={campaignData} dungeon={dungeonData} rooms={rooms}></RoomList>
        )}
      </Row>

    </Container>
  );
}

export default SingleDungeon;
