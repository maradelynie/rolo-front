import Button from "@/component/@core/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="home-main-wrapper">
      <h1>Rolo Latino Americano POABP</h1>
      <div className="home-button-wrapper">
        <Link href="/jogo-rapido">
          <Button>Jogo Rápido</Button>
        </Link>
        <Link href="/torneios">
          <Button>Torneios</Button>
        </Link>
      </div>
    </main>
  );
}
