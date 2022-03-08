import React, { useState } from 'react';

import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client';


//bootstrap components
import { Button, Container, Row, Form, Col } from 'react-bootstrap';

//actions
import { ADD_CAMPAIGN } from '../../utils/mutations';
// import { QUERY_CAMPAIGNS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const CampaignForm = (props) => {
    const [campaignText, setCampaignText] = useState('');

    const [addCampaign, { error, data }] = useMutation(ADD_CAMPAIGN);

    // const [addCampaign, { error, data }] = useMutation(ADD_CAMPAIGN, {
    // update(cache, { data: { addCampaign } }) {
    //     try {
    //         const campaigns = cache.readQuery({ query: QUERY_CAMPAIGNS,
    //         variables: {
    //             name: campaignText,
    //             is_active: true,
    //             // ...campaignText
    //         }
    //         });
    //         console.log("there", campaigns)
    //         cache.writeQuery({
    //             query: QUERY_CAMPAIGNS,
    //             data: { campaigns: [addCampaign, campaigns] },
    //         });
    //     } catch (error) {
    //         console.error(error);
    //     }

    //     //update me object's cache
    //     const me = cache.readQuery({ query: QUERY_ME });
    //     cache.writeQuery({
    //         query: QUERY_ME,
    //         data: { me: { ...me, campaigns: [...me.campaigns, addCampaign] } },
    //     });
    // },
    // });

    const handleCampaignSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addCampaign({
                variables: {
                    name: campaignText,
                    is_active: true,
                    user: Auth.getProfile(),
                },
            });
            console.log("Campaign Data:", data)

            setCampaignText('');

            // I'd like to have this redirect to the new campaign when submitted, but I can't figure out how to capture the ID from the newly-added campaign (since it's not passed in the variables).
            window.location = `/campaigns`


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
                    <Container className='form-container'>
                        <h1>Add a New Campaign</h1>
                    
                    <Col>
                        <Row>
                            <Form onSubmit={handleCampaignSubmit}>
                                <Form.Group className="mb-3 w-50" controlId="formBasicText">
                                    <Form.Label></Form.Label>
                                    <Form.Control
                                        autoFocus
                                        onChange={handleChange}
                                        value={campaignText.name}
                                        // id="text"
                                        className="form-input"
                                        type="text"
                                        placeholder="Campaign name"
                                        name="campaignText" />
                                    <Button onClick={handleCampaignSubmit} className="mt-4 mb-4">
                                        Add
                                    </Button>
                                    <hr className='w-100 m-auto'/>
                                    {error ? (
                                        <div>
                                            <p className='error-text'>Please enter a unique campaign name</p>
                                        </div>
                                    ) : null}
                                </Form.Group>
                            </Form>
                        </Row>
                    </Col>
                    </Container>
                </>
            ) : (

                <p>
                    You need to be logged in. Please
                    <Link to="/login"> login</Link> or <Link to="/signup"> sign up</Link>
                </p>

            )}
            {/* <Campaign
                campaignText={} /> */}
        </div>
    );
};

export default CampaignForm;