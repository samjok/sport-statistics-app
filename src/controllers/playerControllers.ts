import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import { Player } from "../models/Player";
import { Team } from '../models/Team';
import "dotenv/config";

export const addPlayer = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { name, location, teamId } = req.body;
  try {
    const teamRepository = getRepository(Team);
    const team = await teamRepository.findOne({ where: { id: teamId } });
    if (team) {
      const PlayerRepository = getRepository(Player);
      const newPlayer = new Player();
      newPlayer.name = name;
      newPlayer.team = team;

      const existingPlayer = await PlayerRepository.findOne({ where: { name, location } });
      if (!existingPlayer) {
        await PlayerRepository.save(newPlayer);
        return res.status(200).json({ msg: "New Player added" });
      } else return res.status(409).json({ error: "This Player is already in database" });
    } else return res.status(401).json({ msg: "Invalid teamId" });

  } catch (err) {
    return res.status(501).send({ error: "Server error" });
  }
};

export const removePlayerById = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { id } = req.body;
    const PlayerRepository = getRepository(Player);
    const existingPlayer = await PlayerRepository.findOne({ where: { id } });
    if (existingPlayer) {
      await PlayerRepository.remove(existingPlayer);
      return res.status(200).send({ msg: "Player removed from database." });
    } else return res.status(401).send({ msg: "Something went wrong." });
  } catch (err) {
    return res.status(501).send({ error: "Server error" });
  }
};
