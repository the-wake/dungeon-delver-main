import React, { createContext, useContext, useState } from 'react';

const SessionContext = createContext();

export const useSessionContext = () => useContext(SessionContext);

const SessionProvider = (props) => {
  const [currentSession, setCurrentSession] = useState({
    currentCampaign: '',
    currentCampaignId: '',
    currentDungeon: '',
    currentDungeonId: '',
    currentRoom: '',
    currentRoomId: '',
  });

  const setCampaign = (campaign) => {
    if (!campaign) {
      return;
    }

    setCurrentSession(
      {
        currentCampaign: campaign.currentCampaign,
        currentCampaignId: campaign.currentCampaignId,
      }
    )
  };

  const setDungeon = (dungeon) => {
    if (!dungeon) {
      return;
    }

    setCurrentSession(
      {
        currentDungeon: dungeon.currentDungeon,
        currentDungeonId: dungeon.currentDungeonId,
      }
    )
  };

  const setRoom = (room) => {
    if (!room) {
      return;
    }

    setCurrentSession(
      {
        currentRoom: room.currentRoom,
        currentRoomId: room.currentRoomId,
      }
    )
  };

  return (
    <SessionContext.Provider value={{ currentSession, setCampaign, setDungeon, setRoom }} {...props} />
  );
};

export default SessionProvider;
