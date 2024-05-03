const mongoose = require("mongoose");

const bugSchema = new mongoose.Schema({
  contactName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  bugEncountered: {
    type: String,
    required: true,
    trim: true,
  },
});

const Bug = mongoose.model("Bug", bugSchema);

module.exports = Bug;
