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
  email: string;
}

interface PasswordResetProps {
  user: User;
  email: string;
  token: string;
}

const baseUrl = process.env.OSEM_URL
  ? `https://${process.env.OSEM_URL}`
  : "https://opensensemap.org";

export const PasswordResetEmail = ({
  user = { name: "Max Mustermann", email: "max.mustermann@example.com" },
  email = "max.mustermann@example.com",
  token = "1234-5678-9012",
}: PasswordResetProps) => (
  <Html lang="de" dir="ltr">
    <Head />
    <Preview>Zurücksetzen deines Passworts</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Zurücksetzen deines Passworts</Heading>
        <Text>Hallo {user.name},</Text>
        <Text>
          Jemand hat ein Zurücksetzen deines Passworts angefordert. Du kannst
          dein Passwort zurücksetzen, indem du auf den Link unten klickst.
        </Text>
        <Link href={`${baseUrl}/account/password-reset?token=${token}`}>
          Passwort zurücksetzen
        </Link>
        <Text>
          Wenn sich der Link nicht anklicken lässt, kannst du auch diese Adresse
          kopieren und mit deinem Browser öffnen:
        </Text>
        <code
          style={code}
        >{`${baseUrl}/account/password-reset?token=${token}`}</code>
        <Text
          style={{
            ...text,
            color: "#ababab",
            marginTop: "14px",
            marginBottom: "16px",
          }}
        >
          Dieser Link ist insgesamt 12 Stunden gültig.
        </Text>
        <Text>
          Falls du kein neues Passwort angefordert hast, ignoriere diese E-Mail.
        </Text>
        <Text>
          Dein Passwort wird sich nicht änden bevor du auf den Link geklickt
          hast und dort ein neues vergeben hast.
        </Text>
        <Text>
          Wenn Du Fragen hast schreib uns eine Mail an: {}
          <Link
            href={`mailto:support@sensebox.de?Subject=Password%20Zur%C3%BCcksetzen%20f%C3%BCr%20${user.email}`}
          >
            support@sensebox.de
          </Link>
        </Text>
        <Text>Viele Grüße, dein openSenseMap Team</Text>
      </Container>
    </Body>
  </Html>
);

export default PasswordResetEmail;

export const subject = "Passwort zurücksetzen";

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
