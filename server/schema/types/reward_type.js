const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} = graphql;
const ProjectType = require("./project_type");
const Project = mongoose.model("project");

const RewardType = new GraphQLObjectType({
  name: "RewardType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    tier: { type: GraphQLInt },
    pledgeAmount: { type: GraphQLInt},
    project: { 
      type: ProjectType,
      resolve(parentValue) {
        return Project.findById(parentValue.project)
          .then(project => project)
          .catch(err => null);
      }
    }
  })
});

module.exports = RewardType;