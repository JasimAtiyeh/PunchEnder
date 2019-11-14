const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PledgesSchema = new Schema({
  pledger: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: "project",
    required: true
  },
  reward: {
    type: Schema.Types.ObjectId,
    ref: "reward",
    required: false
  },
  amount: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model("pledge", PledgesSchema);