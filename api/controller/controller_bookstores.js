// Create endpoints for bookstores, make sure to use the middleware to authenticate the token

import prisma from "../lib/index.js";

export const addbookstore = async(req, res) => {
    try {
        const { name, location, } = req.body

        const addbookstore = await prisma.bookstore.create({
            data: {
                name: name,
                location: location,
                ownerId: req.owner.id
            }
        })

        if (!addbookstore) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong'
            })
        }


        res.status(404).json({
            status: true,
            message: 'successfully added'
        })

    } catch (error) {
        console.log('error', error);
    }
}

export const updatebookstore = async(req, res) => {
    try {
        const { name, location, } = req.body

        const updatebookstore = await prisma.bookstore.updateMany({
            where: {
                id: Number(req.params.id),
            },
            data: {
                name: name,
                location: location,
                ownerId: req.owner.id
            }
        })

        if (!updatebookstore) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong'
            })
        }


        res.status(404).json({
            status: true,
            message: 'successfully updated'
        })

    } catch (error) {
        console.log('error', error);
    }
}



export const fetchbookstores = async(req, res) => {
    try {

        const fetchbookstore = await prisma.bookstore.findMany();

        if (!fetchbookstore) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong'
            })
        }


        res.status(404).json(fetchbookstore)

    } catch (error) {
        console.log('error', error);
    }
}


export const fetchbookstore = async(req, res) => {
    try {

        const fetchbookstore = await prisma.bookstore.findFirst({
            where: {
                ownerId: req.owner.id
            }
        });

        if (!fetchbookstore) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong'
            })
        }


        res.status(404).json(fetchbookstore)

    } catch (error) {
        console.log('error', error);
    }
}


export const deletebookstore = async(req, res) => {
    try {

        const deletebookstore = await prisma.bookstore.delete({
            where: {
                id: Number(req.params.id)
            }
        });

        if (!deletebookstore) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong'
            })
        }


        res.status(404).json({
            status: true,
            message: 'successfully deleted'
        })

    } catch (error) {
        console.log('error', error);
    }
}