import { Request, Response } from "express";
import { getRepository } from "typeorm";
import "dotenv/config";
import { Serie } from "../models/Serie";
import { Competition } from "../models/Competition";

export const addSerie = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { name, competitionId, season } = req.body;
  try {
    const serieRepository = getRepository(Serie);
    const competitionRepository = getRepository(Competition);
    const competition = await competitionRepository.findOne({ where: { id: competitionId } });

    if (competition) {
      const newSerie = new Serie();
      newSerie.name = name;
      newSerie.season = season;
      const existingSerie = await serieRepository.findOne({ where: { name, id: competitionId, season } });
      if (!existingSerie) {
        await serieRepository.save(newSerie);
        return res.status(200).json({ msg: "New serie added" });
      } else return res.status(409).json({ error: "This serie is already in database" });
    } else return res.status(409).send({ error: "Invalid competition id" });
  } catch (err) {
    return res.status(501).send({ error: "Server error" });
  }
};

export const removeSerieById = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { id } = req.body;
    const serieRepository = getRepository(Serie);
    const existingSerie = await serieRepository.findOne({ where: { id } });
    if (existingSerie) {
      await serieRepository.remove(existingSerie);
      return res.status(200).send({ msg: "Serie removed from database." });
    } else return res.status(401).send({ msg: "Something went wrong." });
  } catch (err) {
    return res.status(501).send({ error: "Server error" });
  }
};