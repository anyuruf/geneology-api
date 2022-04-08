const { verify } = require("jsonwebtoken");

//Initialize dotenv
require("dotenv").config();

function decodeJWT(token) {
  return new Promise((resolve, reject) => {
    verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      }

      resolve(decoded);
    });
  });
}

// exported to ./hash-crypt.js
module.exports = decodeJWT;
