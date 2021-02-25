import { Router } from "express";
import auth from "../middlewares/authenticationMiddleware";
import admin from "../middlewares/adminMiddleware";
import { addTeam, getTeams, removeTeamById } from "../controllers/teamControllers";

const userRoutes = (): Router => {
  const router = Router();
  router.get("/", getTeams);
  router.post("/", auth, admin, addTeam);
  router.delete("/:id", auth, admin, removeTeamById);
  return router;
};

export default userRoutes;
