const mongoose = require("mongoose");

const fishSchema = new mongoose.Schema({
    species: String,
    date: Date,
    location: String,
    length: Number,
    weight: Number,
    baitType: String,
    temperature: Number,
    image: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
})

fishSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Fish", fishSchema)