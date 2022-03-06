import "./singleCampaign.css";
import { Container, Col, Row, Button } from "react-bootstrap";

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';


//this doesn't exist on the front-end yet
// import { QUERY_SINGLE_DUNGEON } from '../utils/queries';

const SingleCampaign = () => {
    // const { name } = useParams();

    // const { loading, data } = useQuery(QUERY_SINGLE_CAMPAIGN, {
    //     //have to pass state prop from campaignForm to 
    //     //retrieve new name
    //     variables: { name: props.name },
    // });

    // const campaign = data?.campaign || {};

    // if (loading) {
    //     return <div>
    //         <h3>Campaign loading...</h3>
    //     </div>
    // }

    return (
        <Container>
            <Col>
                <Row>
                    {/* <h1>{campaign}</h1> */}
                    <h1>Campaign Name</h1>
                </Row>
            </Col>
            <Col>
                <Row>
                    <Container>
                    <Button className="mt-4 mb-4" size="lg">
                        Edit Campaign
                    </Button>
                    </Container>
                    <Container>
                    <Button className="mb-3" size="lg">
                        Create Dungeon
                    </Button>
                    </Container>
                </Row>
            </Col>
            <Col>
                <Row>
                    <h1>Dungeons</h1>
                </Row>
            </Col>
        </Container>
    );
}

export default SingleCampaign;