import joi from 'joi'
export const ownervalidation = (req, res, next) => {
    const ownervalidate = joi.object({
        name: joi.string().min(10).max(30).required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).max(15).required()
    })

    const { error } = ownervalidate.validate(req.body);

    if (error) {
        return res.status(404).send(error.details[0].message);
    }

    next();
}