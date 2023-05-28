import { LinkForm } from "./LinkForm";
import { Links } from "./Links";
import { Logs } from "./Logs";
import { Container, Heading, Divider } from "@chakra-ui/react";

export const App = () => {
  return (
    <Container maxW="container.lg">
      <Heading as="h1" size="xl" m={4}>
        URL shortener
      </Heading>
      <LinkForm />
      <Divider my="6" />
      <Links />
      <Divider my="6" />
      <Logs />
    </Container>
  );
};