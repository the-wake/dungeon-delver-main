import "./login.css";

import { Container, Col, Row, Button } from "react-bootstrap";

import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CreatureForm from '../../components/CreatureForm';

import { QUERY_CREATURES } from "../../utils/queries";
import { Link } from 'react-router-dom';

const SingleRoom = () => {

    const location = useLocation();
    const { dungeonData } = location.state;
    const { roomNameData } = location.state;
    const { roomBlurbData } = location.state;

    // console.log(dungeonData);

    
   

    


    return ( 
<Container className='my-room-container'>
            <Col>
                <h1>{roomNameData.name}</h1>
            </Col>
            <Row>
                <Col>

                {/* <Link to={`/dungeons/${dungeon._id}`} state={{ dungeonData: dungeon }}>{dungeon.name}</Link> */}

                {/* Attempt to return to previous page -- might be an easier way with redirect */}
                {/* <Link to={`/campaigns/${campaign._id}`} state={{ campaignData: campaign }}>{campaign.name} */}
                
                <Link to='/campaigns'>
                    <Button className="mt-4 mb-4 mx-2">
                        Back
                    </Button>
                    </Link>
                </Col>

                <Col className="text-center">
                    {roomBlurbData.name}
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


