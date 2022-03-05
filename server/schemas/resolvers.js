const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth.js');
const { User, Campaign, Creature, Dungeon, Room } = require('../models');

// It might be helpful if we establish the relationship hierarchy bottom-up (e.g. adding a Creatures field to Room, and Rooms field to Dungeon, etc.) alongside the top-down relationship.

const resolvers = {
  Query: {
    allUsers: async (parent, args) => {
      const users = await User.find();
      console.log(users);
      return users;
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('campaigns');
      }
      throw new AuthenticationError('Please log in first.');
    },
    getCampaigns: async (parent, args, context) => {
      console.log(context.user);
      const campaigns = await Campaign.find({ user: context.user._id }).populate('user');
      // console.log(campaigns);
      return campaigns;
    },
    // TODO: Filter search by campaign from current context when able?
    getDungeons: async (parent, args, context) => {
      const dungeons = await Dungeon.find({}).populate('user').populate('campaign');
      console.log(dungeons);
      return dungeons;
    },
    getRooms: async (parent, { dungeon }, { user }) => {
      const rooms = await Room.find({ dungeon, user }).populate('user').populate('dungeon');
      console.log(rooms);
      return rooms;
    },
    getCreatures: async (parent, { room }, { user }) => {
      const creatures = await Creature.find({ room, user }).populate('user').populate('room');
      console.log(creatures);
      return creatures;
    },
    getCampaign: async (parent, { campaignId }, { user }) => {
      const campaign = await Campaign.find({ _id: campaignId, user }).populate('user');
      console.log(campaign);
      return campaign;
    },
    getDungeon: async (parent, { dungeonId }, { user }) => {
      const dungeon = await Dungeon.find({ _id: dungeonId, user }).populate('user').populate('campaign');
      console.log(dungeon);
      return dungeon;
    },
    getRoom: async (parent, { roomId }, { user }) => {
      const room = await Room.find({ _id: roomId, user }).populate('user').populate('dungeon');
      console.log(room);
      return room;
    },
    getCreature: async (parent, { creatureId }, { user }) => {
      const creature = await Creature.find({ _id: creatureId, user }).populate('user').populate('room');
      console.log(creature);
      return creature;
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      // console.log(args);
      const user = await User.create(args);
      console.log(user);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      console.log(`Logged in as ${user.username} Copy the followint token into your GraphQL Headers as an Authentication key to validate your login on the backend.\n-----------------------------\nBearer ${token}`);
      
      return { token, user };
    },
    addCampaign: async (parent, { name, is_active }, { user }) => {
      const campaign = await Campaign.create({ name, is_active, user });
      console.log(campaign);
      return campaign;
    },
    // Still need to get this to populate to the currently focused campaign.
    addDungeon: async (parent, { name, campaign, is_active }, { user }) => {
      const dungeon = await Dungeon.create({ name, campaign, is_active, user });
      console.log(dungeon);
      return dungeon;
    },
    addRoom: async (parent, { name, blurb, dungeon, is_active }, { user }) => {
      const room = await Room.create({ name, blurb, dungeon, is_active, user });
      console.log(room);
      return room;
    },
    addCreature: async (parent, { name, room, hp, loot, key_npc, is_alive, is_active }, { user }) => {
      const creature = await Creature.create({ name, room, hp, loot, key_npc, user, is_alive, is_active });
      console.log(creature);
      return creature;
    },
    editCampaign: async (parent, { _id, name, is_active }, { user }) => {
      const campaign = await Campaign.findOneAndUpdate({ _id: _id, user }, { name, is_active }, { new: true });
      console.log(campaign);
      return campaign;
    },
    editDungeon: async (parent, { _id, name, is_active }, { user }) => {
      const dungeon = await Dungeon.findOneAndUpdate({ _id: _id, user }, { name, is_active }, { new: true });
      console.log(dungeon);
      return dungeon;
    },
    editRoom: async (parent, { _id, name, blurb, is_active }, { user }) => {
      const room = await Room.findOneAndUpdate({ _id, user }, { name, blurb, is_active }, { new: true });
      console.log(room);
      return room;
    },
    editCreature: async (parent, { _id, name, room, hp, loot, key_npc, is_alive, is_active }, { user }) => {
      const creature = await Creature.findOneAndUpdate({ _id: _id, user }, { name, room, hp, loot, key_npc, is_alive, is_active }, { new: true });
      console.log(creature);
      return creature;
    },
  },
};

module.exports = resolvers;
