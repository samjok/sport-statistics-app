import { Request, Response } from "express";
import { getRepository } from "typeorm";
import "dotenv/config";
import { Competition } from "../models/Competition";

export const getCompetitions = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const competitionRepository = getRepository(Competition);
    const competitions = await competitionRepository.find();
    return res.status(200).json(competitions);
  } catch (err) {
    return res.status(501).send({ error: "Server error" });
  }
};

export const addCompetition = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { name } = req.body;
  try {
    const competitionRepository = getRepository(Competition);
    const newCompetition = new Competition();
    newCompetition.name = name;
    const existingCompetition = await competitionRepository.findOne({ where: { name } });
    if (!existingCompetition) {
      await competitionRepository.save(newCompetition);
      return res.status(200).json({ msg: "New competition added" });
    } else return res.status(409).json({ error: "This competition is already in database" });
  } catch (err) {
    return res.status(501).send({ error: "Server error" });
  }
};

export const removeCompetitionById = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { id } = req.body;
    const competitionRepository = getRepository(Competition);
    const existingCompetition = await competitionRepository.findOne({ where: { id } });
    if (existingCompetition) {
      await competitionRepository.remove(existingCompetition);
      return res.status(200).send({ msg: "Competition removed from database." });
    } else return res.status(401).send({ msg: "Something went wrong." });
  } catch (err) {
    return res.status(501).send({ error: "Server error" });
  }
};
