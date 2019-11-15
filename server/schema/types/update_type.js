const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = graphql;
const Project = mongoose.model("project");
const ProjectType = require("./project_type");

const UpdateType = new GraphQLObjectType({
  name: "UpdateType",
  fields: () => ({
    _id: { type: GraphQLID },
    project: {
      type: ProjectType,
      resolve(parentValue) {
        return Project.findById(parentValue._id)
          .then(project => project)
          .catch(err => null);
      }
    },
    body: { type: GraphQLString },
    title: { type: GraphQLString }
  })
});

module.exports = UpdateType;