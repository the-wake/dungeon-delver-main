import { Container, Col, Row, Button, Modal, Form } from "react-bootstrap";
import "./editCampaign.css";

import { EDIT_CAMPAIGN } from "../../utils/mutations";
import { useSessionContext } from "../../utils/SessionContext.js";

import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EditCampaign = ({ campaign }) => {
  const [campaignName, setCampaignName] = useState('');
  const { currentSession, setCampaign } = useSessionContext();
  const [onShow, setOnShow] = useState(false);

  // var campaignId = campaign._id;
  // console.log(campaignId);
  const [editCampaign, { error, data }] = useMutation(EDIT_CAMPAIGN);

  const handleEditSubmit = async (event) => {

    event.preventDefault();
    try {
      const { data } = await editCampaign({
        variables: {
          _id: campaign._id,
          name: campaignName,
          is_active: true,
        },
      });
      console.log(data);
      setCampaign({ currentCampaign: campaign });
      console.log('*****************************\nCurrent Session:\n', currentSession);

      setCampaignName('');

      window.location.reload();

    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'campaignName') {
      setCampaignName(value);
    }
  };


  return (
    <>
      {
        Auth.loggedIn() ? (
          <>
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
                      value={campaignName}
                      className="form-input"
                      type="text"
                      placeholder="Enter the name of your campaign"
                      name="campaignName" />

                    {error ? (
                      <div>
                        <p className="error-text">Please enter a campaign name.</p>
                      </div>
                    ) : null}
                  </Form.Group>

                </Modal.Body>
              </Form>
              <Modal.Footer>
                <Button onClick={handleEditSubmit} variant="outline-dark">
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
            {/* <Button onClick={() => setOnShow(!onShow)} className="right-element" variant="outline-dark">
              Edit Campaign
            </Button> */}
            <i className="bi-pencil icon" onClick={() => setOnShow(!onShow)} />
            {/* <Button onClick={() => setOnShow(!onShow)} className="mt-4 mb-5" variant="danger" style={{ color: "black" }}> */}
          </>
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

export default EditCampaign;