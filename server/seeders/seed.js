const dungeondelver = require('../config/connection');
const { User } = require('../models');
const userSeeds = require('./userSeeds.json');

dungeondelver.once('open', async () => {
  try {
    await User.deleteMany({});
    await User.create(userSeeds);

    console.log('Seeds of the future, go forth!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});