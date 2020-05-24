/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcryptjs');
const User = require('../../models/user');

const authResolver = {
  createUser: async (args) => {
    const user = await User.findOne({ email: args.userInput.email });
    if (user) {
      throw new Error('User already exists.');
    }

    const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
    const newUser = new User({
      email: args.userInput.email,
      password: hashedPassword,
    });
    const result = await newUser.save();

    return { ...result._doc, password: null };
  },
};

module.exports = authResolver;
