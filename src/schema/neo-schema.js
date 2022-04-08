const { Neo4jGraphQL } = require("@neo4j/graphql");
const { Neo4jGraphQLAuthJWTPlugin } = require("@neo4j/graphql-plugin-auth");
const { driver } = require("../utils/driver");
const { resolvers } = require("./resolvers");
const { typeDefs } = require("./type-defs");

// Initialize dotenv
require("dotenv").config();

// Schema instance to be injected into the Apollo Server object in the entry file
// root index.js

const neoSchema = new Neo4jGraphQL({
  typeDefs,
  driver,
  resolvers,
  plugins: {
    auth: new Neo4jGraphQLAuthJWTPlugin({
      secret: process.env.JWT_SECRET,
    }),
  },
});

module.exports = neoSchema;
