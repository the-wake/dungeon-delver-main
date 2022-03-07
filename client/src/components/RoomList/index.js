import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useParams, useLocation } from 'react-router-dom';
import { REMOVE_ROOM} from '../../utils/mutations';
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
        return <h3>Please select a dungeon first.</h3>
    }

    if (!rooms.length) {
        return <h3>You have no rooms in this dungeon.</h3>
    }
    // console.log(rooms);
    // console.log(dungeon._id);

    const dungeonList = dungeons.filter(dungeon => dungeon.campaign._id === campaign._id);
    console.log(dungeonList);

    return (
        <Container>

            <Row xs={1} md={2} lg={3} className="g-4">
                {dungeonList && dungeonList.map((dungeon) => (
                    <Col>
                        <Card>
                            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
                            <Card.Body>
                                <Card.Title key={dungeon._id} className="dungeon-title"><Link to={`/dungeons/${dungeon._id}`} state={{ dungeonData: dungeon }}>{dungeon.name}</Link></Card.Title>
                                <Card.Text>
                                    We can add a field for dungeon description here. Need to add another field to ADD_DUNGEON.
                                </Card.Text>
                                {Auth.loggedIn && (<Button
                                    onClick={() => handleRemoveDungeon(dungeon)}
                                >X</Button>)}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default DungeonList;