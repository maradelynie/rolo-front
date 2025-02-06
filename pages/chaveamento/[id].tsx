import Button from "@/component/@core/button";
import Card from "@/component/@core/card";
import { useMemo } from "react";
import {
  PlayerInterface,
  RoundsInterface,
  TournamentInfoInterface,
  TournamentsType,
} from "../api/interfaces";
import { useRouter } from "next/router";
const formatPlayers = (players: PlayerInterface[]) => {
  return players.reduce((add, player) => {
    return { ...add, [player.id]: player };
  }, {});
};

const getLastRound = (rounds: RoundsInterface[]) => {
  const allRounds = rounds.map((match) => match.round).flat();
  return allRounds.filter(
    (value, index, self) => self.indexOf(value) === index
  );
};

export default function TorneiosDetail({
  tournament,
}: TournamentInfoInterface) {
  const router = useRouter();
  const players = useMemo<Record<string, PlayerInterface>>(
    () => formatPlayers(tournament.players),
    [tournament]
  );
  const allRounds = useMemo<number[]>(
    () => getLastRound(tournament.rounds || []),
    [tournament]
  );

  return tournament.rounds ? (
    <main className="chaveamento-main-wrapper">
      <Card>
        <>
          <h4>{tournament.name}</h4>
        </>
      </Card>

      <div className="chaveamento-section">
        {allRounds.map((round, index) => {
          return (
            <div
              className={
                "chaveamento-round-section" +
                (tournament.round < index + 1 ? " inactive" : "")
              }
            >
              <p className="chaveamento-round">{index + 1}</p>
              <div className="chaveamento-round-match">
                {tournament.rounds?.map((match) => {
                  if (match.round === round) {
                    return (
                      <Card
                        variant={"button"}
                        onClick={() =>
                          router.push(
                            `/jogo?tournamentId=${tournament.id}&roundId=${match.round}&matchId=${match.match}`
                          )
                        }
                      >
                        <div className="chaveamento-match">
                          <p>{match.match}.</p>
                          <div>
                            <h6>
                              {match.player1
                                ? players[+match.player1]?.name
                                : "-"}
                            </h6>
                            <h6>
                              {match.player2
                                ? players[+match.player2]?.name
                                : "-"}
                            </h6>
                          </div>
                        </div>
                      </Card>
                    );
                  }
                })}
              </div>
            </div>
          );
        })}
      </div>

      <section>
        <Button onClick={() => router.back()}>Voltar</Button>
      </section>
    </main>
  ) : (
    <></>
  );
}
export async function getServerSideProps({
  params,
}: {
  params: { id: string };
}) {
  const fs = require("fs");
  const fileInfo = fs.readFileSync(
    require.resolve("../../data/tounamentsData.json"),
    {
      encoding: "utf8",
    }
  );
  const jsonData = JSON.parse(fileInfo);
  return {
    props: {
      tournament: jsonData.tournaments.find(
        (tournament: TournamentsType) => tournament.id === +params.id
      ),
    },
  };
}
