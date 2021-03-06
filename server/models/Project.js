const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  goal: {
    type: Number
  },
  projectCreator: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  amountRaised: {
    type: Number,
    default: 0
  },
  endDate: {
    type: String
  },
  story: {
    type: String,
  },
  image: {
    type: String
  },
  launched: {
    type: Boolean,
    default: false
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category"
  },
  backers: [{
    type: Schema.Types.ObjectId,
    ref: "user"
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

ProjectSchema.virtual('followedBy', {
  ref: 'user',
  localField: '_id',
  foreignField: 'followedProjects'
});

ProjectSchema.virtual('comments', {
  ref: 'comment',
  localField: '_id',
  foreignField: 'project'
});

ProjectSchema.virtual('rewards', {
  ref: 'reward',
  localField: '_id',
  foreignField: 'project'
});

ProjectSchema.virtual('updates', {
  ref: 'update',
  localField: '_id',
  foreignField: 'project'
});

ProjectSchema.virtual('pledges', {
  ref: 'pledge',
  localField: '_id',
  foreignField: 'project'
});

ProjectSchema.set('toObject', {
  virtuals: true
});

ProjectSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model("project", ProjectSchema);