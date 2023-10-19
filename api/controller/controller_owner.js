// Setup Sign up and Login API for Owner
import prisma from "../lib/index.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const SECRET_KEY = process.env.SECRET_KEY_BOOKSTORE;
export const register_owner = async(req, res) => {
    try {
        const { username, email, password } = req.body;
        const existing_owner = await prisma.owner.findUnique({
            where: {
                email: email
            }
        })

        if (existing_owner) {
            return res.status(404).json({
                status: false,
                message: 'User already exists'
            })
        } else {

            const hassed_password = await bcrypt.hash(password, 10);
            const register_owner = await prisma.owner.create({
                data: {
                    username: username,
                    email: email,
                    password: hassed_password
                }
            })

            if (!register_owner) {
                return res.status(404).json({
                    status: false,
                    message: 'something went wrong'
                })
            }
            res.status(200).json({
                status: true,
                message: 'successfully registered owner'
            })
        }

    } catch (error) {
        console.log('error', error);
    }
}

export const login_owner = async(req, res) => {
    try {
        const { email, password } = req.body;
        const login_owner = await prisma.owner.findUnique({
            where: {
                email: email
            }
        })
        if (!login_owner) {

            return res.status(404).json({
                status: false,
                message: 'invalid email and password'
            })

        } else {

            const compare_password = await bcrypt.compare(password, login_owner.password);

            if (!compare_password) {
                res.status(404).json({
                    status: false,
                    message: 'invalid email and password'
                })
            }

            const token = jwt.sign({ id: login_owner.id }, SECRET_KEY)
            res.cookie('ownerToken', token, {
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

export const get_owners = async(req, res) => {
    try {
        const owners = await prisma.owner.findMany();

        if (!owners) {
            return res.status(404).json({
                status: false,
                message: 'Not Found Any Author',
            })
        }

        res.status(200).json({
            owners
        })

    } catch (error) {
        console.log('error', error);
    }
}


export const get_owner = async(req, res) => {
    try {
        const id = req.owner.id;
        const owner = await prisma.owner.findUnique({
            where: {
                id: id
            }
        });

        if (!owner) {
            return res.status(404).json({
                status: false,
                message: 'Not Found Any Author',
            })
        }

        res.status(200).json({
            owner
        })

    } catch (error) {
        console.log('error', error);
    }
}
export const delete_owner = async(req, res) => {
    try {
        const owner = await prisma.owner.delete({
            where: {
                id: Number(req.params.id)
            }
        });

        if (!owner) {
            return res.status(404).json({
                status: false,
                message: 'Not Found Any owner',
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


export const update_owner = async(req, res) => {
    try {
        const { username, email } = req.body;
        const existing_owner = await prisma.owner.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })

        if (!existing_owner) {

            return res.status(404).json({
                status: false,
                message: 'Not Found Any Owner',
            })
        }
        const owner = await prisma.owner.updateMany({
            where: {
                id: Number(req.params.id)
            },
            data: {
                username: username,
                email: email
            }
        });

        if (!owner) {
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