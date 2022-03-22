import "./singleArea.css";

import { Container, Col, Row, Button } from "react-bootstrap";

import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import EditArea from '../../components/EditArea';
import RoomForm from '../../components/RoomForm';
import RoomList from '../../components/RoomList';
import { QUERY_ROOMS } from "../../utils/queries";
import { useSessionContext } from '../../utils/SessionContext.js';
import { Link } from 'react-router-dom';



const SingleArea = () => {
  const { currentSession } = useSessionContext();
  // console.log(currentSession);

  const location = useLocation();
  const { areaData } = location.state;

  // I used to pull the campaign data from the state, but now I can populate it from the area's data.
  const campaignData = areaData.campaign;
  console.log(campaignData);

  const { loading, data } = useQuery(QUERY_ROOMS, {
    variables: { area: areaData._id },
  });

  const rooms = data?.getRooms || [];

  if (!loading) {
    console.log(rooms)
  };


  return (
    <Container className='my-area-container'>
      <Row className="page-header">
        <Col xs={6}>
          {/* <h1 className="area-name" style={{ color: "seagreen" }}>{areaData.name}</h1> */}
          <h1 className="area-name mt-1">{areaData.name}<EditArea area={areaData} /></h1>
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
          <RoomForm area={areaData} campaign={campaignData}></RoomForm>
          <h2 className="mb-3 mt-3 mx-3">Rooms in {areaData.name}</h2>
        </Col>
        {loading ? (
          <h2>
            Retrieving Data...
          </h2>
        ) : (
          <RoomList campaign={campaignData} area={areaData} rooms={rooms}></RoomList>
        )}
      </Row>

    </Container>
  );
}

export default SingleArea;
