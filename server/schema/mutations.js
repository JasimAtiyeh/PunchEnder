const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLList,
  GraphQLFloat
} = graphql;

const { GraphQLUpload } = require('graphql-upload');

const mongoose = require("mongoose");
const AuthService = require("../services/auth");
const UserType = require("./types/user_type");
const ProjectType = require("./types/project_type");
const Project = mongoose.model("project");
const CategoryType = require("./types/category_type");
const Category = mongoose.model("category");
const CommentType = require("./types/comment_type");
const Comment = mongoose.model("comment");
const RewardType = require("./types/reward_type");
const Reward = mongoose.model("reward");
const PledgeType = require("./types/pledge_type");
const Pledge = mongoose.model("pledge");
const keys = require("../../config/keys");
const User = mongoose.model("user");
const UpdateType = require("./types/update_type");
const Update = mongoose.model("update");


const AWS = require("aws-sdk");
//AWS.config.loadFromPath("./credentials.json");
AWS.config.update({
  secretAccessKey: keys.secretAccessKey,
  accessKeyId: keys.accessKeyId,
  region: keys.region
});

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

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
          const projectCreator = validUser._id;
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
      async resolve(_, variables, context) {
        const validUser = await AuthService.verifyUser({ token: context.token });
        if (validUser.loggedIn) {
          return Project.findByIdAndUpdate(variables._id, variables, { new: true })
            .then(project => project)
            .catch(err => err);
        } else {
          throw new Error("sorry, you need to log in first");
        }
      }
    },
    updateProjectStory: {
      type: ProjectType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLID) },
        story: { type: GraphQLString },
      },
      async resolve(_, variables, context) {
        const validUser = await AuthService.verifyUser({ token: context.token });

        if (validUser.loggedIn) {
          return Project.findByIdAndUpdate(variables._id, variables, { new: true })
            .then(project => project)
            .catch(err => err);
        } else {
          throw new Error("sorry, you need to log in first");
        }
      }
    },
    launchProject: {
      type: ProjectType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLID) }
      },
      async resolve(_, variables, context) {
        const validUser = await AuthService.verifyUser({ token: context.token });

        if (validUser.loggedIn) {
          return Project.findByIdAndUpdate(variables._id, { launched: true }, { new: true })
            .then(project => project)
            .catch(err => err);
        } else {
          throw new Error("sorry, you need to log in first");
        }
      }
    },
    uploadProjectImage: {
      type: ProjectType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLID) },
        image: { type: GraphQLUpload }
      },
      async resolve(_, { _id, image }, context) {
        const validUser = await AuthService.verifyUser({ token: context.token });
        
        let imageUrl;

        if (image) {
          const { filename, mimetype, createReadStream } = await image;
          const fileStream = createReadStream();
          // Promisify the stream and store the file, then…
          const Key = new Date().getTime().toString();
          const uploadParams = {
            Bucket: keys.bucket,
            Key,
            Body: fileStream
          };
          const result = await s3.upload(uploadParams).promise();

          imageUrl = result.Key;
        }

        if (validUser.loggedIn) {
          return Project.findByIdAndUpdate(_id, { image: imageUrl }, { new: true })
            .then(project => project)
            .catch(err => err);
        } else {
          throw new Error("Sorry, you need to log in first");
        }
      }
    },
    uploadUserImage: {
      type: UserType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLID) },
        image: { type: GraphQLUpload }
      },
      async resolve(_, { _id, image }, context) {
        const validUser = await AuthService.verifyUser({ token: context.token });
        let imageUrl;

        if (image) {
          const { filename, mimetype, createReadStream } = await image;
          const fileStream = createReadStream();
          const Key = new Date().getTime().toString();
          const uploadParams = {
            Bucket: keys.bucket,
            Key,
            Body: fileStream
          };
          const result = await s3.upload(uploadParams).promise();
          imageUrl = result.Key;
        }

        if (validUser.loggedIn) {
          return User.findByIdAndUpdate(_id, { image: imageUrl }, { new: true })
            .then(user => user)
            .catch(err => err);
        } else {
          throw new Error("Sorry, you need to log in first");
        }
      }
    },
    newCategory: {
      type: CategoryType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        icon: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(_, { name, description }) {
        const newCat = new Category({ name, description });
        return newCat.save()
          .then(cat => cat)
          .catch(err => err);
      }
    },
    updateCategory: {
      type: CategoryType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        icon: { type: GraphQLString }
      },
      resolve(_, variables) {
        return Category.findByIdAndUpdate(variables._id, variables, { new: true })
          .then(cat => cat)
          .catch(err => err);
      }
    },
    newReward: {
      type: RewardType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        tier: { type: new GraphQLNonNull(GraphQLInt) },
        pledgeAmount: { type: new GraphQLNonNull(GraphQLInt) },
        project: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(_, variables, context) {
        const validUser = await AuthService.verifyUser({ token: context.token });

        if (validUser.loggedIn) {
          return new Reward(variables).save();
        } else {
          throw new Error("sorry, you need to log in first");
        }
      }
    },
    updateReward: {
      type: RewardType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        pledgeAmount: { type: GraphQLInt },
      },
      async resolve(_, variables, context) {
        const validUser = await AuthService.verifyUser({ token: context.token });

        if (validUser.loggedIn) {
          return Reward.findByIdAndUpdate(variables._id, variables, { new: true })
            .then(reward => reward)
            .catch(err => err);
        } else {
          throw new Error("sorry, you need to log in first");
        }
      }
    },
    updateRewardTier: {
      type: RewardType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLID) },
        tier: { type: GraphQLInt },
      },
      async resolve(_, variables, context) {
        const validUser = await AuthService.verifyUser({ token: context.token });

        if (validUser.loggedIn) {
          return Reward.findByIdAndUpdate(variables._id, variables, { new: true })
            .then(reward => reward)
            .catch(err => err);
        } else {
          throw new Error("sorry, you need to log in first");
        }
      }
    },
    deleteReward: {
      type: RewardType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(_, { _id }, context) {
        const validUser = await AuthService.verifyUser({ token: context.token });

        if (validUser.loggedIn) {
          return Reward.findByIdAndDelete(_id)
            .then(reward => reward)
            .catch(err => err);
        } else {
          throw new Error("sorry, you need to log in first");
        }
      }
    },
    followProject: {
      type: UserType,
      args: {
        user_id: { type: new GraphQLNonNull(GraphQLID) },
        project_id: { type: new GraphQLNonNull(GraphQLID) }
      },
      async resolve(_, variables, context) {
        const validUser = await AuthService.verifyUser({ token: context.token });

          if (validUser.loggedIn) {
            return User.findByIdAndUpdate(variables.user_id, { $push:{ followedProjects: variables.project_id} }, { new: true })
              .then(user => user)
              .catch(err => err);
          } else {
            throw new Error("sorry, you need to log in first");
          }
      }
    },
    unFollowProject: {
      type: UserType,
      args: {
        user_id: { type: new GraphQLNonNull(GraphQLID) },
        project_id: { type: new GraphQLNonNull(GraphQLID) }
      },
      async resolve(_, variables, context) {
        const validUser = await AuthService.verifyUser({ token: context.token });

          if (validUser.loggedIn) {
            return User.findByIdAndUpdate(variables.user_id, { $pull:{ followedProjects: variables.project_id} }, { new: true })
              .then(user => user)
              .catch(err => err);
          } else {
            throw new Error("sorry, you need to log in first");
          }
      }
    },
    pledgeProject: {
      type: PledgeType,
      args: {
        user_id: { type: new GraphQLNonNull(GraphQLID) },
        project_id: { type: new GraphQLNonNull(GraphQLID) },
        reward_id: { type: GraphQLID },
        pledgeAmount: { type: new GraphQLNonNull(GraphQLInt) }
      },
      async resolve(_, variables, context) {
        const validUser = await AuthService.verifyUser({ token: context.token });

        if (validUser.loggedIn) {
          let pledge = new Pledge({
            pledger: variables.user_id,
            project: variables.project_id,
            reward: variables.reward_id,
            amount: variables.pledgeAmount 
          })
          await User.findByIdAndUpdate(variables.user_id, {
            $inc: {
              funBucks: -(variables.pledgeAmount)
            },
            $addToSet: {
              backedProjects: variables.project_id
            }},
            { new: true }
          )
          await Project.findByIdAndUpdate(variables.project_id, {
            $inc: {
              amountRaised: variables.pledgeAmount
            }},
            { new: true }
          )
          return pledge.save()
        } else {
          throw new Error("sorry, you need to log in first");
        }
      }
    },
    newComment: {
      type: CommentType,
      args: {
        body: { type: new GraphQLNonNull(GraphQLString) },
        project: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(_, { body, project }, context) {
        const validUser = await AuthService.verifyUser({ token: context.token });

        if (validUser.loggedIn) {
          const author = validUser._id;
          return new Comment({ body, project, author }).save();
        } else {
          throw new Error("You must login to make a comment.");
        }
      }
    },
    newUpdate: {
      type: UpdateType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        body: { type: new GraphQLNonNull(GraphQLString) },
        project: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(_, { title, body, project }, context) {
        const validUser = await AuthService.verifyUser({ token: context.token });
        if (validUser.loggedIn) {
          return new Update({ body, project, title }).save();
        } else {
          throw new Error("Could not create new update.");
        }
      }
    },
    updateUpdate: {
      type: UpdateType,
      args: {
        _id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
      },
      async resolve(_, variables, context) {
        const validUser = await AuthService.verifyUser({ token: context.token });
        
        if (validUser.loggedIn) {
          return Update.findByIdAndUpdate(variables._id, variables, { new: true })
            .then(update => update)
            .catch(err => err);
        } else {
          throw new Error("Could not update the update.");
        }
      }
    },
    deleteUpdate: {
      type: UpdateType,
      args: {
        _id: { type: GraphQLNonNull(GraphQLID) }
      },
      async resolve(_, { _id }, context) {
        const validUser = await AuthService.verifyUser({ token: context.token });

        if (validUser.loggedIn) {
          return Update.findByIdAndDelete(_id)
            .then(update => update)
            .catch(err => err);
        } else {
          throw new Error("Could not delete the update.");
        }
      }
    },
    addUserBalance: {
      type: UserType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLID) },
        amount: { type: new GraphQLNonNull(GraphQLFloat) }
      },
      async resolve(_, { _id, amount }, context) {
        const validUser = await AuthService.verifyUser({ token: context.token });

        if (validUser.loggedIn) {
          return await User.findByIdAndUpdate(_id, {
            $inc: {
              funBucks: amount
            }
          },
            { new: true }
          )
        } else {
          throw new Error("Sorry, you need to log in first");
        }
      }
    },
  }
});

module.exports = mutation;