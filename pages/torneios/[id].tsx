import Button from "@/component/@core/button";
import Card from "@/component/@core/card";
import { api } from "@/services/api";
import Link from "next/link";
import { useState } from "react";
import TRASH from "../../styles/icons/trash.svg";
import Image from "next/image";
import { TournamentInfoInterface, TournamentsType } from "../api/interfaces";
import { useRouter } from "next/router";
import { SingleElimination } from "tournament-pairings";

export default function TorneiosDetail({
  tournament,
}: TournamentInfoInterface) {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleAddPlayer = async () => {
    tournament.rounds
      ? null
      : await api.post("/players", {
          data: { tournamentId: tournament.id, name },
        });
    setName("");
  };

  const handleDeletePlayer = async (id: number) => {
    tournament.rounds
      ? null
      : await api.delete("/players", {
          data: { tournamentId: tournament.id, id },
        });
  };

  const handleDelete = async (id: number) => {
    tournament.rounds
      ? null
      : await api.delete("/tournaments", { data: { id } });
    router.back();
  };

  const handleInit = async () => {
    const players = tournament.players.map((player) => player.id.toString());
    const round = SingleElimination(players, 1, true);
    tournament.rounds
      ? null
      : await api.put("/tournaments", { round, tournamentId: tournament.id });
    setName("");
  };

  return (
    <main className="detalhe-main-wrapper">
      <Card>
        <h4>{tournament.name}</h4>
        <form>
          <input
            autoFocus
            type="text"
            value={name}
            disabled={!!tournament.rounds}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            type="submit"
            onClick={(e) => (e.preventDefault(), handleAddPlayer())}
            color="primary"
            disabled={!!tournament.rounds}
          >
            +
          </Button>
        </form>
      </Card>
      <Card>
        <h4>Pessoas jogadoras ({tournament.players.length})</h4>
        <ul className={tournament.rounds ? "players-disabled" : undefined}>
          {tournament.players.map((player) => {
            return (
              <li
                className="detalhe-delete-link"
                onClick={() => handleDeletePlayer(player.id)}
              >
                {player.name}
              </li>
            );
          })}
        </ul>
      </Card>

      <section className="detalhe-action-secction">
        <Button onClick={() => router.back()}>Voltar</Button>
        {tournament.rounds ? (
          <Button
            color="primary"
            onClick={() => router.push("/chaveamento/" + tournament.id)}
          >
            Ver chaveamento
          </Button>
        ) : (
          <Button color="primary" onClick={handleInit}>
            Iniciar
          </Button>
        )}
        <Button
          disabled={!!tournament.rounds}
          onClick={() => handleDelete(tournament.id)}
          key={tournament.date}
          color="warning"
        >
          deletar
          <Image src={TRASH} alt="icone pessoa" />{" "}
        </Button>
      </section>
    </main>
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
