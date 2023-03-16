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

interface ConfirmEmailAddressProps {
  user: User;
  token: string;
  email: string;
}

const baseUrl = process.env.OSEM_URL
  ? `https://${process.env.OSEM_URL}`
  : "https://opensensemap.org";

export const ConfirmEmailAddress = ({
  user = { name: "Max Mustermann" },
  token = "1234-5678-9010",
  email = "max.mustermann@example.com",
}: ConfirmEmailAddressProps) => (
  <Html lang="de" dir="ltr">
    <Head />
    <Preview>openSenseMap Bestätigung deiner E-Mailadresse</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Bestätigung deiner E-Mailadresse</Heading>
        <Text>Hallo {user.name},</Text>
        <Text>
          Jemand hat eine Änderung deiner E-Mail Adresse angefordert. Dies
          kannst du tun, indem du auf den Link unten klickst.
        </Text>
        <Link
          href={`${baseUrl}/account/confirm-email?token=${token}&email=${email}`}
          target="_blank"
          style={{
            ...link,
            display: "block",
            marginBottom: "16px",
          }}
        >
          E-Mail bestätigen
        </Link>
        <Text style={{ ...text, marginBottom: "14px" }}>
          Wenn sich der Link nicht anklicken lässt, kannst du auch diese Adresse
          kopieren und mit deinem Browser öffnen:
        </Text>
        <code
          style={code}
        >{`${baseUrl}/account/confirm-email?token=${token}&email=${email}`}</code>
        <Text
          style={{
            ...text,
            color: "#ababab",
            marginTop: "14px",
            marginBottom: "16px",
          }}
        >
          Falls du keine Änderung deiner E-Mail Adresse angefordert hast,
          ignoriere diese E-Mail.
        </Text>
        <Text
          style={{
            ...text,
            color: "#ababab",
            marginTop: "12px",
            marginBottom: "38px",
          }}
        >
          Wenn Du Fragen hast schreib uns eine Mail an: {}
          <Link href="mailto:support@sensebox.de?Subject=Email%20Best%C3%A4tigen%20f%C3%BCr%20matthias.pfeil@gmail.com">
            support@sensebox.de
          </Link>
        </Text>
        <Text>Viele Grüße, dein openSenseMap Team</Text>
      </Container>
    </Body>
  </Html>
);

export default ConfirmEmailAddress;

export const subject = "Bestätigung deiner E-Mailadresse";

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
