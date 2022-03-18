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
      <Row className="page-header">
        <Col>
          <h1 className="campaign-name">{campaignData.name}<EditCampaign campaign={campaignData} /></h1>
        </Col>
      </Row>

      <hr className='w-100 m-auto' />

      <Row>
        <Col>
          <DungeonForm dungeons={dungeons} campaign={campaignData}></DungeonForm>
          {/* <h2 className="mb-3 mt-3 mx-3" style={{ color: "red", fontSize: "xxx-large" }}>Dungeons in {campaignData.name}</h2> */}
          <h2 className="mb-3 mt-3 mx-3">Dungeons in {campaignData.name}</h2>
        </Col>
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
