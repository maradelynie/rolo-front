import Button from "@/component/@core/button";
import Card from "@/component/@core/card";
import { api } from "@/services/api";
import Link from "next/link";
import { useState } from "react";
import USER from "../../styles/icons/user.svg";
import Image from "next/image";
import { FileInfoInterface, TournamentsType } from "../api/interfaces";
import { useRouter } from "next/router";

export default function Torneios({ tournaments }: FileInfoInterface) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [tournamentsList, setTournamentsList] = useState(tournaments);
  const handleCreate = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const response = await api.post("/tournaments", { name });
    setTournamentsList(response.data);
    setName("");
  };
  const handleDelete = async (id: number) => {
    const response = await api.delete("/tournaments", { data: { id } });
    setTournamentsList(response.data);
  };
  return (
    <main className="torneios-main-wrapper">
      <Card>
        <h4>Novo torneio</h4>
        <form>
          <input
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="submit" onClick={handleCreate} color="primary">
            criar
          </Button>
        </form>
      </Card>
      <Card>
        <h4>Torneios</h4>
        <div className="torneios-grid">
          {tournamentsList.map((tournament) => {
            return (
              <Button
                onClick={() => router.push("/torneios/" + tournament.id)}
                key={tournament.date}
              >
                <div>{tournament.name} </div>{" "}
                <div>
                  {tournament.players.length}
                  <Image src={USER} alt="icone pessoa" />{" "}
                </div>
              </Button>
            );
          })}
        </div>
      </Card>
      <Button onClick={() => router.back()}>Voltar</Button>
    </main>
  );
}
export async function getServerSideProps() {
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
      tournaments: jsonData.tournaments.filter(
        (tournament: TournamentsType) => !tournament.deleted
      ),
    },
  };
}
