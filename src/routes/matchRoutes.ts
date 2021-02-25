import { Router } from "express";
import auth from "../middlewares/authenticationMiddleware";
import admin from "../middlewares/adminMiddleware";
import { createMatches, getMatchesBySerieId } from "../controllers/matchControllers";

const matchRoutes = (): Router => {
  const router = Router();
  router.post("/", auth, admin, createMatches);
  router.get("/:serieId", getMatchesBySerieId);
  return router;
};

export default matchRoutes;
