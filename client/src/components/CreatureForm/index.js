import { Container, Col, Row, Button, Modal, Form, NumericInput } from "react-bootstrap";
import "./creatureForm.css";

import { ADD_CREATURE } from "../../utils/mutations";
import { useSessionContext } from "../../utils/SessionContext.js";

import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CreatureForm = ({ campaign, dungeon, room }) => {
    console.log(room);
    const [creatureText, setCreatureText] = useState('');
    const [roomOption, setRoomOption] = useState(room._id);
    const [hpOption, setHpOption] = useState('');
    const [creatureLoot, setCreatureLoot] = useState('');
    const [keyNpc, setKeyNpc] = useState(false);
    const [isAlive, setIsAlive] = useState(true);


    const { currentSession, setCurrentSession, setRoom, setDungeon } = useSessionContext();
    const { currentCampaign, currentDungeon, currentRoom } = currentSession;
    const [onShow, setOnShow] = useState(false);

    const [addCreature, { error, data }] = useMutation(ADD_CREATURE);

    const handleCreatureSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addCreature({
                variables: {
                    name: creatureText,
                    room: roomOption,
                    // room: room._id,
                    hp: hpOption,
                    loot: creatureLoot,
                    key_npc: keyNpc,
                    is_alive: isAlive,
                    is_active: true,
                    user: Auth.getProfile(),
                },
            });

            setCreatureText('');
            setHpOption('');
            setCreatureLoot('');
            setKeyNpc('');
            setIsAlive('');

            window.location.reload();

        } catch (error) {
            console.log(addCreature);
            console.error(error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'creatureText') {
            setCreatureText(value);
        }

        if (name === 'roomOption') {
            setRoomOption(value);
        }

        if (name === 'creatureHp') {
            setHpOption(parseInt(value));
        }

        if (name === 'creatureLoot') {
            setCreatureLoot(value);
        }

        if (name === 'keyNpc') {
            setKeyNpc(value);
        }

        if (name === 'isAlive') {
            setIsAlive(value);
        }
        console.log(value);
        console.log(typeof value);
    };


    return (
        <>
            {
                Auth.loggedIn() ? (
                    <Container>
                        <Modal show={onShow} onHide={() => setOnShow(false)} backdrop="static" keyboard={false} role="dialog">
                            <Form onSubmit={handleCreatureSubmit}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Creature Information</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                    <Form.Group className="mb-3" controlId="formBasicText">
                                        <Form.Label></Form.Label>
                                        <Form.Control
                                            autoFocus
                                            onChange={handleChange}
                                            value={creatureText}
                                            className="form-input"
                                            type="text"
                                            placeholder="Creature name"
                                            name="creatureText" />

                                        {error ? (
                                            <div>
                                                <p className="error-text">Please enter a creature name.</p>
                                            </div>
                                        ) : null}
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Associated Room</Form.Label>

                                        <Form.Select
                                            onChange={handleChange}
                                            value={roomOption}
                                            selected={room._id}
                                            name="roomOption">

                                            {currentDungeon.rooms && currentDungeon.rooms.map((room, pos) => (
                                                <option key={pos} value={room._id}>{room.name}</option>
                                            ))}
                                        </Form.Select>

                                        {error ? (
                                            <div>
                                                <p className='error-text'>Please select a dungeon</p>
                                            </div>
                                        ) : null}
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicText">
                                        <Form.Label></Form.Label>
                                        <Form.Control
                                            onChange={handleChange}
                                            value={hpOption}
                                            className="form-input"
                                            type="number"
                                            placeholder="Enter the hp of your creature"
                                            name="creatureHp"
                                        />

                                        {error ? (
                                            <div>
                                                <p className="error-text">Please enter a valid number of hitpoints.</p>
                                            </div>
                                        ) : null}
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="controlTextArea">
                                        <Form.Label>Loot</Form.Label>
                                        <Form.Control as="textarea" rows={4}
                                            onChange={handleChange}
                                            value={creatureLoot}
                                            className="form-input"
                                            type="textarea"
                                            placeholder="Amethyst of Evermore, Crown of Kings, etc."
                                            name="creatureLoot" />
                                        {error ? (
                                            <div>
                                                <p className='error-text'>Please add some loot. Creatures can be generous, too.</p>
                                            </div>
                                        ) : null}
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="controlTextArea">
                                        <Form.Label>Key NPC</Form.Label>
                                        <Form.Check
                                            onChange={handleChange}
                                            value={keyNpc}
                                            className="form-input"
                                            type="checkbox"
                                            name="keyNpc" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="controlTextArea">
                                        <Form.Label>Is alive?</Form.Label>
                                        <Form.Check
                                            onChange={handleChange}
                                            value={isAlive}
                                            className="form-input"
                                            type="checkbox"
                                            name="isAlive" />
                                    </Form.Group>





                                </Modal.Body>
                            </Form>
                            <Modal.Footer>
                                <Button onClick={handleCreatureSubmit} variant="primary">
                                    Submit
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Row>
                            <Col>
                                <Button onClick={() => setOnShow(!onShow)} className="mt-4 mb-5">
                                    Add Creature
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                ) : (
                    <p>
                        You need to be logged in. Please
                        <Link to="/login"> login</Link> or <Link to="/signup"> sign up</Link>
                    </p>
                )
            }
        </>
    );
}

export default CreatureForm;