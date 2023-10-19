import prisma from "../lib/index.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const SECRET_KEY = process.env.SECRET_KEY_BOOKSTORE;
export const register_author = async(req, res) => {
    try {
        const { name, email, password } = req.body;
        const existing_author = await prisma.author.findUnique({
            where: {
                email: email
            }
        })

        if (existing_author) {
            return res.status(404).json({
                status: false,
                message: 'User already exists'
            })
        } else {

            const hassed_password = await bcrypt.hash(password, 10);
            const register_author = await prisma.author.create({
                data: {
                    name: name,
                    email: email,
                    password: hassed_password
                }
            })

            if (!register_author) {
                return res.status(404).json({
                    status: false,
                    message: 'something went wrong'
                })
            }
            res.status(200).json({
                status: true,
                message: 'successfully registered author'
            })
        }

    } catch (error) {
        console.log('error', error);
    }
}

export const login_author = async(req, res) => {
    try {
        const { email, password } = req.body;
        const login_author = await prisma.author.findUnique({
            where: {
                email: email
            }
        })
        if (!login_author) {

            return res.status(404).json({
                status: false,
                message: 'invalid email and password'
            })

        } else {

            const compare_password = await bcrypt.compare(password, login_author.password);

            if (!compare_password) {
                res.status(404).json({
                    status: false,
                    message: 'invalid email and password'
                })
            }

            const token = jwt.sign({ id: login_author.id }, SECRET_KEY)
            res.cookie('authorToken', token, {
                httpOnly: true,
                secure: false,
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

            res.json({
                status: true,
                message: 'successfully login',
                token
            })



        }

    } catch (error) {
        console.log('error', error);
    }
}

export const get_authors = async(req, res) => {
    try {
        const authors = await prisma.author.findMany();

        if (!authors) {
            return res.status(404).json({
                status: false,
                message: 'Not Found Any Author',
            })
        }

        res.status(200).json({
            authors
        })

    } catch (error) {
        console.log('error', error);
    }
}


export const get_author = async(req, res) => {
    try {
        const id = req.author.id;
        const author = await prisma.author.findUnique({
            where: {
                id: id
            }
        });

        if (!author) {
            return res.status(404).json({
                status: false,
                message: 'Not Found Any Author',
            })
        }

        res.status(200).json({
            author
        })

    } catch (error) {
        console.log('error', error);
    }
}
export const delete_author = async(req, res) => {
    try {
        const author = await prisma.author.delete({
            where: {
                id: Number(req.params.id)
            }
        });

        if (!author) {
            return res.status(404).json({
                status: false,
                message: 'Not Found Any Author',
            })
        }

        res.status(200).json({
            status: false,
            message: 'successfuly deleted',
        })

    } catch (error) {
        console.log('error', error);
    }
}


export const update_author = async(req, res) => {
    try {
        const { name, email } = req.body;
        const existing_author = await prisma.author.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })

        if (!existing_author) {

            return res.status(404).json({
                status: false,
                message: 'Not Found Any Author',
            })
        }
        const author = await prisma.author.updateMany({
            where: {
                id: Number(req.params.id)
            },
            data: {
                name: name,
                email: email
            }
        });

        if (!author) {
            return res.status(404).json({
                status: false,
                message: 'Not Found Any Author',
            })
        }

        res.status(200).json({
            status: false,
            message: 'successfuly updated',
        })

    } catch (error) {
        console.log('error', error);
    }
}