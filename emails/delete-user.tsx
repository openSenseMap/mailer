import { Html } from "@react-email/html";
import { Body } from "@react-email/body";
import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
import { Heading } from "@react-email/heading";
import { Link } from "@react-email/link";
import { Preview } from "@react-email/preview";
import { Text } from "@react-email/text";
import * as React from "react";

interface User {
  name: string;
}

interface DeleteUserEmailProps {
  user: User;
}

const baseUrl = process.env.OSEM_URL
  ? `https://${process.env.OSEM_URL}`
  : "https://opensensemap.org";

export const DeleteUserEmail = ({
  user = { name: "Max Mustermann" },
}: DeleteUserEmailProps) => (
  <Html lang="de" dir="ltr">
    <Head />
    <Preview>Dein openSenseMap Account wurde gelöscht</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>openSenseMap Account wurde gelöschen</Heading>
        <Text>Hallo {user.name},</Text>
        <Text>
          Dein Account und alle deine senseBoxen wurden gerade gelöscht. Schade,
          dass du dich gelöscht hast!
        </Text>
        <Text>
          Dieser Vorgang ist endgültig. Wenn du gerne wieder teilnehmen
          möchtest, kannst du dich einfach auf{" "}
          <Link href={baseUrl} target="_blank">
            opensensemap.org
          </Link>{" "}
          neu registrieren.
        </Text>
        <Text>
          Wenn Du Fragen hast schreib uns eine Mail an: {}
          <Link href="mailto:support@sensebox.de">support@sensebox.de</Link>
        </Text>
        <Text>Tschüss, dein openSenseMap Team</Text>
      </Container>
    </Body>
  </Html>
);

export default DeleteUserEmail;

export const subject = "Account wurde gelöscht";

const main = {
  backgroundColor: "#ffffff",
};

const container = {
  paddingLeft: "12px",
  paddingRight: "12px",
  margin: "0 auto",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
};

const link = {
  color: "#2754C5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const code = {
  display: "inline-block",
  padding: "16px 4.5%",
  width: "90.5%",
  backgroundColor: "#f4f4f4",
  borderRadius: "5px",
  border: "1px solid #eee",
  color: "#333",
};
