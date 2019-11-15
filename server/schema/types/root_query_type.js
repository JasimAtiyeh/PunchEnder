const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString
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
const UpdateType = require("./update_type");
const Update = mongoose.model("update");

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
    projectComments: {
      type: new GraphQLList(CommentType),
      args: {
        project: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(_, args) {
        return Project.findById(args.project)
          .populate("comments")
          .then(project => project.comments);
      }
    },
    projectUpdates: {
      type: new GraphQLList(UpdateType),
      args: {
        project: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(_, args) {
        return Project.findById(args.project)
          .populate("updates")
          .then(project => project.updates);
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
    },
    searchProjects: {
      type: new GraphQLList(ProjectType),
      args: {
        filter: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(_, { filter }) {
        const regExp = new RegExp(filter);
        return Project.find({ name: { $regex: regExp, $options: 'i' } })
          .where('launched').equals(true)
          .sort({ 'name': -1 })
          .limit(5);
      }
    },
    searchCategories: {
      type: new GraphQLList(CategoryType),
      args: {
        filter: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(_, { filter }) {
        const regExp = new RegExp(filter);
        return Category.find({ name: { $regex: regExp, $options: 'i' } })
          .sort({ 'name': -1 })
          .limit(5);
      }
    }
  })
});

module.exports = RootQueryType;