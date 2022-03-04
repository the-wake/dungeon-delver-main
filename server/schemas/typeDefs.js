const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    campaigns: [Campaign]
  }

  type Campaign {
    name: String!
    is_active: Boolean !
  }

  type Dungeon {
    name: String!
    is_active: Boolean!
    campaign: Campaign!
  }

  type Room {
    name: String!
    blurb: String
    is_active: Boolean!
    dungeon: Dungeon!
    
  }

  type Creature {
    name: String!
    hp: Int!
    loot: String
    key_npc: Boolean
    is_alive: Boolean!
    is_active: Boolean!
    room: Room
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    allUsers: [User]
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addCampaign(name: String!, is_active: Boolean): Campaign
    addDungeon(campaign: String!, name: String!, is_active: Boolean): Dungeon
    addRoom(dungeon: String!, name: String!, blurb: String, is_active: Boolean): Room
    addCreature(room: String!, name: String!, hp: Int!, loot: String, key_npc: Boolean, is_alive: Boolean!, is_active: Boolean!): Creature
    removeCampaign: Campaign
    removeDungeon: Dungeon
    removeRoom: Room
    removeCreature: Creature
    editCampaign(_id: Int!, name: String, is_active: Boolean): Campaign
  }
`;

module.exports = typeDefs;
