const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UpdateSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: "project",
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

module.exports = UpdateSchema;