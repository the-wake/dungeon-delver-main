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
        <Container>
            <Col>
                <Row>
                    <h1>Single Dungeon Page</h1>
                </Row>
            </Col>
        </Container>
    );
}

export default SingleDungeon;