const mongoose = require("mongoose");
const graphql = require("graphql");
const UserType = require("./user_type");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = graphql;
const User = mongoose.model("user");

const CommentType = new GraphQLObjectType({
  name: "CommentType",
  fields: () => ({
    _id: { type: GraphQLID },
    body: { type: GraphQLString },
    author: { 
      type: UserType,
      resolve(parentValue) {
        return User.findById(parentValue.author)
          .then(user => user)
          .catch(err => null);
      } 
    },
    project: { 
      type: require("./project_type"),
      resolve(parentValue) {
        return User.findById(parentValue.author)
          .then(user => user)
          .catch(err => null);
      }
    }
  })
});

module.exports = CommentType;