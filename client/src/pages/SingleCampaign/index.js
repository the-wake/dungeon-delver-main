import "./singleCampaign.css";
import { Container, Col, Row, Button } from "react-bootstrap";

import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import AreaForm from '../../components/AreaForm';
import AreaList from '../../components/AreaList';
import EditCampaign from "../../components/EditCampaign";
import { useSessionContext } from '../../utils/SessionContext.js';
import { QUERY_AREAS } from "../../utils/queries";
import { Link } from 'react-router-dom';


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
