const express = require("express");
const mongoose = require("mongoose");
const db = require("../config/keys").MONGO_URI;
const expressGraphQL = require("express-graphql");
const { graphqlUploadExpress } = require('graphql-upload');
require("./models/index");
const schema = require("./schema/schema");
const cors = require("cors");
const app = express();
const path = require('path');

if (!db) {
  throw new Error("You must provide a string to connect to MongoDB Atlas");
}

app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(
  "/graphql",
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  expressGraphQL(req => {
    return {
      schema,
      context: {
        token: req.headers.authorization
      },
      graphiql: true
    }
  })
);

module.exports = app;