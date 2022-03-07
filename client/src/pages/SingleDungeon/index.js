import "./singleDungeon.css";

import { Container, Col, Row, Button } from "react-bootstrap";

import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import RoomForm from '../../components/DungeonForm';
import RoomList from '../../components/DungeonList';
import { QUERY_ROOMS } from "../../utils/queries";



const SingleDungeon = () => {

    const location = useLocation();
    const { dungeonData } = location.state;

    // console.log(dungeonData);

    const { loading, data } = useQuery(QUERY_ROOMS);
    console.log(data);

    const rooms = data?.getRooms || [];


    // const { name } = useParams();

    // const { loading, data } = useQuery(QUERY_SINGLE_DUNGEON, {
    //     //have to pass state prop from campaignForm to 
    //     //retrieve new name
    //     variables: { name: props.name },
    // });

    // const dungeon = data?.dungeon || {};

    // if (loading) {
    //     return <div>
    //         <h3>Dungeon loading...</h3>
    //     </div>
    // }


    return (
        <Container className='my-dungeon-container'>
            <Col>
                <h1 className="text-center">{dungeonData.name}</h1>
            </Col>
            <Row>
                <Col>
                    <Button className="mt-4 mb-4 mx-2">
                        Back
                    </Button>
                </Col>
            </Row>

            <Row>
                <RoomForm rooms={rooms} dungeon={dungeonData}></RoomForm>
                <h2 className="mb-3 mt-3 mx-3">Rooms in {dungeonData.name}</h2>
                {loading ? (
                    <h2>
                        Retrieving Data...
                    </h2>
                ) : (
                    <RoomList rooms={rooms} dungeon={dungeonData}></RoomList>
                )}
            </Row>

        </Container>
    );
}

export default SingleDungeon;