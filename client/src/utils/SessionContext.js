import React, { createContext, useContext, useState } from 'react';

const SessionContext = createContext();

export const useSessionContext = () => useContext(SessionContext);

const SessionProvider = (props) => {
  const [currentSession, setCurrentSession] = useState({
    currentCampaign: {},
    currentDungeon: {},
    currentRoom: {},
  });

  const setCampaign = (campaign) => {
    if (!campaign) {
      return;
    }

    setCurrentSession(
      {
        ...currentSession,
        currentCampaign: campaign.currentCampaign,
        currentDungeon: {},
        currentRoom: {},
      }
    )
  };

  const setDungeon = (dungeon) => {
    if (!dungeon) {
      return;
    } 

    setCurrentSession(
      {
        ...currentSession,
        currentDungeon: dungeon.currentDungeon,
        currentRoom: {},
      }
    )
  };

  const setRoom = (room) => {
    if (!room) {
      return;
    }

    setCurrentSession(
      {
        ...currentSession,
        currentRoom: room.currentRoom,
      }
    )
  };

  return (
    <SessionContext.Provider value={{ currentSession, setCampaign, setDungeon, setRoom }} {...props} />
  );
};

export default SessionProvider;
