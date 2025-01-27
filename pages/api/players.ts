import { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";
import { PlayerInterface, TournamentsType } from "./interfaces";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const fileInfo = await fs.readFile(
      process.cwd() + "/data/tounamentsData.json",
      {
        encoding: "utf8",
      }
    );

    const jsonData = await JSON.parse(fileInfo);

    let players: PlayerInterface[] = [];

    const tournaments = jsonData.tournaments.map(
      (tournament: TournamentsType) => {
        if (tournament.id === req.body.data.tournamentId) {
          const tournamentPlayers = [...tournament.players].pop();
          const id = tournamentPlayers ? tournamentPlayers.id + 1 : 1;

          players = [...tournament.players, { name: req.body.data.name, id }];

          return {
            ...tournament,
            players,
          };
        } else {
          return tournament;
        }
      }
    );

    const content = JSON.stringify({
      ...jsonData,
      tournaments,
    });

    fs.writeFile(process.cwd() + "/data/tounamentsData.json", content);

    return res.status(200).json({ players });
  } else if (req.method === "DELETE") {
    const fileInfo = await fs.readFile(
      process.cwd() + "/data/tounamentsData.json",
      {
        encoding: "utf8",
      }
    );

    const jsonData = await JSON.parse(fileInfo);

    let players: PlayerInterface[] = [];

    const tournaments = jsonData.tournaments.map(
      (tournament: TournamentsType) => {
        if (tournament.id === req.body.tournamentId) {
          const tournamentPlayers = [...tournament.players].filter(
            (player) => player.id !== req.body.id
          );

          players = tournamentPlayers;

          return {
            ...tournament,
            players: tournamentPlayers,
          };
        } else {
          return tournament;
        }
      }
    );

    const content = JSON.stringify({
      ...jsonData,
      tournaments,
    });

    fs.writeFile(process.cwd() + "/data/tounamentsData.json", content);

    return res.status(200).json({ players });
  }
};
