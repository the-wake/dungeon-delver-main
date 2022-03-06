import React, { useState } from 'react';
import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client';

//bootstrap components
import { Button, Container, Row } from 'react-bootstrap';

//actions
import { ADD_DUNGEON } from '../../utils/mutations';
// import { QUERY_CAMPAIGNS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const DungeonForm = (props) => {
    const [dungeonText, setDungeonText] = useState('');

    const [addDungeon, { error, data }] = useMutation(ADD_DUNGEON);

    const handleDungeonSubmit = async (event) => {
        event.preventDefault();
        console.log("here", handleDungeonSubmit)
        try {
            const { data } = await addDungeon({
                variables: {

                    // _id: 5555,
                    name: dungeonText,
                    is_active: true,
                    user: Auth.getProfile().data.username,
                },
            });
            console.log("right here", data)

            setDungeonText('');

        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'dungeonText') {
            setDungeonText(value);
        }
    };

    return (
        <div>
            {Auth.loggedIn() ? (
                <>
                    <Container>
                        <h1>Add a New Dungeon</h1>
                    </Container>
                    <Container>
                        <Row>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicText">
                                    <Form.Label></Form.Label>
                                    <Form.Control
                                        autoFocus
                                        onChange={handleChange}
                                        value={dungeonText.name}
                                        // id="text"
                                        className="form-input"
                                        type="text"
                                        placeholder="Dungeon name"
                                        name="dungeonText" />
                                    {error ? (
                                        <div>
                                            <p className='error-text'>Please enter a dungeon name</p>
                                        </div>
                                    ) : null}
                                </Form.Group>
                            </Form>
                        </Row>
                    </Container>
                    <Container>

                        <Button onClick={handleDungeonSubmit} className="mt-4">
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

export default DungeonForm;