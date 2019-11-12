const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean
} = graphql;
const UserType = require("./user_type");
const CategoryType = require("./category_type");
const RewardType = require("./reward_type");
const Category = mongoose.model("category");
const Project = mongoose.model("project");
const User = mongoose.model("user");
const Reward = mongoose.model("reward");

const AWS = require("aws-sdk");
AWS.config.loadFromPath("./credentials.json");
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

const ProjectType = new GraphQLObjectType({
  name: "ProjectType",
  fields: () => ({
    _id: { type: GraphQLID },
    projectCreator: {
      type: UserType,
      resolve(parentValue) {
        return User.findById(parentValue.projectCreator)
          .then(user => user)
          .catch(err => null);
      }
    },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    goal: { type: GraphQLInt },
    amountRaised: { type: GraphQLInt },
    endDate: { type: GraphQLString },
    story: { type: GraphQLString },
    image: {
      type: GraphQLString,
      resolve(parentValue) {
        let imageUrl;
        if (parentValue.image) {
          imageUrl = s3.getSignedUrl('getObject', {
            Bucket: "punchender-dev",
            Key: parentValue.image
          });
        }
        return imageUrl || parentValue.image;
      }
    },
    launched: { type: GraphQLBoolean },
    backers: { 
      type: new GraphQLList(require("./user_type")),
      resolve(parentValue) {
        return Project.findById(parentValue._id)
          .populate("backers")
          .then(project => project.backers)
          .catch(err => null);
      }
    },
    comments: { 
      type: new GraphQLList(require("./comment_type")),
      resolve(parentValue) {
        return Project.findById(parentValue._id)
          .populate("comments")
          .then(project => project.comments)
          .catch(err => null);
      }
    },
    updates: { 
      type: new GraphQLList(require("./update_type")),
      resolve(parentValue) {
        return Project.findById(parentValue._id)
          .populate("updates")
          .then(project => project.updates)
          .catch(err => null);
      } 
    },
    rewards: { 
      type: new GraphQLList(require("./reward_type")),
      resolve(parentValue) {
        return Project.findById(parentValue._id)
          .populate("rewards")
          .then(project => project.rewards)
          .catch(err => console.log(err));
      }
    },
    category: { 
      type: CategoryType,
      resolve(parentValue) {
        return Category.findById(parentValue.category)
          .then(category => category)
          .catch(err => console.log(err));
      }
    },
    pledges: {
      type: new GraphQLList(require("./pledge_type")),
      resolve(parentValue) {
        return Project.findById(parentValue._id)
          .populate("pledges")
          .then(project => project.pledges)
          .catch(err => null);
      }
    },
  })
});

module.exports = ProjectType;