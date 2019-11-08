const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

CategorySchema.virtual('projects', {
  ref: 'project',
  localField: '_id',
  foreignField: 'category'
});

CategorySchema.set('toObject', {
  virtuals: true
});

CategorySchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model("category", CategorySchema);