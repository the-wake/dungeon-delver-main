import React, { useState } from 'react';
import { Form, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client';

//bootstrap components
import { Button, Container, Row } from 'react-bootstrap';

//actions
import { ADD_DUNGEON } from '../../utils/mutations';
// import { QUERY_CAMPAIGNS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';
import { isRequiredArgument } from 'graphql';

const DungeonForm = (props) => {
    const [dungeonText, setDungeonText] = useState('');

    const [addDungeon, { error, data }] = useMutation(ADD_DUNGEON);

    const handleDungeonSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addDungeon({
                variables: {
                    name: dungeonText,
                    campaign: props.campaign._id,
                    is_active: true,
                    user: Auth.getProfile(),
                },
            });
            // console.log("Dungeon Data:", data)

            setDungeonText('');

            window.location.reload();


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
                        <Row>
                          <Col>
                        <h2>Add a New Dungeon to {props.campaign.name}</h2>
                            <Form onSubmit={handleDungeonSubmit}>
                                <Form.Group className="mb-3 w-100" controlId="formBasicText">
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
                                    <Button onClick={handleDungeonSubmit} className="mt-4 mb-4">
                                        Add
                                    </Button>
                                    <hr className='w-100 m-auto'/>
                                    {error ? (
                                        <div>
                                            <p className='error-text'>Please enter a unique dungeon name.</p>
                                        </div>
                                    ) : null}
                                </Form.Group>
                            </Form>
                          </Col>
                          <Col className='egg w-100 m-auto'>
                            <img src={require("../../images/dragon-egg.jpg")}
                            alt="Dragon Egg"
                            style={{ width: "500px" }}
                            />
                          </Col>
                        </Row>
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