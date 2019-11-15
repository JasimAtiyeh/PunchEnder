const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UpdateSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: "project",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("update", UpdateSchema);