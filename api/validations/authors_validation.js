import joi from 'joi'
export const authorvalidation = (req, res, next) => {
    const authorvalidate = joi.object({
        name: joi.string().min(5).max(30).required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).max(15).required()
    })

    const { error } = authorvalidate.validate(req.body);

    if (error) {
        return res.status(404).send(error.details[0].message);
    }

    next();
}