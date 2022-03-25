import "./singleCampaign.css";

import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Button, Form } from "react-bootstrap";

import { useParams, useLocation } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import AreaForm from '../../components/AreaForm';
import AreaList from '../../components/AreaList';
import EditCampaign from "../../components/EditCampaign";
import { useSessionContext } from '../../utils/SessionContext.js';
import { QUERY_AREAS } from "../../utils/queries";
import { Link } from 'react-router-dom';

import { EDIT_CAMPAIGN } from '../../utils/mutations';


const SingleCampaign = () => {
  const location = useLocation();
  const { campaignData } = location.state;

  const notesDefault = () => {
    if (!campaignData.notes) {
      return false;
    }
    return true;
  };

  const [campaignNotes, setCampaignNotes] = useState(campaignData.notes);
  const [showNotes, setShowNotes] = useState(notesDefault());

  const { currentSession, setCampaign } = useSessionContext();
  // console.log(currentSession);

  // We can probably use this as a hack to get the context to set on reload, but it's throwing some weird errors and I don't have time to debug it.
  // if (Object.keys(currentSession.currentCampaign).length === 0) {
  //     console.log('Campaign Data: ', campaignData);
  //     setCampaign(campaignData);
  // };

  const [editCampaign, { error, updatedCampaign }] = useMutation(EDIT_CAMPAIGN);

  // No event argument or prevent default, since this isn't updated by form submission but rather each time handleChange is run.
  const handleCampaignSubmit = async () => {
    try {
      const { updatedNote } = await editCampaign({
        variables: {
          _id: campaignData._id,
          notes: campaignNotes,
        }
      });

    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'campaignNotes') {
      setCampaignNotes(value);
    }
  };

  // This works unless the user uses back/forward arrows. That will cause the campaignData's note value to revert to how it was previously rendered.
  useEffect(() => {
    handleCampaignSubmit();
    campaignData.notes = campaignNotes;
    console.log(campaignData);
  }, [campaignNotes]);

  const toggleNotes = () => {
    setShowNotes(!showNotes);
  };


  const { loading, data } = useQuery(QUERY_AREAS);

  const areas = data?.getAreas || [];

  // if (!loading) {
  //   console.log(areas)
  // };

  return (
    <Container className='my-campaign-container'>
      <Row className="page-header">
        <Col xs={6}>
          <h1 className="campaign-name mt-1">{campaignData.name}<EditCampaign campaign={campaignData} /></h1>
        </Col>
        <Col className="flex right-justify">
          <Link to={`/campaigns`}><h4>All Campaigns</h4></Link>
        </Col>
      </Row>

      <hr className='w-100 m-auto' />

      <Row className="mt-2">
        <Col>
          <Form.Group controlId="controlTextArea">
            <Form.Label className="interact mt-2" onClick={toggleNotes}>
              {showNotes ? 'Hide ' : 'Show'} Notes
            </Form.Label>
            {showNotes ?
              <Form.Control as="textarea" rows={4}
                onChange={handleChange}
                className="form-input"
                type="textarea"
                name="campaignNotes"
                defaultValue={campaignData.notes}
              />
              : null
            }
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <AreaForm areas={areas} campaign={campaignData}></AreaForm>
          {/* <h2 className="mb-3 mt-3 mx-3" style={{ color: "red", fontSize: "xxx-large" }}>Areas in {campaignData.name}</h2> */}
          <h2 className="mb-1 mt-3">Areas in {campaignData.name}</h2>
        </Col>
        {loading ? (
          <h2>
            Retrieving Data...
          </h2>
        ) : (
          <AreaList areas={areas} campaign={campaignData}></AreaList>
        )}
      </Row>
    </Container>
  );
}

export default SingleCampaign;
