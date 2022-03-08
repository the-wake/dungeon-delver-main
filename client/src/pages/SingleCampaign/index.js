import "./singleCampaign.css";
import { Container, Col, Row, Button } from "react-bootstrap";

import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import DungeonForm from '../../components/DungeonForm';
import DungeonList from '../../components/DungeonList';
import EditCampaign from "../../components/EditCampaign";
import { useSessionContext } from '../../utils/SessionContext.js';
import { QUERY_DUNGEONS } from "../../utils/queries";


const SingleCampaign = () => {
    const { currentSession, setCampaign } = useSessionContext();
    console.log(currentSession);
    
    const location = useLocation();
    const { campaignData } = location.state;

    // We can probably use this as a hack to get the context to set on reload, but it's throwing some weird errors and I don't have time to debug it.
    // if (Object.keys(currentSession.currentCampaign).length === 0) {
    //     console.log('Campaign Data: ', campaignData);
    //     setCampaign(campaignData);
    // };

    const { loading, data } = useQuery(QUERY_DUNGEONS);

    const dungeons = data?.getDungeons || [];

    if (!loading) {
        console.log(dungeons)
    };

    return (

        <Container className='my-campaign-container'>
            <Row>
            <Col xs={10}>
                <h1 className="campaign-name mt-1">{campaignData.name}</h1>
                </Col>
                <Col className="flex">
                    <EditCampaign campaign={campaignData}></EditCampaign>
            </Col>
            </Row>
            <Row>
                <Col>
                    
                </Col>
            </Row>

            <Row>
                <DungeonForm dungeons={dungeons} campaign={campaignData}></DungeonForm>
                <h2 className="mb-3 mt-3 mx-3">Dungeons in {campaignData.name}</h2>
                {loading ? (
                    <h2>
                        Retrieving Data...
                    </h2>
                ) : (
                    <DungeonList dungeons={dungeons} campaign={campaignData}></DungeonList>
                )}
            </Row>

        </Container>
    );
}

export default SingleCampaign;
