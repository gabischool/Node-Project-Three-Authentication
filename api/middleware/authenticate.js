// set up token middleware here
import  jwt  from "jsonwebtoken";
import 'dotenv/config';
const SECRET_KEY = process.env.SECRET_KEY;

function authenticate(req, res, next) {
    const token = req.headers.authorization

    if(!token) {
        return res.status(401).json({
            message: "Authentication failed- missing token",
        });
    }

    console.log("TOKEN", token)

    const tokenWithoutBearer = token.split(" ")[1];

    //verify the token
    jwt.verify(tokenWithoutBearer, SECRET_KEY, (error, decoded) => {
        if(error) {
            return res.status(401).json({
                message: "authentication failed - invalid token",
            });
        }

        //attach the decode token to the requenst object
        req.decoded = decoded;

        //continue with the request
        next();
    });
}

export default authenticate;