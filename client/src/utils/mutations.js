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
  mutation addCampaign($name: String!, $notes: String!, $is_active: Boolean!) {
    addCampaign(name: $name, notes: $notes, is_active: $is_active) {
      name
      notes
      is_active
    }
  }
`;

export const EDIT_CAMPAIGN = gql`
  mutation editCampaign($_id: ID!, $name: String, $notes: String, $is_active: Boolean) {
    editCampaign(_id: $_id, name: $name, notes: $notes, is_active: $is_active) {
      name
      notes
    }
  }
`;

export const REMOVE_CAMPAIGN = gql`
  mutation removeCampaign($_id: ID!) {
    removeCampaign(_id: $_id) {
      name
      notes
    }
  }
`;

export const ADD_AREA = gql`
  mutation addArea($name: String!, $type: String!, $notes: String, $campaign: ID!, $is_active: Boolean) {
    addArea(name: $name, type: $type, notes: $notes, campaign: $campaign, is_active: $is_active) {
      _id
      name
      notes
      is_active
    }
  }
`;

export const EDIT_AREA = gql`
  mutation editArea($_id: ID!, $name: String, $type: String, $notes: String, $campaign: ID, $is_active: Boolean) {
    editArea(_id: $_id, name: $name, type: $type, notes: $notes, campaign: $campaign, is_active: $is_active) {
      _id
      name
      notes
      is_active
    }
  }
`;

export const REMOVE_AREA = gql`
  mutation removeArea($_id: ID!) {
    removeArea(_id: $_id) {
      name
      notes
    }
  }
`;

export const ADD_ROOM = gql`
  mutation addRoom($name: String!, $blurb: String, $notes: String, $area: ID!, $is_active: Boolean) {
    addRoom(name: $name, blurb: $blurb, notes: $notes, area: $area, is_active: $is_active) {
      name
      blurb
      is_active
    }
  }
`;

export const EDIT_ROOM = gql`
  mutation editRoom($_id: ID!, $name: String, $area: ID, $blurb: String, $notes: String, $is_active: Boolean) {
    addRoom(id: $_id, name: $name, area: $area, blurb: $blurb, notes: $notes, is_active: $is_active) {
      name
      blurb
      notes
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
      notes
      is_active
    }
  }
`;

export const ADD_CREATURE = gql`
  mutation addCreature($name: String!, $room: ID, $hp: Int, $loot: String, $notes: String, $key_npc: Boolean, $is_alive: Boolean, $is_active: Boolean) {
    addCreature(name: $name, room: $room, hp: $hp, loot: $loot, notes: $notes, key_npc: $key_npc, is_alive: $is_alive, is_active: $is_active) {
      name
      hp
      loot
      notes
      key_npc
      is_alive
      is_active
    }
  }
`;

export const EDIT_CREATURE = gql`
  mutation editCreature($_id: ID!, $name: String, $room: ID, $hp: Int, $loot: String, $notes: String, $key_npc: Boolean, $is_alive: Boolean, $is_active: Boolean) {
    addCreature(_id: $_id, name: $name, room: $room, hp: $hp, loot: $loot, notes: $notes, key_npc: $key_npc, is_alive: $is_alive, is_active: $is_active) {
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
      notes
      key_npc
      is_alive
      is_active
    }
  }
`;
