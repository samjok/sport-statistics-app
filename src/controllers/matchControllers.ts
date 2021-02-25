import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Match } from "../models/Match";
import { Team } from "../models/Team";
import "dotenv/config";
import { Serie } from "../models/Serie";

interface IMatch {
  home_team: Team,
  away_team: Team,
  time: Date | null,
  played: boolean,
  home_goals: number | null,
  away_goals: number | null;
}

export const getMatchesBySerieId = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { serieId } = req.query;
  try {
    const matchRepository = getRepository(Match);
    const matches = await matchRepository.find({ where: { id: serieId }, relations: ["home_team", "away_team"] });
    return res.status(200).json(matches);
  } catch (err) {
    return res.status(501).send({ error: "Server error" });
  }
};

export const createMatches = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const teamRepository = getRepository(Team);
    const { teams, serieId } = req.body;

    const generateListOfTeams = async (teams: number[]): Promise<Team[]> => {
      let i;
      let team;
      let teamList: Team[] = [];
      const databaseQuery = async (id: number): Promise<Team | undefined> => {
        const team = teamRepository.findOne({ where: { id } });
        return team;
      };
      for (i = 0; i < teams.length; i++) {
        let teamId = teams[i];
        team = await databaseQuery(teamId);
        if (team) {
          teamList = [...teamList, team];
        }
      }
      return teamList;
    };

    const teamList = await generateListOfTeams(teams);
    const serieRepository = getRepository(Serie);
    const serie = await serieRepository.findOne({ id: serieId });
    if (!serie) {
      return res.status(501).send({ error: "Invalid serieId" });
    }
    let match: Match;
    const matchRepository = getRepository(Match);
    let i: number;
    let j: number;
    let matches: Match[] = [];
    for (i = 0; i < teamList.length; i++) {
      for (j = 0; j < teamList.length; j++) {
        if (j !== i) {
          match = new Match();
          if (serie) {
            match.serie = serie;
            match.home_team = teamList[i];
            match.away_team = teamList[j];
            match.played = false;
            matches = [...matches, match];
          }
        }
      }
    }
    const savedMatches = await matchRepository.save(matches);
    return res.status(200).json({ msg: "Matches created", matches: savedMatches });
  } catch (err) {
    return res.status(501).send({ error: "Server error" });
  }
};