import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client';

//bootstrap components
import { Button, Container, Row, Form } from 'react-bootstrap';

//actions
import { ADD_ROOM } from '../../utils/mutations';
// import { QUERY_CAMPAIGNS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const RoomForm = (props) => {
    console.log(props.dungeon);
    const [roomText, setRoomText] = useState('');

    const [addRoom, { error, data }] = useMutation(ADD_ROOM);

    const handleRoomSubmit = async (event) => {
        event.preventDefault();
        console.log("here", handleRoomSubmit)
        try {
            const { data } = await addRoom({
                variables: {
                    name: roomText,
                    dungeon: props.dungeon._id,
                    is_active: true,
                    user: Auth.getProfile().data.username,
                },
            });
            console.log("right here", data)

            setRoomText('');

            window.location.reload();


        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'roomText') {
            setRoomText(value);
        }
    };

    return (
        <div>
            {Auth.loggedIn() ? (
                <>
                    <Container>
                        <h2>Add a New Room to {props.dungeon.name}</h2>
                    </Container>
                    <Container>
                        <Row>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicText">
                                    <Form.Label></Form.Label>
                                    <Form.Control
                                        autoFocus
                                        onChange={handleChange}
                                        value={roomText.name}
                                        // id="text"
                                        className="form-input"
                                        type="text"
                                        placeholder="Room name"
                                        name="roomText" />
                                    {error ? (
                                        <div>
                                            <p className='error-text'>Please enter a room name</p>
                                        </div>
                                    ) : null}
                                </Form.Group>
                            </Form>
                        </Row>
                    </Container>
                    <Container>

                        <Button onClick={handleRoomSubmit} className="mt-4">
                            Add
                        </Button>
                    </Container>
                </>
            ) : (

                <p>
                    You need to be logged in. Please
                    <Link to="/login"> login</Link> or <Link to="/signup"> sign up</Link>
                </p>

            )}
        </div>
    );
};

export default RoomForm;