import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { getConnection, getRepository } from "typeorm";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import "dotenv/config";

interface IToken {
  data: string,
  iat: number,
  exp: number;
}

const secret = String(process.env.JWT_SECRET);

export const checkAuth = (
  req: Request,
  res: Response
): void => {
  const token = req.headers.authorization;
  try {
    if (token) {
      const decodedData = jwt.verify(token.split(" ")[1], secret);
      const id = Number((decodedData as IToken).data);
      const userRepository = getRepository(User);
      const existingUser = userRepository.findOne({ where: { id } });
      if (existingUser) {
        existingUser.then(result => {
          req.body.user = { id: (result as User).id };
          res.status(200).send({ msg: "Authenticated" });
        });
      } else res.status(401).send({ error: "Unauthorized" });
    } else res.status(401).send({ error: "Unauthorized" });
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      res.status(401).send({ error: "Unauthorized" });
    }
    if (err.name === "TokenExpiredError") {
      res.status(401).send({ error: "Session ended" });
    }
    else res.status(500).send({ error: "Server error" });
  }
};

export const registerUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { username, password } = req.body;
  console.log('req.body', req.body);
  try {
    const userRepository = getRepository(User);
    const salt = await bcrypt.genSalt(10);
    const cryptedPassword = await bcrypt.hash(password, salt);

    // Saving new user with the crypted password into database.
    const newUser = new User();
    newUser.username = username;
    newUser.password = cryptedPassword;
    newUser.role = "user";

    const existingUser = await userRepository.findOne({ where: { username } });
    if (!existingUser) {
      await userRepository.save(newUser);
      return res.status(200).json({ msg: "User account succesfully registered" });
    } else return res.status(409).json({ error: "User with this username is already in database" });
  } catch (err) {
    return res.status(501).send({ error: "Server error" });
  }
};

export const removeUserById = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { id } = req.body;
    const userRepository = getRepository(User);
    const existingUser = await userRepository.findOne({ where: { id } });
    if (existingUser && existingUser.role === "user") {
      await userRepository.remove(existingUser);
      return res.status(200).send({ msg: "User removed from database." });
    } else return res.status(401).send({ msg: "Something went wrong." });
  } catch (err) {
    return res.status(501).send({ error: "Server error" });
  }
};


export const initializeAdmin = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const userRepository = getRepository(User);
    const salt = await bcrypt.genSalt(10);
    const cryptedPassword = await bcrypt.hash(String(process.env.ADMIN_PASSWORD), salt);

    const newUser = new User();
    newUser.username = String(process.env.ADMIN_USERNAME);
    newUser.password = cryptedPassword;
    newUser.role = "admin";

    const existingUser = await userRepository.findOne({ where: { username: String(process.env.ADMIN_USERNAME) } });
    if (!existingUser) {
      await userRepository.save(newUser);
      return res.status(200).json({ msg: "User account succesfully registered" });
    } else return res.status(409).json({ error: "User with this username is already in database" });
  } catch (err) {
    return res.status(501).send({ error: "Server error" });
  }
};