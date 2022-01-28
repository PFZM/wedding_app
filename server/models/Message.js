const { Schema, model } = require("mongoose");
const { format } = require("date-fns");

const messageSchema = new Schema({
  messageText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  status: {
    // only two possible values: Done & Pending
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (value) => format(value, "do MMM yyyy hh:mm b"),
  },
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
});

const Message = model("Message", messageSchema);

module.exports = Message;
