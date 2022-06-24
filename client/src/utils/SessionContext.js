import React, { createContext, useContext, useState } from 'react';

const SessionContext = createContext();

export const useSessionContext = () => useContext(SessionContext);

// TODO: We may want to make these not objects any more. Each should be one datum that *is* an object, in which we have a field for id and for name.
const SessionProvider = (props) => {
  const [currentSession, setCurrentSession] = useState({
    currentCampaign: {},
    currentArea: {},
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
        currentArea: {},
        currentRoom: {},
      }
    )
  };

  const setArea = (area) => {
    if (!area) {
      return;
    } 

    setCurrentSession(
      {
        ...currentSession,
        currentArea: area.currentArea,
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
    <SessionContext.Provider value={{ currentSession, setCampaign, setArea, setRoom }} {...props} />
  );
};

export default SessionProvider;
