// Create endpoints for books, make sure to use the middleware to authenticate the token

import prisma from "../lib/index.js";

export const addbook = async(req, res) => {
    try {
        const { title, price, image, bookStoreId } = req.body;
        const addbook = await prisma.book.create({
            data: {
                title: title,
                price: parseFloat(price),
                image: image,
                authorId: req.author.id,
                bookStoreId: bookStoreId
            }
        })

        if (!addbook) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong'
            })
        }

        res.status(200).json({
            status: true,
            message: 'successfuly added'
        })

    } catch (error) {
        console.log('error: ', error);
    }
}

export const updatebook = async(req, res) => {
    try {
        const { title, price, image, bookStoreId } = req.body;
        const updatebook = await prisma.book.updateMany({
            where: {
                id: Number(req.params.id)
            },
            data: {
                title: title,
                price: parseFloat(price),
                image: image,
                authorId: req.author.id,
                bookStoreId: bookStoreId
            }
        })

        if (!updatebook) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong'
            })
        }

        res.status(200).json({
            status: true,
            message: 'successfuly updated'
        })

    } catch (error) {
        console.log('error: ', error);
    }
}

export const fetchbooks = async(req, res) => {
    try {
        const fetchbook = await prisma.book.findMany()

        if (!fetchbook) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong'
            })
        }

        res.json(fetchbook)

    } catch (error) {
        console.log('error: ', error);
    }
}


export const deletebooks = async(req, res) => {
    try {
        const deletebook = await prisma.book.delete({
            where: {
                id: Number(req.params.id)
            }
        })

        if (!deletebook) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong'
            })
        }

        res.status(200).json({
            status: true,
            message: 'successfully deleted'
        })

    } catch (error) {
        console.log('error: ', error);
    }
}