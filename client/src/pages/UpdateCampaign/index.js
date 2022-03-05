import { Container, Col, Row, Button } from "react-bootstrap";
import "./updateCampaign.css";

const UpdateCampaign = (props) => {
    return (
        <Container>
            <Col>
                <Row>
                    <h1>Update Campaign:
                        {/* {campaign} */}
                    </h1>
                </Row>
            </Col>
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
                                placeholder="New campaign name"
                                name="text" />
                            {error ? (
                                <div>
                                    <p className='error-text'>Please enter a new campaign name</p>
                                </div>
                            ) : null}
                        </Form.Group>
                    </Form>
                </Row>
            </Container>
            <Container>

                <Button onClick={handleCampaignSubmit} className="mt-4">
                    Submit
                </Button>
            </Container>
        </Container>
    );
}

export default UpdateCampaign;