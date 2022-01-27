const { Schema, Types } = require("mongoose");
const { format } = require("date-fns");

const answerSchema = new Schema(
  {
    answerID: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    answerBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (value) => format(value, "do MMM yyyy hh:mm b"),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = answerSchema;
