import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useParams, useLocation } from 'react-router-dom';
import { REMOVE_ROOM } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import "./roomList.css";

const RoomList = ({ rooms, dungeon }) => {
    const [removeRoom, { error }] = useMutation(REMOVE_ROOM, {
        update(cache, { data: { removeRoom } }) {
            try {
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: removeRoom },
                });
            } catch (error) {
                console.error(error);
            }
        },
    });

    const handleRemoveRoom = async (_id) => {
        try {
            const { data } = await removeRoom({
                variables: { _id },
            });
        } catch (err) {
            console.error(err);
        }
    };

    if (!dungeon) {
        return <h4>Please select a dungeon first.</h4>
    }

    if (!rooms.length) {
        return <h4>You have no rooms in this dungeon.</h4>
    }
    // console.log(rooms);
    // console.log(dungeon._id);

    const roomList = rooms.filter(room => room.dungeon._id === dungeon._id);
    console.log(roomList);

    return (
        <Container>

            <Row xs={1} md={2} lg={3} className="g-4">
                {roomList && roomList.map((room, pos) => (
                    <Col key={pos}>
                        <Card>
                            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
                            <Card.Body>
                                <Card.Title key={room._id} className="room-title"><Link to={`/rooms/${room._id}`} state={{ roomData: room }}>{room.name}</Link></Card.Title>
                                <Card.Text>
                                    We can add a field for room description here. Need to add another field to ADD_ROOM.
                                </Card.Text>
                                {Auth.loggedIn && (<Button
                                    onClick={() => handleRemoveRoom(room)}
                                >X</Button>)}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default RoomList;
