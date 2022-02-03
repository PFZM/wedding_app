const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    default: null,
    required: false,
    minlength: 5,
  },
  phone: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    required: true,
  },
  attending: {
    type: Boolean,
    default: null,
  },
  plusOne: {
    type: Boolean,
    required: true,
  },
  namePlusOne: {
    type: String,
  },
  messsages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

// userSchema.pre("save", async function (next) {
//   if (this.isNew || this.isModified("password")) {
//     const saltRounds = 10;
//     this.password = await bcrypt.hash(this.password, saltRounds);
//   }

//   next();
// });

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
