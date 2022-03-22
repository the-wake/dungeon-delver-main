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

export const ADD_AREA = gql`
    mutation addArea($name: String!, $type: String!, $campaign: ID!, $is_active: Boolean) {
        addArea(name: $name, type: $type, campaign: $campaign, is_active: $is_active) {
            _id
            name
            is_active
        }
    }
`;

export const EDIT_AREA = gql`
    mutation editArea($_id: ID!, $name: String!, $type: String!, $campaign: ID, $is_active: Boolean) {
        editArea(_id: $_id, name: $name, type: $type, campaign: $campaign, is_active: $is_active) {
            _id
            name
            is_active
        }
    }
`;

export const REMOVE_AREA = gql`
    mutation removeArea($_id: ID!) {
        removeArea(_id: $_id) {
            name
        }
    }
`;

export const ADD_ROOM = gql`
    mutation addRoom($name: String!, $blurb: String, $area: ID!, $is_active: Boolean) {
        addRoom(name: $name, blurb: $blurb, area: $area, is_active: $is_active) {
            name
            blurb
            is_active
        }
    }
`;

export const EDIT_ROOM = gql`
    mutation editRoom($_id: ID!, $name: String, $area: ID, $blurb: String, $is_active: Boolean) {
        addRoom(id: $_id, name: $name, area: $area, blurb: $blurb, is_active: $is_active) {
            name
            blurb
            is_active
            area {
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
                area {
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
