import { gql } from '@apollo/client';

export const ADD_CAMPAIGN = gql`
    mutation addCampaign($name: String!, $is_active: Boolean!) {
        addCampaign(name: $name, is_active: $is_active) {
            name
            is_active
        }
    }`;

// export const EDIT_CAMPAIGN = gql`
//     mutation editCampaign($_id, Int!, $name: String, $is_active: Boolean) {
//         editCampaign(id: $_id, name: $name, is_active: $is_active) {
//             name
//             is_active
//         }
    // }`
  
export const REMOVE_CAMPAIGN = gql`
    mutation removeCampaign($campaign: String!) {
        removeCampaign(campaign: $campaign) {
            name
            is_active
        }
    }`;

export const ADD_DUNGEON = gql`
    mutation addDungeon($campaign: String!, $name: String!, $is_active: Boolean) {
        addDungeon(campaign: $campaign, name: $name, is_active: $is_active) {
            _id
            name
            is_active
            campaign {
                name
            }
        }
    }`;

// export const EDIT_DUNGEON = gql`
//     mutation editDungeon()`

export const REMOVE_DUNGEON = gql`
    mutation removeDungeon($dungeon: String!) {
        removeDungeon(dungeon: $dungeon) {
            name
            is_active
        }
    }`;

export const ADD_ROOM = gql`
    mutation addRoom($dungeon: String!, $name: String!, $blurb: String!, $is_active: Boolean) {
        addRoom(dungeon: $dungeon, name: $name, blurb: $blurb, is_active: $is_active) {
            name
            blurb
            is_active
            dungeon {
                name
                campaign {
                    name
                }
            }
        }
    }`;

// export const EDIT_ROOM = gql``

export const REMOVE_ROOM = gql`
    mutation removeRoom($room: String!) {
        removeRoom(room: $room) {
            name
            blurb
            is_active
        }
    }`

export const ADD_CREATURE = gql`
    mutation addCreature($room: String!, $name: String!, $hp: Number!, $loot: String!, $key_npc: Boolean, $is_alive: Boolean, $is_active: Boolean) {
        addCreature(room: $room, name: $name, hp: $hp, loot: $loot, key_npc: $key_npc, is_alive: $is_alive, is_active: $is_active) {
            name
            hp
            loot
            key_npc
            is_alive
            is_active
            room {
                name
                dungeon {
                    name
                    campaign {
                        name
                    }
                }
            }
            
        }
    }`;

// export const EDIT_CREATURE = gql``

export const REMOVE_CREATURE = gql`
    mutation removeCreature($creature: String!) {
        removeCreature(creature: $creature) {
            name
            hp
            loot
            key_npc
            is_alive
            is_active
        }
    }`

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }`;
