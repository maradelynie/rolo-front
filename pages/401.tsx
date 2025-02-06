import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <h2>401 | Você não tem autorização para acessar essa página</h2>
    </div>
  );
}
