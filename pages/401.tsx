import { Button, Card, Flex, Heading, TextFieldInput } from "@radix-ui/themes";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <Flex direction="column" gap="4">
      <Heading mb="4">
        401 | Você não tem autorização para acessar essa página
      </Heading>
    </Flex>
  );
}
