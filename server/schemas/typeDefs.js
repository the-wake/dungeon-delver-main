const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    userName: String!
    email: String!
    campaigns: [Campaign]
  }

  type Campaign {
    name: String
    is_active: Boolean 
  }

  type Dungeon {
    name: String
    is_active: Boolean
    campaign: Campaign    
  }

  type Room {
    name: String
    blurb: String
    is_active: Boolean
    dungeon: Dungeon
    
  }

  type Creature {
    name: String
    hp: Number
    loot: String
    key_npc: Boolean
    is_alive: Boolean
    is_active: Boolean
    room: Room
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
