// set up token middleware here
import jwt from "jsonwebtoken";
import "dotenv/config.js";
const SECTRET_KEY = process.env.SECRET_KEY;

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(403)
      .json({
        status: 401,
        message: "UnAuthorized access please use accessToken",
      });
  }

  console.log("token", token);

  const AcessToken = token.split(" ")[1];

  jwt.verify(AcessToken, SECTRET_KEY, (error, decoded) => {
    if (error) {
      return res
        .status(403)
        .json({
          status: 403,
          message: "UnAuthorized access please use accessToken",
        });
    }

    req.decoded = decoded;

    next();
  });
};

export default authenticate;
