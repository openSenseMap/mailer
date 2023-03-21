import { Html } from "@react-email/html";
import { Body } from "@react-email/body";
import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
import { Heading } from "@react-email/heading";
import { Link } from "@react-email/link";
import { Preview } from "@react-email/preview";
import { Text } from "@react-email/text";
import * as React from "react";

import i18next from "i18next";

i18next.init({
  debug: false,
  resources: {
    en: {
      translation: {
        preview: "Your openSenseMap registration",
        heading: "Your openSenseMap registration",
        hello: "Hi",
        description:
          "thank you for registering yourself on the openSenseMap platform. You'll find your profile at",
        descriptionSuffix:
          "There, you can create new senseBoxes and change data and credentials.",
        confirm: "Please confirm your email address. Just click on this",
        hint: "If you are unable to click the link, you can also open this address with your web browser:",
        support:
          "If you have questions or suggestions please do not answer on this email directly, but feel free to send a mail to:",
        salutation: "Best wishes your openSenseMap Team",
      },
    },
    de: {
      translation: {
        preview: "Deine openSenseMap Registrierung",
        heading: "Deine openSenseMap Registrierung",
        hello: "Hallo",
        description:
          "danke für deine Registrierung auf der openSenseMap! Du findest dein Profil unter",
        descriptionSuffix:
          ". Hier kannst du neue Geräte anlegen und deine Daten bearbeiten.",
        confirm:
          "Bitte bestätige außerdem deine E-Mail Adresse. Klicke einfach auf diesen",
        hint: "Wenn sich der Link nicht anklicken lässt, kannst du auch diese Adresse kopieren und mit deinem Browser öffnen:",
        support:
          "Bitte antworte nicht direkt auf diese Mail. Falls du Fragen oder Anmerkungen hast schreibe uns gerne eine Nachricht an",
        salutation: "Dein openSenseMap Team",
      },
    },
  },
});

interface User {
  name: string;
}

interface NewUserEmailProps {
  user: User;
  email: string;
  token: string;
  language: "de" | "en";
}

const baseUrl = process.env.OSEM_URL
  ? `https://${process.env.OSEM_URL}`
  : "https://opensensemap.org";

export const NewUserEmail = ({
  user = { name: "Max Mustermann" },
  email = "max.mustermann@example.com",
  token = "1234-5678-9012",
  language = "en",
}: NewUserEmailProps) => (
  <Html lang={language} dir="ltr">
    <Head />
    <Preview>{i18next.t("preview", { lng: language })}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>{i18next.t("heading", { lng: language })}</Heading>
        <Text>
          {i18next.t("hello", { lng: language })} {user.name},
        </Text>
        <Text>
          {i18next.t("description", { lng: language })}{" "}
          <Link
            href={`${baseUrl}/account`}
            target="_blank"
          >{`${baseUrl}/account`}</Link>
          {i18next.t("descriptionSuffix", { lng: language })}
        </Text>
        <Text>
          {i18next.t("confirm", { lng: language })}{" "}
          <Link
            href={`${baseUrl}/account/confirm-email?email=${email}&token=${token}`}
          >
            Link
          </Link>
        </Text>
        <Text>{i18next.t("hint", { lng: language })}</Text>
        <code
          style={code}
        >{`${baseUrl}/account/confirm-email?token=${token}&email=${email}`}</code>
        <Text>
          {i18next.t("support", { lng: language })} {}
          <Link
            href={`mailto:support@sensebox.de?Subject=Nutzer%20Registrierung%20${email}`}
          >
            support@sensebox.de
          </Link>
        </Text>
        <Text>{i18next.t("salutation", { lng: language })}</Text>
      </Container>
    </Body>
  </Html>
);

export default NewUserEmail;

export const subject = {
  de: "Deine openSenseMap Registrierung",
  en: "Your openSenseMap registration",
};

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
