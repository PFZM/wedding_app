const { AuthenticationError } = require("apollo-server-express");
const { User, Message, Answer } = require("../models");
const bcrypt = require("bcrypt");
const { signToken } = require("../utils/auth");
const sendEmailPassword = require("../utils/sendEmails");

const resolvers = {
  Query: {
    users: async () => {
      try {
        return User.find().sort({ admin: -1 }).populate("messages");
      } catch (err) {
        console.error(err);
      }
    },

    user: async (_, { _id }) => {
      return User.findOne({ _id }).populate("messages");
    },

    me: async (_, __, context) => {
      try {
        if (context.user) {
          return User.findOne({ _id: context.user._id }).populate("messages");
        }
        throw new AuthenticationError("You need to be logged in!");
      } catch (err) {
        console.error(err);
      }
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
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError("No user found with this email");
        }
        if (user.password) {
          throw new AuthenticationError("User already exist!");
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.updateOne(
          { email: user.email },
          { password: hashedPassword },
          { new: true }
        );

        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.error(err);
      }
    },

    resetPassword: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError("No user found with this email");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.updateOne(
          { email: user.email },
          { password: hashedPassword },
          { new: true }
        );

        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.error(err);
      }
    },

    sendForgotEmail: async (_, { email }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError("No user found with this email");
        }

        await sendEmailPassword(user);

        return { user };
      } catch (err) {
        console.error(err);
      }
    },

    addUser: async (_, userDetails, context) => {
      try {
        if (context.user.admin) {
          const user = await User.create(userDetails);
          return user;
        }
        throw new AuthenticationError("You are not auth to add users");
      } catch (err) {
        console.error(err);
      }
    },

    attendingWedding: async (_, { attending }, context) => {
      try {
        if (context.user) {
          const attendingWed = await User.findOneAndUpdate(
            { _id: context.user._id },
            { attending },
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
          const user = await User.findOneAndUpdate(
            { _id: _id },
            { ...userDetails },
            { new: true }
          );
          return user;
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
