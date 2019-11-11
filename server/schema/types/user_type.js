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
const User = mongoose.model("user");

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    projects: {
      type: new GraphQLList(require("./project_type")),
      resolve(parentValue) {
        return User.findById(parentValue._id)
        .populate("projects")
          .then(user => user.projects)
          .catch(err => null);
      }
    },
    backedProjects: {
      type: new GraphQLList(require("./project_type")),
      resolve(parentValue) {
        return User.findById(parentValue._id)
          .populate("backedProjects")
          .then(user => user.backedProjects)
          .catch(err => null);
      }
    },
    followedProjects: {
      type: new GraphQLList(require("./project_type")),
      resolve(parentValue) {
        return User.findById(parentValue._id)
          .populate("backedProjects")
          .then(user => user.backedProjects)
          .catch(err => null);      
      }
    },
    pledges: {
      type: new GraphQLList(require("./pledge_type")),
      resolve(parentValue) {
        return User.findById(parentValue._id)
          .populate("pledges")
          .then(user => user.pledges)
          .catch(err => null);
      }
    },
    funBucks: { type: GraphQLInt },
    token: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean },
    date: { type: GraphQLString }
  })
});

module.exports = UserType;