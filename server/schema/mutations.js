const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLList
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
          category: { type: new GraphQLNonNull(GraphQLID) },
        },
        async resolve(_, { name, description, category }, context) {
          const validUser = await AuthService.verifyUser({ token: context.token });

          if (validUser.loggedIn) {
            const projectCreator = validUser.id;
            return new Project({ name, description, category, projectCreator }).save();
          } else {
            throw new Error("sorry, you need to log in first");
          }
        }
    },
    updateProjectBasics: {
      type: ProjectType,
      args: {
        _id:  { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        category: { type: GraphQLID },
        goal: { type: GraphQLInt },
        endDate: { type: GraphQLString },
      },
      resolve(_, variables) {
        return Project.findByIdAndUpdate(variables._id, variables, { new: true })
          .then(project => project)
          .catch(err => err);
      }
    },
    updateProjectStory: {
      type: ProjectType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLID) },
        story: { type: GraphQLString },
      },
      resolve(_, variables) {
        return Project.findByIdAndUpdate(variables._id, variables, { new: true })
          .then(project => project)
          .catch(err => err);
      }
    },
    launchProject: {
      type: ProjectType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(_, variables) {
        return Project.findByIdAndUpdate(variables._id, { launched: true }, { new: true })
          .then(project => project)
          .catch(err => err);
      }
    },
    newCategory: {
      type: CategoryType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_, { name, description }) {
        const newCat = new Category({ name, description });
        return newCat.save()
          .then(cat => cat)
          .catch(err => err);
      }
    },
<<<<<<< HEAD
    // newProject: {
    //   type: ProjectType,
    //   args: {
    //     projectCreater: { type: GraphQLID },
    //     name: { type: GraphQLString },
    //     description: { type: GraphQLString },
    //     goal: { type: GraphQLInt },
    //     amountRaised: { type: GraphQLInt },
    //     endDate: { type: GraphQLInt },
    //     backers: { type: GraphQLList },
    //     comments: { type: GraphQLList },
    //     updates: { type: GraphQLList },
    //     rewards: { type: GraphQLList },
    //     pledges: { type: GraphQLList },
    //     category: { type: GraphQLString },
    //     story: { type: GraphQLString },
    //     launched: { type: GraphQLBoolean}
    //   },
    //   async resolve(_, {
    //     projectCreater,
    //     name,
    //     description,
    //     goal,
    //     amountRaised,
    //     endDate,
    //     backers,
    //     comments,
    //     updates,
    //     rewards,
    //     pledges,
    //     category,
    //     story,
    //     launched
    //   }, ctx) {
    //     const validUser = await AuthService.verifyUser({
    //       token: ctx.token
    //     });
    //     if(validUser.loggedIn) {
    //       return new Project({
    //         projectCreater,
    //         name,
    //         description,
    //         goal,
    //         amountRaised,
    //         endDate,
    //         backers,
    //         comments,
    //         updates,
    //         rewards,
    //         pledges,
    //         category,
    //         story,
    //         launched
    //       }).save();
    //     } else {
    //       throw new Error("Sorry, you are not logged in");
    //     }
    //   }
    // }
=======
>>>>>>> f25cefe... style user-profile
  }
});

module.exports = mutation;