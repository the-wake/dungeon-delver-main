const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth.js');
const { User, Campaign, Creature, Dungeon, Room } = require('../models');

// It might be helpful if we establish the relationship hierarchy bottom-up (e.g. adding a Creatures field to Room, and Rooms field to Dungeon, etc.) alongside the top-down relationship.

const resolvers = {
  Query: {
    // This won't be used on the front end; it's just for testing and admin.
    allUsers: async () => {
      const users = await User.find();
      console.log(users);
      return users;
    },
    me: async (parent, args, { user }) => {
      if (!user) {
        throw new AuthenticationError('You aren\'t logged in!');
      };

      const users = await User.findOne(user);
      console.log(users);
      return users;
    },
    getCampaigns: async (parent, args, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please log in first.');
      };

      const campaigns = await Campaign.find({ user: user._id }).populate('user').populate('dungeons');
      
      if (!campaigns) {
        throw new AuthenticationError('You have no campaigns!')
      };
      
      console.log(campaigns);
      console.log(user._id);
      return campaigns;
    },
    getDungeons: async (parent, args, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please log in first.');
      };

      const dungeons = await Dungeon.find({ user: user._id }).populate('user').populate('campaign').populate('rooms');
      console.log(dungeons);
      
      if (!dungeons) {
        throw new AuthenticationError('You have no dungeons!')
      };

      return dungeons;
    },
    getRooms: async (parent, { dungeon }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please log in first.');
      };
     
      const rooms = await Room.find({ dungeon, user: user._id }).populate('user').populate('dungeon').populate('creatures');
      console.log(rooms);
      
      if (!rooms) {
        throw new AuthenticationError('You have no rooms in this dungeon!')
      };

      return rooms;
    },
    getCreatures: async (parent, { roomId }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please log in first.');
      };

      const creatures = await Creature.find({ roomId, user: user._id }).populate('user').populate('room');
      console.log(creatures);
      
      if (!creatures) {
        throw new AuthenticationError('There are no creatures in this room!')
      };
      
      return creatures;
    },
    getCampaign: async (parent, { campaignId }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please log in first.');
      };

      const campaign = await Campaign.findOne({ _id: campaignId, user }).populate('user').populate('dungeons');
      console.log(campaign);
      
      if (!campaign) {
        throw new AuthenticationError('Campaign not found.')
      };

      return campaign;
    },
    getDungeon: async (parent, { dungeonId }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please log in first.');
      };

      const dungeon = await Dungeon.findOne({ _id: dungeonId, user }).populate('user').populate('campaign').populate('rooms');
      console.log(dungeon);
      
      if (!dungeon) {
        throw new AuthenticationError('Dungeon not found.')
      };

      return dungeon;
    },
    getRoom: async (parent, { roomId }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please log in first.');
      };

      const room = await Room.findOne({ _id: roomId, user }).populate('user').populate('dungeon').populate('creatures');
      console.log(room);

      if (!room) {
        throw new AuthenticationError('Room not found.')
      };

      return room;
    },
    getCreature: async (parent, { creatureId }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please log in first.');
      };

      const creature = await Creature.findOne({ _id: creatureId, user }).populate('user').populate('room');
      console.log(creature);

      if (!creature) {
        throw new AuthenticationError('Creature not found.')
      };

      return creature;
    },
  },
  Mutation: {
    // USER ROUTES
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
        throw new AuthenticationError('Incorrect credentials.');
      };

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials.');
      };

      const token = signToken(user);
      console.log(`Logged in as ${user.username} Copy the following token into your GraphQL Headers as an Authentication key to validate your login on the backend.\n-----------------------------\nBearer ${token}`);
      
      return { token, user };
    },
    // ADD ROUTES
    addCampaign: async (parent, { name, is_active }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please log in first.');
      };

      const campaign = await Campaign.create({ name, is_active, user });
      console.log(campaign);

      if (!campaign) {
        throw new AuthenticationError('Something went wrong. Please make sure you\'ve filled out the necessary fields and have entered a unique name.')
      };

      return campaign;
    },
    // Still need to get this to populate to the currently focused campaign.
    addDungeon: async (parent, { name, campaign, is_active }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please log in first.');
      };

      const dungeon = await Dungeon.create({ name, campaign, is_active, user });
      console.log(dungeon);

      if (!dungeon) {
        throw new AuthenticationError('Something went wrong. Please make sure you\'ve filled out the necessary fields and have entered a unique name.')
      };

      return dungeon;
    },
    addRoom: async (parent, { name, blurb, dungeon, is_active }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please log in first.');
      };

      const room = await Room.create({ name, blurb, dungeon, is_active, user });
      console.log(room);

      if (!room) {
        throw new AuthenticationError('Something went wrong. Please make sure you\'ve filled out the necessary fields and have entered a unique name.')
      };

      return room;
    },
    addCreature: async (parent, { name, room, hp, loot, key_npc, is_alive, is_active }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please log in first.');
      };

      const creature = await Creature.create({ name, room, hp, loot, key_npc, user, is_alive, is_active });
      console.log(creature);

      if (!creature) {
        throw new AuthenticationError('Something went wrong. Please make sure you\'ve filled out the necessary fields.')
      };

      return creature;
    },
    // EDIT ROUTES
    editCampaign: async (parent, { _id, name, is_active }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please log in first.');
      };

      const campaign = await Campaign.findOneAndUpdate({ _id, user }, { name, is_active }, { new: true });
      console.log(campaign);
      console.log(user);

      if (!campaign) {
        throw new AuthenticationError('Something went wrong. Please make sure you\'ve filled out the necessary fields and have entered a unique name.')
      };

      return campaign;
    },
    editDungeon: async (parent, { _id, name, is_active }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please log in first.');
      };

      const dungeon = await Dungeon.findOneAndUpdate({ _id, user }, { name, is_active }, { new: true });
      console.log(dungeon);

      if (!dungeon) {
        throw new AuthenticationError('Something went wrong. Please make sure you\'ve filled out the necessary fields and have entered a unique name.')
      };

      return dungeon;
    },
    editRoom: async (parent, { _id, name, blurb, is_active }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please log in first.');
      };

      const room = await Room.findOneAndUpdate({ _id, user }, { name, blurb, is_active }, { new: true });
      console.log(room);

      if (!room) {
        throw new AuthenticationError('Something went wrong. Please make sure you\'ve filled out the necessary fields and have entered a unique name.')
      };

      return room;
    },
    editCreature: async (parent, { _id, name, room, hp, loot, key_npc, is_alive, is_active }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please log in first.');
      };

      const creature = await Creature.findOneAndUpdate({ _id, user }, { name, room, hp, loot, key_npc, is_alive, is_active }, { new: true });
      console.log(creature);

      if (!creature) {
        throw new AuthenticationError('Something went wrong. Please make sure you\'ve filled out the necessary fields and have entered a unique name.')
      };

      return creature;
    },
    // DELETE ROUTES
    removeCampaign: async (parent, { _id }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please log in first.');
      };
      console.log(user);

      const campaign = await Campaign.findOneAndDelete({_id, user });
      console.log(campaign)

      if (!campaign) {
        throw new AuthenticationError('Something went wrong.')
      };

      return campaign;
    },


    removeDungeon: async (paprent, { _id }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please log in first.');
      };
      console.log(user);

      const dungeon = await Dungeon.findOneAndDelete({ _id, user });
      console.log(dungeon);

      if (!dungeon) {
        throw new AuthenticationError('Something went wrong.')
      };

      return dungeon;
    },
    removeRoom: async (paprent, { _id }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please log in first.');
      };

      const room = await Room.findOneAndDelete({ _id, user });
      console.log(room);

      if (!room) {
        throw new AuthenticationError('Something went wrong.')
      };

      return room;
    },
    removeCreature: async (paprent, { _id }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please log in first.');
      };

      const creature = await Creature.findOneAndDelete({ _id, user });
      console.log(creature);

      if (!creature) {
        throw new AuthenticationError('Something went wrong.')
      };

      return creature;
    },
  },
};

module.exports = resolvers;
