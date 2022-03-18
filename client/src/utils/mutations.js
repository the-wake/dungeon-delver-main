import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_CAMPAIGN = gql`
    mutation addCampaign($name: String!, $is_active: Boolean!) {
        addCampaign(name: $name, is_active: $is_active) {
            name
            is_active
        }
    }
`;

export const EDIT_CAMPAIGN = gql`
    mutation editCampaign($_id: ID!, $name: String, $is_active: Boolean) {
        editCampaign(_id: $_id, name: $name, is_active: $is_active) {
            name
        }
    }
`;

export const REMOVE_CAMPAIGN = gql`
    mutation removeCampaign($_id: ID!) {
        removeCampaign(_id: $_id) {
            name
        }
    }
`;

export const ADD_DUNGEON = gql`
    mutation addDungeon($name: String!, $campaign: ID!, $is_active: Boolean) {
        addDungeon(name: $name, campaign: $campaign, is_active: $is_active) {
            _id
            name
            is_active
        }
    }
`;

export const EDIT_DUNGEON = gql`
    mutation editDungeon($_id: ID!, $name: String!, $campaign: ID, $is_active: Boolean) {
        editDungeon(_id: $_id, name: $name, campaign: $campaign, is_active: $is_active) {
            _id
            name
            is_active
        }
    }
`;

export const REMOVE_DUNGEON = gql`
    mutation removeDungeon($_id: ID!) {
        removeDungeon(_id: $_id) {
            name
        }
    }
`;

export const ADD_ROOM = gql`
    mutation addRoom($name: String!, $blurb: String, $dungeon: ID!, $is_active: Boolean) {
        addRoom(name: $name, blurb: $blurb, dungeon: $dungeon, is_active: $is_active) {
            name
            blurb
            is_active
        }
    }
`;

export const EDIT_ROOM = gql`
    mutation editRoom($_id: ID!, $name: String, $dungeon: ID, $blurb: String, $is_active: Boolean) {
        addRoom(id: $_id, name: $name, dungeon: $dungeon, blurb: $blurb, is_active: $is_active) {
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
    }
`;

export const REMOVE_ROOM = gql`
    mutation removeRoom($room: String!) {
        removeRoom(room: $room) {
            name
            blurb
            is_active
        }
    }
`;

export const ADD_CREATURE = gql`
    mutation addCreature($name: String!, $room: ID, $hp: Int, $loot: String, $key_npc: Boolean, $is_alive: Boolean, $is_active: Boolean) {
        addCreature(name: $name, room: $room, hp: $hp, loot: $loot, key_npc: $key_npc, is_alive: $is_alive, is_active: $is_active) {
            name
            hp
            loot
            key_npc
            is_alive
            is_active
        }
    }
`;

export const EDIT_CREATURE = gql`
    mutation editCreature($_id: ID!, $name: String, $room: ID, $hp: Int, $loot: String, $key_npc: Boolean, $is_alive: Boolean, $is_active: Boolean) {
        addCreature(_id: $_id, name: $name, room: $room, hp: $hp, loot: $loot, key_npc: $key_npc, is_alive: $is_alive, is_active: $is_active) {
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
    }
`;

export const REMOVE_CREATURE = gql`
    mutation removeCreature($_Id: ID!) {
        removeCreature(_id: $_Id) {
            name
            hp
            loot
            key_npc
            is_alive
            is_active
        }
    }
`;
