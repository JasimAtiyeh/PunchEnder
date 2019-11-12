const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} = graphql;

const UserType = require("./user_type");
const User = mongoose.model("user");
const ProjectType = require("./project_type");
const Project = mongoose.model("project");
const CategoryType = require("./category_type");
const Category = mongoose.model("category");
const RewardType = require("./reward_type");
const Reward = mongoose.model("reward");
const CommentType = require("./comment_type");
const Comment = mongoose.model("comment");

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    user: {
      type: UserType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return User.findById(args._id);
      }
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve() {
        return Project.find({});
      }
    },
    project: {
      type: ProjectType,
      args: {
        _id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(_, args) {
        return Project.findById(args._id);
      }
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve() {
        return Comment.find({});
      }
    },
    comment: {
      type: CommentType,
      args: {
        _id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(_, args) {
        return Comment.findById(args._id);
      }
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve() {
        return Category.find({});
      }
    },
    category: {
      type: CategoryType,
      args: {
        _id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(_, args) {
        return Category.findById(args._id);
      }
    },
    rewards: {
      type: new GraphQLList(RewardType),
      resolve() {
        return Reward.find({});
      }
    },
    reward: {
      type: RewardType,
      args: {
        _id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(_, args) {
        return Reward.findById(args._id);
      }
    }
  })
});

module.exports = RootQueryType;