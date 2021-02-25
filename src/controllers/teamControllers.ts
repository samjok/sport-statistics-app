import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import { Team } from "../models/Team";
import "dotenv/config";

export const getTeams = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const teamRepository = getRepository(Team);
    const teams = await teamRepository.find();
    return res.status(200).json(teams);
  } catch (err) {
    return res.status(501).send({ error: "Server error" });
  }
};

export const addTeam = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { name, location } = req.body;
  try {
    const teamRepository = getRepository(Team);
    const newTeam = new Team();
    newTeam.name = name;
    newTeam.location = location;
    const existingTeam = await teamRepository.findOne({ where: { name, location } });
    if (!existingTeam) {
      await teamRepository.save(newTeam);
      return res.status(200).json({ msg: "New team added" });
    } else return res.status(409).json({ error: "This team is already in database" });
  } catch (err) {
    return res.status(501).send({ error: "Server error" });
  }
};

export const removeTeamById = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { id } = req.body;
    const teamRepository = getRepository(Team);
    const existingTeam = await teamRepository.findOne({ where: { id } });
    if (existingTeam) {
      await teamRepository.remove(existingTeam);
      return res.status(200).send({ msg: "Team removed from database." });
    } else return res.status(401).send({ msg: "Something went wrong." });
  } catch (err) {
    return res.status(501).send({ error: "Server error" });
  }
};
