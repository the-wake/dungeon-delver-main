const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth.js');
const { User, Campaign, Creature, Dungeon, Room } = require('../models');

// TODO: Add single-object lookups, creature routes, and modify routes.

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
    // TODO: Search for campaign from current context when able?
    getDungeons: async (parent, args, context) => {
      const dungeons = await Dungeon.find({}).populate('user').populate('campaign');
      console.log(dungeons);
      return dungeons;
    },
    getRooms: async (parent, { dungeon }, context) => {
      const rooms = await Room.find({ dungeon: dungeon, user: context.user._id }).populate('user').populate('dungeon');
      console.log(rooms);
      return rooms;
    },
    // getCreatures: async (parent, { room }, context) => {
    //   const creatures = await Creature.find()
    // }
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

      return { token, user };
    },
    addCampaign: async (parent, { name, is_active }, { user }) => {
      const campaign = await Campaign.create({ name, is_active, user });
      console.log(campaign);
      return campaign;
    },
    // Still need to get this to populate to the currently focused campaign.
    addDungeon: async (parent, { name, is_active }, { user }) => {
      const dungeon = await Dungeon.create({ name, is_active, user });
      console.log(dungeon);
      return dungeon;
    },
    addRoom: async (parent, { name, blurb, dungeon, is_active }, { user }) => {
      const room = await Room.create({ name, blurb, dungeon, is_active, user });
      console.log(room);
      return room;
    },
    addCreature: async (parent, { name, room, hp, loot, key_npc, is_alive, is_active }, { user }) => {
      const creature = await Creature.create({ name, room, hp, loot, key_npc, is_alive, is_active, user });
      console.log (creature);
      return creature;
    },
  },
};

module.exports = resolvers;
