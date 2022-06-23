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
  query getCampaign($_id: ID!) {
    getCampaign(_id: $_id) {
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
  query getArea($_id: ID!) {
    getArea(_id: $_id) {
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
  query getRooms($area: ID!) {
    getRooms(area: $area) {
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
  query getRoom($_id: ID!) {
    getRoom(_id: $_id) {
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
      }
      is_active
    }
  }
`;

export const QUERY_CREATURES = gql`
  query getCreatures($room: ID!) {
    getCreatures(room: $room) {
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
  query getCreature($_id: ID!) {
    getCreature(_id: $_id) {
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
