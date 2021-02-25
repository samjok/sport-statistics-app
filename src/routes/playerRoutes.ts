import { Router } from "express";
import auth from "../middlewares/authenticationMiddleware";
import admin from "../middlewares/adminMiddleware";
import { addPlayer, removePlayerById } from "../controllers/playerControllers";

const userRoutes = (): Router => {
  const router = Router();
  router.post("/", auth, admin, addPlayer);
  router.delete("/:id", auth, admin, removePlayerById);
  return router;
};

export default userRoutes;
