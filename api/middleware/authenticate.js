// set up token middleware here
// set up token middleware here

import Jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(404)
      .json({ message: "Authentication Failed missing token" });
  }

  const tokenWithoutBearer = token.split(" ")[1];

  Jwt.verify(tokenWithoutBearer, SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(404).json({ message: "invalid token" });
    }
    req.decoded = decoded;

    next();
  });
}

export default authenticate;
