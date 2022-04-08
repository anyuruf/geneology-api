const { ApolloServer } = require("apollo-server");
const { neoSchema } = require("./schema/neo-schema");

Promise.all([neoSchema.getSchema(), ogm.init()]).then(([schema]) => {
  const server = new ApolloServer({
    schema,
    cors: {
      origin: "http://localhost:4200",
      credentials: true,
    },
    context: ({ req }) => ({ req }),
    introspection: true,
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
});
