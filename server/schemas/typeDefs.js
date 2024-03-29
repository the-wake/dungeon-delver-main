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
    areas: [Area]
    notes: String
    is_active: Boolean!
    user: User!
  }

  type Area {
    _id: ID!
    name: String!
    type: String!
    rooms: [Room]
    notes: String
    is_active: Boolean!
    campaign: Campaign!
    user: User!
  }

  type Room {
    _id: ID!
    name: String!
    blurb: String
    creatures: [Creature]
    notes: String
    area: Area!
    connections: [Room]
    is_active: Boolean!
    user: User!
  }

  type Creature {
    _id: ID!
    name: String!
    room: Room
    hp: Int
    loot: String
    notes: String
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
    getAreas: [Area]
    getRooms(areaId: ID!): [Room]
    getCreatures(roomId: ID!): [Creature]
    getCampaign(campaignId: ID!): Campaign
    getArea(areaId: ID!): Area
    getRoom(roomId: ID!): Room
    getCreature(creatureId: ID!): Creature
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addCampaign(name: String!, notes: String, is_active: Boolean): Campaign
    addArea(name: String!, type: String!, campaign: ID!, notes: String, is_active: Boolean): Area
    addRoom(name: String!, blurb: String, area: ID!, notes: String, is_active: Boolean): Room
    addCreature(name: String!, room: ID, hp: Int, loot: String, notes: String, key_npc: Boolean, is_alive: Boolean, is_active: Boolean): Creature
    editCampaign(_id: ID!, name: String, notes: String, is_active: Boolean): Campaign
    editArea(_id: ID!, name: String, type: String, campaign: ID, notes: String, is_active: Boolean): Area
    editRoom(_id: ID!, name: String, area: ID, blurb: String, notes: String, is_active: Boolean): Room
    addConnection(_id: ID!, connection: ID!): Room
    editCreature(_id: ID!, name: String, room: ID, hp: Int, loot: String, notes: String, key_npc: Boolean, is_alive: Boolean, is_active: Boolean): Creature
    removeCampaign(_id: ID!): Campaign
    removeArea(_id: ID!): Area
    removeRoom(_id: ID!): Room
    removeCreature(_id: ID!): Creature
  }
`;

module.exports = typeDefs;
