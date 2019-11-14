const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt
} = graphql;
const UserType = require("./user_type");
const User = mongoose.model("user");
const ProjectType = require("./project_type");
const Project = mongoose.model("project");
const RewardType = require("./reward_type");
const Reward = mongoose.model("reward");

const PledgeType = new GraphQLObjectType({
  name: "PledgeType",
  fields: () => ({
    _id: { type: GraphQLID },
    pledger: {
      type: UserType,
      resolve(parentValue) {
        return User.findById(parentValue.user)
          .then(user => user)
          .catch(err => null);
      }
    },
    project: {
      type: ProjectType,
      resolve(parentValue) {
        return Project.findById(parentValue.project)
          .then(project => project)
          .catch(err => null);
      }
    },
    reward: {
      type: RewardType,
      resolve(parentValue) {
        return Reward.findById(parentValue.reward)
          .then(reward => reward)
          .catch(err => null);
      }
    },
    amount: { type: GraphQLInt }
  })
});

module.exports = PledgeType;