// set up token middleware here
import jwt from 'jsonwebtoken'
import 'dotenv/config'
const SECRET_KEY = process.env.SECRET_KEY;

function autenticate(req, res, nest) {
    const token = req.headers.authorization

    if(!token){
     return res.status(401).json({
            message: "Authentication failed"
        });
    }

  console.log("Token", token);
  const tokenWithoutBear = token.split(" ")[1];

//   Verify the token

 jwt.verify(tokenWithoutBear, SECRET_KEY, (error, decoded) => {
    if(error){
        return res.status(401).json({
            message: "Authentication failed"
        });

        req.decoded = decoded;
        
        next();
    }
 });
}

export default autenticate;