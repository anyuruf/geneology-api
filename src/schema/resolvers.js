const { OGM } = require("@neo4j/graphql-ogm");
const { typeDefs } = require("./type-defs");
const { driver } = require("../utils/driver");
const { hashPassword } = require("../utils/hash-password");
const { comparePassword } = require("../utils/compare-password");
const { createJWT } = require("../utils/create-jwt");

// initialize dotenv.
require("dotenv").config();

const ogm = new OGM({
  typeDefs,
  driver,
});

const User = ogm.model("User");

const resolvers = {
  Mutation: {
    signUp: async (_source, { firstName, lastName, role, email, password }) => {
      // const { roles } = context.auth.jwt.roles;
      // if(!(roles === "zadmin" || "admin")) {
      //  throw new Error("Must be admin to create users!!!");
      //  }

      const [existing] = await User.find({
        where: { email },
      });
      if (existing) {
        throw new Error("user with that email already exists");
      }

      const hash = await hashPassword(password);

      const [user] = (
        await User.create({
          input: [
            {
              firstName,
              lastName,
              email,
              role,
              password,
            },
          ],
        })
      ).users;

      return user;
    },

    signIn: async (_source, { email, password }) => {
      const [user] = await User.find({ where: { email } });

      if (!user) {
        throw new Error(`User with username ${email} not found!`);
      }

      const equal = await comparePassword(password, user.password);

      if (!equal) {
        throw new Error("Incorrect password for user with email ${email}.");
      }

      const payLoad = { id, firstName, roles: role };

      const token = await createJWT(payLoad);

      return { token };
    },
  },
};

module.exports = resolvers;
