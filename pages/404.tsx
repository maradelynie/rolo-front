import Button from "@/component/@core/button";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <h2>404 | Página não encontrada</h2>
      <Button onClick={() => router.back()}>voltar</Button>
    </div>
  );
}
