import { gql } from '@apollo/client';

export const QUERY_CAMPAIGNS = gql`
  query getCampaigns {
    getCampaigns {
      _id
      name
      is_active
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
            name
            is_active
            campaigns {
                name
            }
        }
    }`
;

export const QUERY_SINGLE_DUNGEON = gql`
    query getDungeons($_id: ID!) {
        getDungeon(_id: $_id) {
            name
            is_active
            campaigns {
                name
            }
        }
    }`
;

export const QUERY_ROOMS = gql`
    query getRooms {
        getRooms {
            name
            blurb
            is_active
            dungeon {
                name
                campaigns {
                    name
                }
            }
        }
    }`
;

export const QUERY_SINGLE_ROOM = gql`
    query getRooms($_id: ID!) {
        getRooms(_id: $_id) {
            name
            blurb
            is_active
            dungeon {
                name
                campaigns {
                    name
                }
            }
        }
    }`
;

export const QUERY_CREATURES = gql`
    query getCreatures {
        creatures {
            hp
            loot
            key_npc
            is_alive
            is_active
            rooms {
                name
                dungeons {
                    name
                    campaigns {
                        name
                    }
                }
            }
        }
    }`
;

export const QUERY_SINGLE_CREATURE = gql`
    query getCreatures($_id: ID!) {
        creatures(_id: $_id) {
            hp
            loot
            key_npc
            is_alive
            is_active
            rooms {
                name
                dungeons {
                    name
                    campaigns {
                        name
                    }
                }
            }
        }
    }`
;


export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      campaigns {
        name
        is_active
        dungeons {
          name
        }
      }
    }
  }
`;
