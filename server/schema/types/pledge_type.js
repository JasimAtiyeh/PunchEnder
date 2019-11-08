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
    amount: { type: GraphQLInt }
  })
});

module.exports = PledgeType;