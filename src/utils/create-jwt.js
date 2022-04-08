const jwt = require("jsonwebtoken");

// Initialize dotenv
require("dotenv").config();

function createJWT(payLoad) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { ...payLoad },
      process.env.JWT_SECRET,
      { expiresIn: "14d" },
      (err, token) => {
        if (err) {
          return reject(err);
        }

        return resolve(token);
      }
    );
  });
}

module.exports = createJWT;
