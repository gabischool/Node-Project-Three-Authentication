// set up token middleware here
import jwt from 'jsonwebtoken'
const SECRET_KEY = process.env.SECRET_KEY_BOOKSTORE;
export const authenticate_owner = (req, res, next) => {
    try {

        const token = req.cookies.ownerToken

        if (!token) {
            return res.status(404).json({
                status: false,
                message: 'an authorized',
            })
        }


        const decoded = jwt.verify(token, SECRET_KEY);

        req.owner = decoded;

        next();

    } catch (error) {
        console.log('error', error);
    }

}