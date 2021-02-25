import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getConnection, getRepository } from "typeorm";
import { User } from "../models/User";
import "dotenv/config";

const secret = String(process.env.JWT_SECRET);

export const login = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { username, password } = req.body;
  try {
    // Finding user from database by given username.
    const userRepository = getRepository(User);
    const existingUser = await userRepository.findOne({ where: { username } });
    if (existingUser) {
      // Comparing a given password with the crypted password from database.
      const isValid = await bcrypt.compare(password, existingUser.password);
      if (isValid) {
        // Generating a new authentication token.
        const token = jwt.sign({
          data: existingUser.id
        }, secret, { expiresIn: 60 * 60 }); // token expires after 60 minutes
        return res.status(200).send({ token });
      } else return res.status(401).send({ error: "Wrong username or password" });
    } else return res.status(401).send({ error: "Wrong username or password" });
  } catch (err) {
    return res.status(501).send({ error: "Server error" });
  }
};

