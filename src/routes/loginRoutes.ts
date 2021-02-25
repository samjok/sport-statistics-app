
import { Router } from "express";
import { login } from "../controllers/loginControllers";
import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const loginRoutes = (): Router => {
  const router = Router();
  router.post("/", [
    body("username").isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long."),
    body("password").isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long."),
  ], async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } return next();
  }, login);
  return router;
};

export default loginRoutes;
