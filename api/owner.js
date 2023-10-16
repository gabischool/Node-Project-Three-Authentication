// Setup Sign up and Login API for Owner

import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import prisma from "./lib/index.js";

const SECRET_KEY = process.env.SECRET_KEY;

const router = express.Router();

// Owner Sign Up - Name, email, password

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {

    const existingOwner = await prisma.owner.findUnique({
      where: {
        email: email,
      },
    });

    if (existingOwner) {
      return res.status(409).json({
        message: "Owner already exists",
      });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create the owner
    const newOwner = await prisma.owner.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      message: "Owner created successfully",
      owner: newOwner,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}
);
// Owner Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // find the owner
    const existingOwner = await prisma.owner.findUnique({
      where: {
        email: email,
      },
    });

    if (!existingOwner) {
      return res.status(404).json({
        message: "Owner not found",
      });
    }

    // check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, existingOwner.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // create a token
    const token = jwt.sign(
      {id: existingOwner.id, email: existingOwner.email},
      SECRET_KEY,
      {expiresIn: "1h"}
    )

    return res.status(200).json({
      message: "Owner logged in successfully",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}
);

export default router;
