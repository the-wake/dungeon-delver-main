const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Campaign {
    _id: ID!
    name: String!
    is_active: Boolean!
    user: User!
  }

  type Dungeon {
    _id: ID!
    name: String!
    is_active: Boolean!
    campaign: Campaign!
    user: User!
  }

  type Room {
    _id: ID!
    name: String!
    blurb: String
    is_active: Boolean!
    dungeon: Dungeon!
    user: User!
  }

  type Creature {
    _id: ID!
    name: String!
    room: Room
    hp: Int
    loot: String
    key_npc: Boolean!
    is_alive: Boolean!
    is_active: Boolean!
    user: User!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    allUsers: [User]
    me: User
    getCampaigns: [Campaign]
    getDungeons: [Dungeon]
    getRooms(dungeon: ID!): [Room]
    getCreatures(room: ID!): [Creature]
    getCampaign(campaignId: ID!): [Campaign]
    getDungeon(dungeonId: ID!): [Dungeon]
    getRoom(roomId: ID!): [Room]
    getCreature(creatureId: ID!): [Creature]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addCampaign(name: String!, is_active: Boolean!): Campaign
    addDungeon(name: String!, campaign: ID!, is_active: Boolean!): Dungeon
    addRoom(name: String!, blurb: String, dungeon: ID!, is_active: Boolean!): Room
    addCreature(name: String!, room: ID, hp: Int, loot: String, key_npc: Boolean, is_alive: Boolean, is_active: Boolean): Creature
    editCampaign(_id: ID!, name: String, is_active: Boolean): Campaign
    editDungeon(_id: ID!, name: String, is_active: Boolean): Dungeon
    editRoom(_id: ID!, name: String, blurb: String, is_active: Boolean): Room
    editCreature(_id: ID!, name: String, room: ID, hp: Int, loot: String, key_npc: Boolean, is_alive: Boolean, is_active: Boolean): Creature
    removeCampaign: Campaign
    removeDungeon: Dungeon
    removeRoom: Room
    removeCreature: Creature
  }
`;

module.exports = typeDefs;
