const { Schema, model } = require("mongoose");
const { format } = require("date-fns");
const answerSchema = require("./Answer");

const messageSchema = new Schema({
  messageText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (value) => format(value, "do MMM yyyy hh:mm b"),
  },
  username: {
    type: String,
    required: true,
  },
  answer: [answerSchema],
});

const Message = model("Message", messageSchema);

module.exports = Message;
