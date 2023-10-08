// Setup Sign up and Login API for Owner
import express from "express";
import prisma from "./lib/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
const SECTRET_KEY = process.env.SECRET_KEY;

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const CheckingTheOwnerIsExistOrNot = await prisma.owner.findUnique({
      where: {
        email: email,
      },
    });

    if (CheckingTheOwnerIsExistOrNot) {
      return res
        .status(409)
        .json({
          status: 409,
          message: "Owner was already exists please try again.",
        });
    }

    const HashingPassword = await bcrypt.hash(password, 10);

    const CreatingNewOwner = await prisma.owner.create({
      data: {
        name: name,
        email: email,
        password: HashingPassword,
      },
    });

    res
      .status(201)
      .json({
        status: 201,
        message: "Owner was created successFully",
        CreatingNewOwner,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        status: 500,
        message: "There was an error please try again later. ",
        error: error.message,
      });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const CheckingTheOwnerIsExistOrNot = await prisma.owner.findUnique({
      where: {
        email: email,
      },
    });

    if (!CheckingTheOwnerIsExistOrNot) {
      return res
        .status(404)
        .json({ status: 404, message: "That Owner was not exist" });
    }

    const CheckingPassword = bcrypt.compare(
      password,
      CheckingTheOwnerIsExistOrNot.password
    );

    if (!CheckingPassword) {
      return res
        .status(401)
        .json({
          status: 401,
          message: "Password is incorrect please use valid password.",
        });
    }

    const token = jwt.sign(
      {
        id: CheckingTheOwnerIsExistOrNot.id,
        email: CheckingTheOwnerIsExistOrNot.email,
      },
      SECTRET_KEY,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({
        status: 200,
        message: "Owner is already in there . Welcome back ",
        token,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        status: 500,
        message: "There was an error",
        error: error.message,
      });
  }
});

export default router;
