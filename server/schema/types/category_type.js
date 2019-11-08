const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = graphql;
const Category = mongoose.model("category");

const CategoryType = new GraphQLObjectType({
  name: "CategoryType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    projects: {
      type: new GraphQLList(require("./project_type")),
      resolve(parentValue) {
        return Category.findById(parentValue._id)
          .populate("projects")
          .then(category => category.projects)
          .catch(err => null);
      }
    }
  })
});

module.exports = CategoryType;