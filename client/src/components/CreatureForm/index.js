import { Container, Col, Row, Button, Modal, Form, NumericInput } from "react-bootstrap";
import "./creatureForm.css";

import { ADD_CREATURE } from "../../utils/mutations";
import { useSessionContext } from "../../utils/SessionContext.js";

import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CreatureForm = () => {
    const [creatureText, setCreatureText] = useState('');
    const { currentSession, setCurrentSession, setRoom, setDungeon } = useSessionContext();
    const { currentCampaign, currentDungeon, currentRoom } = currentSession;
    const [onShow, setOnShow] = useState(false);

    const [addCreature, { error, data }] = useMutation(ADD_CREATURE);

    const handleCreatureSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addCreature({
                variables: {
                    // _id: campaign._id,
                    // name: campaignText,
                    // is_active: true,
                },
            });
            console.log(data);
            // setCurrentSession({ currentCampaign: campaign.name, currentCampaignId: campaign._id });
            // console.log('*****************************\nCurrent Session:\n', currentSession);

            setCreatureText('');

            window.location.reload();

        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'creatureText') {
            setCreatureText(value);
        }
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
                                            value={creatureText.name}
                                            className="form-input"
                                            type="text"
                                            placeholder="Enter the name of your creature"
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
                                            // value={creatureOption.creature}
                                            >

                                            {/* {currentCampaign.dungeons && currentCampaign.dungeons.map((dungeon, pos) => (
                                                    <option key={pos} value={dungeon._id}>{dungeon.name}</option>
                                                ))} */}

                                        </Form.Select>

                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicText">
                                        <Form.Label></Form.Label>
                                        <Form.Control
                                            onChange={handleChange}
                                            // value={creatureText.name}
                                            className="form-input"
                                            type="number"
                                            placeholder="Enter the hp of your creature"
                                            // name="creatureText" 
                                            />

                                        {error ? (
                                            <div>
                                                <p className="error-text">Please enter a creature name.</p>
                                            </div>
                                        ) : null}
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="controlTextArea">
                                            <Form.Label>Loot</Form.Label>
                                            <Form.Control as="textarea" rows={4}
                                                onChange={handleChange}
                                                // value={roomLoot.loot}
                                                className="form-input"
                                                type="textarea"
                                                placeholder="Amethyst of Evermore, Crown of Kings, etc."
                                                name="blurbText" />
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
                                                // value={roomLoot.loot}
                                                className="form-input"
                                                type="checkbox"
                                                name="blurbText" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="controlTextArea">
                                            <Form.Label>Key NPC</Form.Label>
                                            <Form.Check
                                                onChange={handleChange}
                                                // value={roomLoot.loot}
                                                className="form-input"
                                                type="checkbox"
                                                name="blurbText" />
                                        </Form.Group>


                                    {/* {error ? (
                                                <div>
                                                    <p className='error-text'>Please select a dungeon</p>
                                                </div>
                                            ) : null}
                                        </Form.Group> */}



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