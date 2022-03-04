const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth.js');
const { User, Campaign, Creature, Dungeon, Room } = require('../models');

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
      const campaigns = await Campaign.find({}).populate('user');
      // console.log(campaigns);
      return campaigns;
    }
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
    addCampaign: async (parent, args, context) => {
      console.log(args);
      const campaign = await Campaign.create(args);
      // Change last arg to context.user.
      console.log(campaign);
      return campaign;
    }
  }
};

module.exports = resolvers;
