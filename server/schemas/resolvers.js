const { AuthenticationError } = require("apollo-server-express");
const { User, Message, Answer } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
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
    messages: async () => {
      return Message.find().sort({ createdAt: -1 });
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
        const user = await User.findOneAndUpdate(
          { email },
          { password },
          { new: true }
        );
        console.log(user);

        if (!user) {
          throw new AuthenticationError("No user found with this email");
        }
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.error(err);
      }
    },

    addUser: async (_, userDetails, context) => {
      try {
        if (context.user.admin) {
          const user = await User.create(userDetails);
          return { user };
        }
        throw new AuthenticationError("You are not auth to add users");
      } catch (err) {
        console.error(err);
      }
    },

    attendingWedding: async (_, { rsvp }, context) => {
      try {
        if (context.user) {
          const attendingWed = await User.findOneAndUpdate(
            { _id: context.user.id },
            { $addToSet: { attending: rsvp } },
            { new: true }
          );
          return attendingWed;
        }
        throw new AuthenticationError("You need to be logged in!");
      } catch (err) {
        console.error(err);
      }
    },

    editUser: async (_, { _id, ...userDetails }, context) => {
      try {
        if (context.user.admin) {
          const user = await User.findOneAndUpade(
            { _id: _id },
            { ...userDetails },
            { new: true }
          );
          return { user };
        }
        throw new AuthenticationError("You are not auth to edit users");
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
            { $addToSet: { messages: newMessage._id } },
            { new: true }
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
            { $push: answerMessage },
            { new: true }
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
