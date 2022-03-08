import "./singleDungeon.css";

import { Container, Col, Row, Button } from "react-bootstrap";

import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import RoomForm from '../../components/RoomForm';
import RoomList from '../../components/RoomList';
import { QUERY_ROOMS } from "../../utils/queries";
import { Link } from 'react-router-dom';



const SingleDungeon = () => {
    
    const location = useLocation();
    const { dungeonData } = location.state;
    const { campaignData } = location.state;

    const { loading, data } = useQuery(QUERY_ROOMS, {
        variables: { dungeon: dungeonData._id },
    });

    const rooms = data?.getRooms || [];

    if (!loading) {
        console.log(rooms)
    };


    return (
        <Container className='my-dungeon-container'>
            <Col>
                <h1>{dungeonData.name}</h1>
            </Col>
            <Row>
                <Col>

                {/* <Link to={`/dungeons/${dungeon._id}`} state={{ dungeonData: dungeon }}>{dungeon.name}</Link> */}

                {/* Attempt to return to previous page -- might be an easier way with redirect */}
                {/* <Link to='/campaigns'> */}
                
                <Link to={`/campaigns/${campaignData._id}`} state={{ campaignData }}><h4>{campaignData.name}</h4>
                    {/* <Button className="mt-4 mb-4 mx-2">
                        Back
                    </Button> */}
                    </Link>
                </Col>
            </Row>

            <Row>
                <RoomForm dungeon={dungeonData}></RoomForm>
                <h2 className="mb-3 mt-3 mx-3">Rooms in {dungeonData.name}</h2>
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
