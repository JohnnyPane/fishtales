const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  passwordHash: String,
  fish: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Fish'
    }
  ]
});

// userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject._v;
    // As to not reveal thae passwordHash
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
