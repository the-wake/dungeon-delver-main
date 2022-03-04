const { gql } = require('apollo-server-express');

const typeDefs = gql`
  input UserInput {
    username: String!
    email: String!
  }

  type User {
    _id: ID
    username: String!
    email: String!
  }

  type Campaign {
    name: String!
    is_active: Boolean!
    user: User
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
    name: String
    hp: Int
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
    getCampaigns: [Campaign]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addCampaign(name: String!, is_active: Boolean!, user: ID!): Campaign
  }
`;

module.exports = typeDefs;
