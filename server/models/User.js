const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 32
  },
  image: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  funBucks: {
    type: Number,
    default: 0
  },
  followedProjects: [{
    type: Schema.Types.ObjectId,
    ref: "project"
  }],
  backedProjects: [{
    type: Schema.Types.ObjectId,
    ref: "project"
  }]
});

UserSchema.virtual('projects', {
  ref: 'project',
  localField: '_id',
  foreignField: 'projectCreator'
});

UserSchema.virtual('pledges', {
  ref: 'pledge',
  localField: '_id',
  foreignField: 'pledger'
});

UserSchema.set('toObject', {
  virtuals: true
});

UserSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model("user", UserSchema);