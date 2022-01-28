const { AuthenticationError } = require("apollo-server-express");
const { User, Message, Answer } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async ({}) => {
      return User.find().populate("messages");
    },
    user: async (_, { _id }) => {
      return User.findOne({ _id }).populate("messages");
    },
    me: async (_, __, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("messages");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    messages: async ({}) => {
      return Message.find({}).sort({ createdAt: -1 });
    },
  },

  Mutation: {
    login: async (_, { email, password }) => {
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

    signUp: async (_, { email, password }) => {
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

    addUser: async (_, userDetails) => {
      try {
        const user = await User.create(userDetails);
        return { user };
      } catch (err) {
        console.error(err);
      }
    },

    addMessage: async (_, { messageText }, context) => {
      try {
        if (context.user) {
          const newMessage = await Message.create(
            { messageText },
            { status: "pending" }
          );

          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { messages: newMessage._id } }
          );

          return newMessage;
        }
        throw new AuthenticationError("You need to be logged in!");
      } catch (err) {
        console.error(err);
      }
    },

    addAnswer: async (_, { messageId, answerBody, answerId }, context) => {
      try {
        if (context.user) {
          const answerMessage = await Answer.create(
            { answerId },
            { answerBody },
            { userId: context.user._id }
          );

          await Message.findOneAndUpdate(
            { _id: messageId },
            { $push: answerMessage }
          );

          return answerMessage;
        }
        throw new AuthenticationError("You need to be logged in!");
      } catch (err) {
        console.error(err);
      }
    },
  },
};

module.exports = resolvers;
