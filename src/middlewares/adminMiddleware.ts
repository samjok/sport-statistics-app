import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";

const admin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.body.user.id;
    if (!id) {
      res.status(401).json({ error: "Unauthorized." });
    }
    const userRepository = getRepository(User);
    const existingUser = await userRepository.findOne({ where: { id } });
    if (existingUser && existingUser.role === "admin") {
      next();
    } else res.status(401).json({ error: "Unauthorized." });
  } catch (err) {
    res.status(501).send({ error: "Server error" });
  }
};

export default admin;