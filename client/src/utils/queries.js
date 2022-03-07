import { gql } from '@apollo/client';

export const QUERY_CAMPAIGNS = gql`
  query getCampaigns {
    getCampaigns {
      _id
      name
      is_active
      user {
        _id  
        username
      }
    }
  }
`;

export const QUERY_SINGLE_CAMPAIGN = gql`
  query getCampaigns($_id: ID!) {
    getCampaign(_id: $_id) {
      _id
      name
      is_active
    }
  }
`;

export const QUERY_DUNGEONS = gql`
    query getDungeons {
        getDungeons {
            _id
            name
            is_active
            campaign {
                _id
                name
            }
            user {
                _id
                username
            }
        }
    }
`;

export const QUERY_SINGLE_DUNGEON = gql`
    query getDungeons($_id: ID!) {
        getDungeon(_id: $_id) {
            _id
            name
            is_active
            campaign {
                _id
                name
            }
        }
    }
`;

export const QUERY_ROOMS = gql`
    query getRooms($dungeon: ID!) {
        getRooms(dungeon: $dungeon) {
            _id
            name
            blurb
            is_active
            dungeon {
                _id
                name
            }
        }
    }
`;

export const QUERY_SINGLE_ROOM = gql`
    query getRooms($_id: ID!) {
        getRooms(_id: $_id) {
            _id
            name
            blurb
            is_active
            dungeon {
                _id
                name
            }
        }
    }
`;

export const QUERY_CREATURES = gql`
    query getCreatures {
        getCreatures {
            _id
            hp
            loot
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
    query getCreatures($_id: ID!) {
        creatures(_id: $_id) {
            hp
            loot
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
        dungeons {
            _id
          name
        }
      }
    }
  }
`;
