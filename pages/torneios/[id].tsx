import Button from "@/component/@core/button";
import Card from "@/component/@core/card";
import { api } from "@/services/api";
import Link from "next/link";
import { useState } from "react";
import TRASH from "../../styles/icons/trash.svg";
import Image from "next/image";
import { TournamentInfoInterface, TournamentsType } from "../api/interfaces";
import { useRouter } from "next/router";

export default function TorneiosDetail({
  tournament,
}: TournamentInfoInterface) {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleAddPlayer = async () => {
    await api.post("/players", {
      data: { tournamentId: tournament.id, name },
    });
    setName("");
  };

  const handleDeletePlayer = async (id: number) => {
    await api.delete("/players", { data: { tournamentId: tournament.id, id } });
  };

  const handleDelete = async (id: number) => {
    await api.delete("/tournaments", { data: { id } });
    router.back();
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
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            type="submit"
            onClick={(e) => (e.preventDefault(), handleAddPlayer())}
            color="primary"
          >
            +
          </Button>
        </form>
      </Card>
      <Card>
        <h4>Pessoas jogadoras ({tournament.players.length})</h4>
        <ul>
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
        <Button color="primary" onClick={() => router.back()}>
          Iniciar
        </Button>
        <Button
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
