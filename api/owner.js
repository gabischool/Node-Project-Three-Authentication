// Setup Sign up and Login API for Owner
import express from "express";
import prisma from "./lib/index.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const owner = await prisma.owner.findMany();
    if (!owner) {
      return res.status(404).json({ message: "Not Found" });
    }
    return res.status(200).json(owner);
  } catch (err) {
    return res.status(500).json({ message: `internal server error`, err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const owner = await prisma.owner.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!owner) {
      return res.status(404).json({ message: "Not Found" });
    }
    return res.status(200).json(owner);
  } catch (err) {
    return res.status(500).json({ message: `internal server error`, err });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingOwner = await prisma.owner.findUnique({
      where: {
        email: email,
      },
    });
    if (existingOwner) {
      return res.status(409).json({ message: "owner alreadye exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const owner = await prisma.owner.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });
    return res.status(200).json({ message: "owner created succes", owner });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `internal server error`, error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingOwner = await prisma.owner.findUnique({
      where: {
        email: email,
      },
    });
    if (!existingOwner) {
      return res.status(404).json({ message: "Owner Not Found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingOwner.password
    );

    const token = Jwt.sign(
      {
        id: existingOwner.id,
        name: existingOwner.name,
        email: existingOwner.email,
      },
      SECRET_KEY,
      { expiresIn: "2h" }
    );
    return res.status(200).json({ message: "Owner Login Success", token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `internal server error`, error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, password } = req.body;

    const owner = await prisma.owner.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        email,
        password,
      },
    });
    if (!owner) {
      return res.status(404).json({ message: `Owner ${id} not found` });
    }
    return res.status(200).json({ message: "updated success", owner });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `internal server error`, error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const owner = await prisma.owner.delete({
      where: {
        id: Number(id),
      },
    });
    if (!owner) {
      return res.status(404).json({ message: `Owner ${id} not found` });
    }
    return res.status(200).json({ message: "Owner deleted Success" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `internal server error`, error: error.message });
  }
});

export default router;
