import joi from 'joi'
export const bookstorevalidation = (req, res, next) => {
    const bookstorevalidate = joi.object({
        name: joi.string().min(5).max(30).required(),
        location: joi.string().required(),
    })

    const { error } = bookstorevalidate.validate(req.body);

    if (error) {
        return res.status(404).send(error.details[0].message);
    }

    next();
}