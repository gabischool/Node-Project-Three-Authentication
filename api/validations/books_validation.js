import joi from 'joi'
export const bookvalidation = (req, res, next) => {
    const bookvalidate = joi.object({
        title: joi.string().min(5).max(30).required(),
        price: joi.number().required(),
        image: joi.string().required(),
        bookStoreId: joi.number().required()
    })

    const { error } = bookvalidate.validate(req.body);

    if (error) {
        return res.status(404).send(error.details[0].message);
    }

    next();
}