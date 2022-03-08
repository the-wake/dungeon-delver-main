import "./singleRoom.css";

import { Container, Col, Row, Button } from "react-bootstrap";

import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// import CreatureForm from '../../components/CreatureForm';

import { QUERY_CREATURES } from "../../utils/queries";
import { useSessionContext } from '../../utils/SessionContext.js';
import { Link } from 'react-router-dom';

const SingleRoom = () => {
    const { currentSession } = useSessionContext();
    console.log(currentSession);
    const { currentCampaign, currentDungeon, currentRoom} = currentSession;

    // const location = useLocation();
    // const { dungeonData } = location.state;
    // const { roomNameData } = location.state;
    // const { roomBlurbData } = location.state;
    // console.log(roomNameData)
    const { loading, data } = useQuery(QUERY_CREATURES, {
        variables: { room: currentRoom._id },
    });

    const creatures = data?.getCreatures || [];

    if (!loading) {
        console.log(creatures)
    };
    // console.log(dungeonData);


    return (
        <Container className='my-room-container'>
            <Col>
          
                <h1>{currentRoom.name}</h1>
            </Col>
            <Row>
                <Col>

                    {/* <Link to={`/dungeons/${dungeonData._id}`} state={{ dungeonData }}><h4>{dungeonData.name}</h4>
                    </Link> */}
                </Col>

                <Col className="text-center">
                    {/* {roomBlurbData.name} */}
                </Col>
            </Row>

            {/* <Row>
                <CreatureForm creatures={creatures} room={roomData}></CreatureForm>
                <h2 className="mb-3 mt-3 mx-3">Creatures in {roomData.name}</h2>
                {loading ? (
                    <h2>
                        Retrieving Data...
                    </h2>
                ) : (
                    <CreatureList creatures={creatures} room={roomData}></CreatureList>
                )}
            </Row> */}

        </Container>
    );
}

export default SingleRoom;
