const { Schema, model } = require("mongoose");
const { format } = require("date-fns");

const answerSchema = new Schema({
  answerId: {
    type: Schema.Types.ObjectId,
    default: null,
  },
  answerBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (value) => format(value, "do MMM yyyy hh:mm b"),
  },
});

const Answer = model("Answer", answerSchema);

module.exports = Answer;
