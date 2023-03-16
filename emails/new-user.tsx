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

interface NewUserEmailProps {
  user: User;
  email: string;
  token: string;
}

const baseUrl = process.env.OSEM_URL
  ? `https://${process.env.OSEM_URL}`
  : "https://opensensemap.org";

export const NewUserEmail = ({
  user = { name: "Max Mustermann" },
  email = "max.mustermann@example.com",
  token = "1234-5678-9012",
}: NewUserEmailProps) => (
  <Html lang="de" dir="ltr">
    <Head />
    <Preview>Deine openSenseMap Registrierung</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Deine openSenseMap Registrierung</Heading>
        <Text>Hallo {user.name},</Text>
        <Text>
          danke für deine Registrierung auf der openSenseMap! Du findest dein
          Profil unter{" "}
          <Link
            href={`${baseUrl}/account`}
            target="_blank"
          >{`${baseUrl}/account`}</Link>
          . Hier kannst du neue Geräte anlegen und deine Daten bearbeiten.
        </Text>
        <Text>
          Bitte bestätige außerdem deine E-Mail Adresse. Klicke einfach auf
          diesen{" "}
          <Link
            href={`${baseUrl}/account/confirm-email?email=${email}&token=${token}`}
          >{`${baseUrl}/account/confirm-email?email=${email}&token=${token}`}</Link>
        </Text>
        <Text>
          Wenn sich der Link nicht anklicken lässt, kannst du auch diese Adresse
          kopieren und mit deinem Browser öffnen:
        </Text>
        <code
          style={code}
        >{`${baseUrl}/account/confirm-email?token=${token}&email=${email}`}</code>
        <Text>
          Wenn Du Fragen hast schreib uns eine Mail an: {}
          <Link
            href={`mailto:support@sensebox.de?Subject=Nutzer%20Registrierung%20${email}`}
          >
            support@sensebox.de
          </Link>
        </Text>
        <Text>Dein openSenseMap Team</Text>
      </Container>
    </Body>
  </Html>
);

export default NewUserEmail;

export const subject = "openSenseMap Registrierung";

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
