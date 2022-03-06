import React, { createContext, useContext, useState } from 'react';

export const SessionContext = createContext();

const SessionProvider = (props) => {
  const [currentSession, setCurrentSession] = useState({
    currentCampaign: '',
    currentCampaignId: '',
    currentDungeon: '',
    currentDungeonId: '',
    currentRoom: '',
    currentRoomId: '',
  });

  return (
    <SessionContext.Provider value={{ currentSession: { currentSession } }} {...props} />
  );
};

export default SessionProvider;
