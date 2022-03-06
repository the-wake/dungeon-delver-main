import React, { createContext, useContext } from 'react';

export const CampaignContext = createContext();

const SessionProvider = (props) => {
  const [currentSessioon, setCurrentSession] = useState({
    currentCampaign: '',
    currentCampaignId: '',
    currentDungeon: '',
    currentDungeonId: '',
    currentRoom: '',
    currentRoomId: '',
  });

  return (
    <SessionContext.Provider value={{ currentSession: campaignName, campaignId }} {...props} />
  );
};

export default SessionProvider;
