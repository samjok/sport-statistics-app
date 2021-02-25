import { Router } from "express";
import loginRoutes from "./loginRoutes";
import userRoutes from "./userRoutes";
import teamRoutes from "./teamRoutes";
import playerRoutes from "./playerRoutes";
import matchRoutes from "./matchRoutes";

export const createRoutes = (): Router => {
  const router = Router();
  router.use("/user", userRoutes());
  router.use("/login", loginRoutes());
  router.use("/team", teamRoutes());
  router.use("/player", playerRoutes());
  router.use("/match", matchRoutes());
  return router;
};
