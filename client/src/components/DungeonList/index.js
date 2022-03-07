import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useParams, useLocation } from 'react-router-dom';
import { REMOVE_DUNGEON } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import "./dungeonList.css";

const DungeonList = ({ dungeons, campaign }) => {
    const [removeDungeon, { error }] = useMutation(REMOVE_DUNGEON, {
        update(cache, { data: { removeDungeon } }) {
            try {
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: removeDungeon },
                });
            } catch (error) {
                console.error(error);
            }
        },
    });

    const handleRemoveDungeon = async (_id) => {
        try {
            const { data } = await removeDungeon({
                variables: { _id },
            });
        } catch (err) {
            console.error(err);
        }
    };

    if (!campaign) {
        return <h3>Please select a campaign first.</h3>
    }

    if (!dungeons.length) {
        return <h3>You have no dungeons in this campaign.</h3>
    }
    // console.log(dungeons);
    // console.log(campaign._id);

    const dungeonList = dungeons.filter(dungeon => dungeon.campaign._id === campaign._id);
    console.log(dungeonList);

    return (
        <Container>

            <Row xs={1} md={2} lg={3} className="g-4">
                {dungeonList && dungeonList.map((dungeon, pos) => (
                    <Col key={pos}>
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