import { gql } from '@apollo/client';

export const QUERY_CAMPAIGNS = gql`
  query getCampaigns {
    getCampaigns {
      _id
      name
      areas {
          _id
          name
          type
      }
      notes
      is_active
      user {
        _id  
        username
      }
    }
  }
`;

export const QUERY_SINGLE_CAMPAIGN = gql`
  query getCampaign($campaignId: ID!) {
    getCampaign(campaignId: $campaignId) {
      _id
      name
      areas {
          _id
          name
          type
      }
      notes
      is_active
    }
  }
`;

export const QUERY_AREAS = gql`
  query getAreas {
    getAreas {
      _id
      name
      type
      rooms {
        _id
        name
      }
      notes
      campaign {
        _id
        name
      }
      is_active
      user {
        _id
        username
      }
    }
  }
`;

export const QUERY_SINGLE_AREA = gql`
  query getArea($areaId: ID!) {
    getArea(areaId: $areaId) {
      _id
      name
      type
      rooms {
        _id
        name
      }
      notes
      campaign {
        _id
        name
      }
      is_active
    }
  }
`;

export const QUERY_ROOMS = gql`
  query getRooms($areaId: ID!) {
    getRooms(areaId: $areaId) {
      _id
      name
      blurb
      creatures {
        _id
        name
      }
      notes
      area {
        _id
        name
        type
      }
      connections {
        _id
        name
        blurb
      }
      is_active
    }
  }
`;

export const QUERY_SINGLE_ROOM = gql`
  query getRoom($roomId: ID!) {
    getRoom(roomId: $roomId) {
      _id
      name
      blurb
      creatures {
        _id
        name
      }
      notes
      area {
        _id
        name
      }
      connections {
        _id
        name
        blurb
        creatures {
          _id
        }
      }
    }
  }
`;

export const QUERY_CREATURES = gql`
  query getCreatrues($roomId: ID!) {
    getCreatures(roomId: $roomId) {
      _id
      name
      hp
      loot
      notes
      key_npc
      is_alive
      is_active
      room {
        _id
        name
      }
    }
  }
`;

export const QUERY_SINGLE_CREATURE = gql`
  query getCreature($creatureId: ID!) {
    getCreature(creatureId: $creatureId) {
      hp
      name
      loot
      notes
      key_npc
      is_alive
      is_active
      room {
        _id
        name
      }
    }
  }
`;


export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      campaigns {
        _id
        name
        is_active
        areas {
          _id
          name
          type
        }
      }
    }
  }
`;
