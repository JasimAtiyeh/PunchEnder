const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RewardSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tier: {
      type: Number,
      required: true
    },
  pledgeAmount: {
    type: Number,
    required: true
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: "project",
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("reward", RewardSchema);