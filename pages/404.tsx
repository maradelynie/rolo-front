import { Button, Card, Flex, Heading, TextFieldInput } from "@radix-ui/themes";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <Flex direction="column" gap="4">
      <Heading mb="4">404 | Página não encontrada</Heading>
      <Button onClick={() => router.back()}>voltar</Button>
    </Flex>
  );
}
