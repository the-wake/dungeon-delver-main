import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client';

//bootstrap components
import { Button, Container, Row, ListGroup } from 'react-bootstrap';

//actions
import { ADD_CAMPAIGN } from '../../utils/mutations';
import { QUERY_CAMPAIGNS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const CampaignForm = () => {
    const [campaignText, setCampaignText] = useState('');

    const [addCampaign, { error }] = useMutation(ADD_CAMPAIGN, {
        update(cache, { data: { addCampaign } }) {
            try {
                const { campaigns } = cache.readQuery({ query: QUERY_CAMPAIGNS });

                cache.writeQuery({
                    query: QUERY_CAMPAIGNS,
                    data: { campaigns: [addCampaign, ...campaigns] },
                });
            } catch (error) {
                console.error(error);
            }

            //update me object's cache
            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, campaigns: [...me.thoughts, addCampaign] } },
            });
        },
    });

    const handleCampaignSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addCampaign({
                variables: {
                    //not really sure about these yet
                    // name,
                    // ??: Auth.getProfile().data.username,
                },
            });

            setCampaignText('');
        } catch (error) {
            console.error(err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'campaignText') {
            setCampaignText(value);
        }
    };

    return (
        <div>
            {Auth.loggedIn() ? (
                <>
                    <Container>
                        <h1>Add a New Campaign</h1>
                    </Container>
                    <Container>
                        <Row>
                            <Form onSubmit={handleCampaignSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicText">
                                    <Form.Label>Email</Form.Label>

                                    <Form.Control
                                        autoFocus
                                        onChange={handleChange}
                                        value={loginState.email}
                                        // id="text"
                                        className="form-input"
                                        type="email"
                                        placeholder="Email"
                                        name="email" />
                                </Form.Group>

                            </Form>
                        </Row>
                    </Container>
                    <Container>
                        <Button className="mt-4">
                            Create Campaign
                        </Button>
                    </Container>

                </>
            ) : (

                <p>
                    You need to be logged in to share your thoughts. Please{' '}
                    <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>

            )}
        </div>
    );
};

export default CampaignForm;