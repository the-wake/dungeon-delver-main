import React, { createContext, useContext } from 'react';

export const CampaignContext = createContext();

const CampaignProvider = (props) => {
  const [currentCampaign, setCurrentCampaign] = useState({
    campaignName: '',
    campaignId: '',
  });

  return (
    <CampaignContext.Provider value={{ currentCampaign: campaignName, campaignId }} {...props} />
  );
};

export default CampaignProvider;
