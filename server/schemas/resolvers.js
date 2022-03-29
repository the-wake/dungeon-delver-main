const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth.js');
const { User, Campaign, Creature, Area, Room } = require('../models');


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

      const campaigns = await Campaign.find({ user: user._id }).populate('user').populate('areas');
      
      if (!campaigns) {
        throw new AuthenticationError('You have no campaigns!')
      };
      
      console.log(campaigns);
      console.log(user._id);
      return campaigns;
    },
    getAreas: async (parent, args, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please log in first.');
      };

      const areas = await Area.find({ user: user._id }).populate('user').populate('campaign').populate('rooms');
      console.log(areas);
      
      if (!areas) {
        throw new AuthenticationError('You have no areas!')
      };

      return areas;
    },
    getRooms: async (parent, { area }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please log in first.');
      };
     
      const rooms = await Room.find({ area, user: user._id }).populate('user').populate('area').populate('creatures');
      console.log(rooms);
      
      if (!rooms) {
        throw new AuthenticationError('You have no rooms in this area!')
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

      const campaign = await Campaign.findOne({ _id: campaignId, user }).populate('user').populate('areas');
      console.log(campaign);
      
      if (!campaign) {
        throw new AuthenticationError('Campaign not found.')
      };

      return campaign;
    },
    getArea: async (parent, { areaId }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please log in first.');
      };

      const area = await Area.findOne({ _id: areaId, user }).populate('user').populate('campaign').populate('rooms');
      console.log(area);
      
      if (!area) {
        throw new AuthenticationError('Area not found.')
      };

      return area;
    },
    getRoom: async (parent, { roomId }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please log in first.');
      };

      const room = await Room.findOne({ _id: roomId, user }).populate('user').populate('area').populate('creatures');
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
    addCampaign: async (parent, { name, notes, is_active }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please log in first.');
      };

      const campaign = await Campaign.create({ name, notes, is_active, user });
      console.log(campaign);

      if (!campaign) {
        throw new AuthenticationError('Something went wrong. Please make sure you\'ve filled out the necessary fields and have entered a unique name.')
      };

      return campaign;
    },
    // Still need to get this to populate to the currently focused campaign.
    addArea: async (parent, { name, type, campaign, notes, is_active }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please log in first.');
      };

      const area = await Area.create({ name, type, campaign, notes, is_active, user });
      console.log(area);

      if (!area) {
        throw new AuthenticationError('Something went wrong. Please make sure you\'ve filled out the necessary fields and have entered a unique name.')
      };

      return area;
    },
    addRoom: async (parent, { name, blurb, area, notes, is_active }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please log in first.');
      };

      const room = await Room.create({ name, blurb, area, notes, is_active, user });
      console.log(room);

      if (!room) {
        throw new AuthenticationError('Something went wrong. Please make sure you\'ve filled out the necessary fields and have entered a unique name.')
      };

      return room;
    },
    addCreature: async (parent, { name, room, hp, loot, notes, key_npc, is_alive, is_active }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please log in first.');
      };

      const creature = await Creature.create({ name, room, hp, loot, notes, key_npc, user, is_alive, is_active });
      console.log(creature);

      if (!creature) {
        throw new AuthenticationError('Something went wrong. Please make sure you\'ve filled out the necessary fields.')
      };

      return creature;
    },
    // EDIT ROUTES
    editCampaign: async (parent, { _id, name, notes, is_active }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please log in first.');
      };

      const campaign = await Campaign.findOneAndUpdate({ _id, user }, { name, notes, is_active }, { new: true });
      console.log(campaign);
      console.log(user);

      if (!campaign) {
        throw new AuthenticationError('Something went wrong. Please make sure you\'ve filled out the necessary fields and have entered a unique name.')
      };

      return campaign;
    },
    editArea: async (parent, { _id, name, type, notes, is_active }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please log in first.');
      };

      const area = await Area.findOneAndUpdate({ _id, user }, { name, type, notes, is_active }, { new: true });
      console.log(area);

      if (!area) {
        throw new AuthenticationError('Something went wrong. Please make sure you\'ve filled out the necessary fields and have entered a unique name.')
      };

      return area;
    },
    editRoom: async (parent, { _id, name, area, blurb, notes, is_active }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please log in first.');
      };

      const room = await Room.findOneAndUpdate({ _id, user }, { name, area, blurb, notes, is_active }, { new: true });
      console.log(room);

      if (!room) {
        throw new AuthenticationError('Something went wrong. Please make sure you\'ve filled out the necessary fields and have entered a unique name.')
      };

      return room;
    },
    editCreature: async (parent, { _id, name, room, hp, loot, notes, key_npc, is_alive, is_active }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please log in first.');
      };

      const creature = await Creature.findOneAndUpdate({ _id, user }, { name, room, hp, loot, notes, key_npc, is_alive, is_active }, { new: true });
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
    removeArea: async (paprent, { _id }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please log in first.');
      };
      console.log(user);

      const area = await Area.findOneAndDelete({ _id, user });
      console.log(area);

      if (!area) {
        throw new AuthenticationError('Something went wrong.')
      };

      return area;
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
