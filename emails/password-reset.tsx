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
        preview: "Your password reset",
        heading: "Your password reset",
        hello: "Hi",
        description:
          "Someone has requested a link to change your password. You can do this by clicking the link below.",
        link: "Reset password",
        hint: "If you are unable to click the link, you can also open this address with your web browser:",
        valid: "This link is valid for 12 hours.",
        ignore: "If you didn't request this, please ignore this email.",
        warn: "Your password won't change until you access the link above and create a new one.",
        support:
          "If you have any questions, feel free to write us an email to:",
        salutation: "Best wishes your openSenseMap Team",
      },
    },
    de: {
      translation: {
        preview: "Zurücksetzen deines Passworts",
        heading: "Zurücksetzen deines Passworts",
        hello: "Hallo",
        description:
          "Jemand hat ein Zurücksetzen deines Passworts angefordert. Du kannst dein Passwort zurücksetzen, indem du auf den Link unten klickst.",
        link: "Passwort zurücksetzen",
        hint: "Wenn sich der Link nicht anklicken lässt, kannst du auch diese Adresse kopieren und mit deinem Browser öffnen:",
        valid: "Dieser Link ist insgesamt 12 Stunden gültig.",
        ignore:
          "Falls du kein neues Passwort angefordert hast, ignoriere diese E-Mail.",
        warn: "Dein Passwort wird sich nicht änden bevor du auf den Link geklickt hast und dort ein neues vergeben hast.",
        support: "Wenn Du Fragen hast schreib uns eine Mail an:",
        salutation: "Viele Grüße, dein openSenseMap Team",
      },
    },
  },
});

interface User {
  name: string;
  email: string;
}

interface PasswordResetProps {
  user: User;
  email: string;
  token: string;
  language: "de" | "en";
}

const baseUrl = process.env.OSEM_URL
  ? `https://${process.env.OSEM_URL}`
  : "https://opensensemap.org";

export const PasswordResetEmail = ({
  user = { name: "Max Mustermann", email: "max.mustermann@example.com" },
  email = "max.mustermann@example.com",
  token = "1234-5678-9012",
  language = "en",
}: PasswordResetProps) => (
  <Html lang={language} dir="ltr">
    <Head />
    <Preview>{i18next.t("preview", { lng: language })}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>{i18next.t("heading", { lng: language })}</Heading>
        <Text>
          {i18next.t("hello", { lng: language })} {user.name},
        </Text>
        <Text>{i18next.t("description", { lng: language })}</Text>
        <Link href={`${baseUrl}/account/password-reset?token=${token}`}>
          {i18next.t("link", { lng: language })}
        </Link>
        <Text>{i18next.t("hint", { lng: language })}</Text>
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
          {i18next.t("valid", { lng: language })}
        </Text>
        <Text>{i18next.t("ignore", { lng: language })}</Text>
        <Text>{i18next.t("warn", { lng: language })}</Text>
        <Text>
          {i18next.t("support", { lng: language })} {}
          <Link
            href={`mailto:support@sensebox.de?Subject=Password%20Zur%C3%BCcksetzen%20f%C3%BCr%20${user.email}`}
          >
            support@sensebox.de
          </Link>
        </Text>
        <Text>{i18next.t("salutation", { lng: language })}</Text>
      </Container>
    </Body>
  </Html>
);

export default PasswordResetEmail;

export const subject = {
  de: "Zurücksetzen deines Passworts",
  en: "Your password reset",
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
