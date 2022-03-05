import React, { useState } from 'react';
import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client';

//bootstrap components
import { Button, Container, Row } from 'react-bootstrap';

//actions
import { ADD_CAMPAIGN } from '../../utils/mutations';
import { QUERY_CAMPAIGNS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const CampaignForm = (props) => {
    const [campaignText, setCampaignText] = useState('');

    const [addCampaign, { error, data }] = useMutation(ADD_CAMPAIGN, {
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
                data: { me: { ...me, campaigns: [...me.campaigns, addCampaign] } },
            });
        },
    });

    const handleCampaignSubmit = async (event) => {
        event.preventDefault();
        console.log("here", handleCampaignSubmit)
        try {
            const { data } = await addCampaign({
                variables: {
                    
                    // ...campaignText
                    name: campaignText,
                    // is_active: true
                    // ?: Auth.getProfile().data.username,
                },
            });
            console.log("right here", data)

            setCampaignText('');
        } catch (error) {
            console.error(error);
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
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicText">
                                    <Form.Label></Form.Label>
                                    <Form.Control
                                        autoFocus
                                        onChange={handleChange}
                                        // value={campaignText}
                                        // id="text"
                                        className="form-input"
                                        type="text"
                                        placeholder="Campaign name"
                                        name="text"/>
                                    {error ? (
                                        <div>
                                            <p className='error-text'>Please enter a campaign name</p>
                                        </div>
                                    ) : null}
                                </Form.Group>
                            </Form>
                        </Row>
                    </Container>
                    <Container>
        
                        <Button onClick={handleCampaignSubmit} className="mt-4">
                            Create Campaign
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

export default CampaignForm;