/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
  login: async (args) => {
    const user = await User.findOne({ email: args.userInput.email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPwdCorrect = await bcrypt.compare(args.userInput.password, user.password);
    if (!isPwdCorrect) {
      throw new Error('Invalid credentials');
    }
    const signedToken = jwt.sign({ userId: user.id, email: user.email }, 'notasupersecretkey', {
      expiresIn: '1h',
    });

    return { userId: user.id, token: signedToken, tokenExpiration: 1 };
  },
};

module.exports = authResolver;
