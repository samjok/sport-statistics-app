import { Request, Response, NextFunction } from "express";
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

const auth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const decodedData = jwt.verify(token.split(" ")[1], secret);
      const id = Number((decodedData as IToken).data);
      const userRepository = getRepository(User);
      const existingUser = userRepository.findOne({ where: { id } });
      if (existingUser) {
        existingUser.then(result => {
          req.body.user = { id: (result as User).id };
          next();
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

export default auth;