const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Mutation: {
    login: async (root, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError("No user found with these details");
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError("Incorrect credentials");
        }

        const token = signToken(user);

        return { token, user };
      } catch (err) {
        console.error(err);
      }
    },

    signUp: async (root, { email, password }) => {
      try {
        const signUpUser = await User.findOneAndUpdate(
          { email: email },
          { $addToSet: { password: { password } } },
          { new: true }
        );
        const token = signToken(signUpUser);
        return { token, signUpUser };
      } catch (err) {
        console.error(err);
      }
    },

    addUser: async (root, { ...userDetails }) => {
      try {
        const user = await User.create({ ...userDetails });
        return { user };
      } catch (err) {
        console.error(err);
      }
    },
  },
};

module.exports = resolvers;
