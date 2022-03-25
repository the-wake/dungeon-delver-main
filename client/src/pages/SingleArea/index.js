import "./singleArea.css";

import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Button, Form } from 'react-bootstrap';

import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';

import EditArea from '../../components/EditArea';
import RoomForm from '../../components/RoomForm';
import RoomList from '../../components/RoomList';
import { QUERY_ROOMS } from "../../utils/queries";
import { useSessionContext } from '../../utils/SessionContext.js';
import { Link } from 'react-router-dom';

import { EDIT_AREA } from '../../utils/mutations';


const SingleArea = () => {
  const location = useLocation();
  var { areaData } = location.state;
  
  const notesDefault = () => {
    if (!areaData.notes) {
      return false;
    }
    return true;
  };

  const [areaNotes, setAreaNotes] = useState(areaData.notes);
  const [showNotes, setShowNotes] = useState(notesDefault());
  const { currentSession } = useSessionContext();
  // console.log(currentSession);
  // console.log('showNotes = ', showNotes);


  const [editArea, { error, updatedNote }] = useMutation(EDIT_AREA);

  const campaignData = areaData.campaign;

  // No event argument or prevent default, since this isn't updated by form submission but rather each time handleChange is run.
  const handleAreaSubmit = async () => {
    try {
      const { updatedNote } = await editArea({
        variables: {
          _id: areaData._id,
          notes: areaNotes,
        },
      });

    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'areaNotes') {
      setAreaNotes(value);
    }
  };

  // This works unless the user uses back/forward arrows. That will cause the areaData's note value to revert to how it was previously rendered.
  useEffect(() => {
    handleAreaSubmit();
    areaData.notes = areaNotes;
  }, [areaNotes]);

  const toggleNotes = () => {
    setShowNotes(!showNotes);
  }

  const { loading, data } = useQuery(QUERY_ROOMS, {
    variables: { area: areaData._id },
  });

  const rooms = data?.getRooms || [];

  // if (!loading) {
  //   console.log(rooms)
  // };


  return (
    <Container className='my-area-container'>
      <Row className="page-header">
        <Col xs={6}>
          {/* <h1 className="area-name" style={{ color: "seagreen" }}>{areaData.name}</h1> */}
          <h1 className="area-name mt-1">{areaData.name}<EditArea area={areaData} /></h1>
        </Col>
        <Col className="flex right-justify">
          {/* <Link to={`/campaigns/${campaignData._id}`} state={{ campaignData }}><h4 style={{ color: "seagreen" }}>{campaignData.name}</h4> */}
          <Link to={`/campaigns/${campaignData._id}`} state={{ campaignData }}><h4>{campaignData.name}</h4>
          </Link>
        </Col>
      </Row>

      <hr className="w-100 m-auto" />

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
                name="areaNotes"
                defaultValue={areaData.notes}
              />
              : null
            }
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <RoomForm area={areaData} campaign={campaignData}></RoomForm>
          <h2 className="mb-1 mt-3">Rooms in {areaData.name}</h2>
        </Col>
        {loading ? (
          <h2>
            Retrieving Data...
          </h2>
        ) : (
          <RoomList campaign={campaignData} area={areaData} rooms={rooms}></RoomList>
        )}
      </Row>

    </Container>
  );
}

export default SingleArea;
