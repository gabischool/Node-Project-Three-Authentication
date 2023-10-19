import jwt from 'jsonwebtoken'
const SECRET_KEY = process.env.SECRET_KEY_BOOKSTORE;
export const authenticate_author = (req, res, next) => {
    try {

        const token = req.cookies.authorToken

        if (!token) {
            return res.status(404).json({
                status: false,
                message: 'an authorized',
            })
        }


        const decoded = jwt.verify(token, SECRET_KEY);

        req.author = decoded;

        next();

    } catch (error) {
        console.log('error', error);
    }

}