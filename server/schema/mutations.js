const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLBoolean
} = graphql;
const mongoose = require("mongoose");
const AuthService = require("../services/auth");
const UserType = require("./types/user_type");
const ProjectType = require("./types/project_type");
const Project = mongoose.model("project");
const CategoryType = require("./types/category_type");
const Category = mongoose.model("category");
const CommentType = require("./types/comment_type");
const Comment = mongoose.model("comment");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.register(args);
      }
    },
    logout: {
      type: UserType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(_, args) {
        return AuthService.logout(args);
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.login(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.verifyUser(args);
      }
    },
      newProject: {
        type: ProjectType,
        args: {
          name: { type: new GraphQLNonNull(GraphQLString) },
          description: { type: new GraphQLNonNull(GraphQLString) },
          cost: { type: GraphQLInt }
        },
        async resolve(_, { name, description, weight }, context) {
          const validUser = await AuthService.verifyUser({ token: context.token });

          if (validUser.loggedIn) {
            const cost = function getRandomInt(max) {
              return Math.floor(Math.random() * Math.floor(max));
            }(100);

            new Product({ name, description, weight, cost }).save();
          } else {
            throw new Error("sorry, you need to log in first");
          }
        }
    },
  }
});

module.exports = mutation;