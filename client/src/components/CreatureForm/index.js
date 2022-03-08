import { Container, Col, Row, Button, Modal, Form } from "react-bootstrap";
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
                            <Form onSubmit={handleEditSubmit}>
                                <Modal.Header closeButton>
                                    <Modal.Title>New Campaign Name</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                    <Form.Group className="mb-3" controlId="formBasicText">
                                        <Form.Label></Form.Label>
                                        <Form.Control
                                            autoFocus
                                            onChange={handleChange}
                                            value={campaignText.name}
                                            className="form-input"
                                            type="text"
                                            placeholder="Enter the name of your campaign"
                                            name="campaignText" />

                                        {error ? (
                                            <div>
                                                <p className="error-text">Please enter a campaign name.</p>
                                            </div>
                                        ) : null}
                                    </Form.Group>

                                </Modal.Body>
                            </Form>
                            <Modal.Footer>
                                <Button onClick={handleEditSubmit} variant="primary">
                                    Submit
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Row>
                            <Col>
                                <Button onClick={() => setOnShow(!onShow)} className="mt-4 mb-5">
                                    Edit Campaign
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