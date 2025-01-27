import { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const fileInfo = await fs.readFile(
      process.cwd() + "/data/tounamentsData.json",
      {
        encoding: "utf8",
      }
    );

    const jsonData = await JSON.parse(fileInfo);

    const id = [...jsonData.tournaments].pop()?.id + 1 || 1;

    const newData = [
      ...jsonData.tournaments,
      {
        id,
        name: req.body.name,
        date: new Date(),
        players: [],
        active: true,
        deleted: false,
      },
    ];

    const content = JSON.stringify({
      ...jsonData,
      tournaments: newData,
    });

    fs.writeFile(process.cwd() + "/data/tounamentsData.json", content);

    return res
      .status(200)
      .json(newData.filter((tournament) => !tournament.deleted));
  } else if (req.method === "DELETE") {
    const fileInfo = await fs.readFile(
      process.cwd() + "/data/tounamentsData.json",
      {
        encoding: "utf8",
      }
    );

    const jsonData = await JSON.parse(fileInfo);

    const newData = [...jsonData.tournaments].map((tournament) => {
      if (+tournament.id === +req.body.id) {
        return { ...tournament, deleted: true };
      }
      return tournament;
    });
    const content = JSON.stringify({
      ...jsonData,
      tournaments: newData,
    });

    fs.writeFile(process.cwd() + "/data/tounamentsData.json", content);

    return res
      .status(200)
      .json(newData.filter((tournament) => !tournament.deleted));
  }
};
