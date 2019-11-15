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
const keys = require("../../../config/keys");

const AWS = require("aws-sdk");
AWS.config.update({
  secretAccessKey: keys.secretAccessKey,
  accessKeyId: keys.accessKeyId,
  region: keys.region
});
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    image: {
      type: GraphQLString,
      resolve(parentValue) {
        let imageUrl;
        if (parentValue.image) {
          imageUrl = s3.getSignedUrl('getObject', {
            Bucket: keys.bucket,
            Key: parentValue.image
          });
        }
        return imageUrl || parentValue.image;
      }
    },
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
          .populate("followedProjects")
          .then(user => user.followedProjects)
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