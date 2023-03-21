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
        preview: "E-Mail address confirmation",
        heading: "E-Mail address confirmation",
        hello: "Hi",
        description:
          "Your email address on isn't confirmed yet. You can do this by clicking the link below.",
        link: "Confirm email address",
        hint: "If you are unable to click the link, you can also open this address with your web browser:",
        support:
          "If you have any questions, feel free to write us an email to:",
        salutation: "Best wishes your openSenseMap Team",
      },
    },
    de: {
      translation: {
        preview: "Bestätigung deiner E-Mailadresse",
        heading: "Bestätigung deiner E-Mailadresse",
        hello: "Hallo",
        description:
          "Du hast bisher deine E-Mail Adresse noch nicht bestätigt. Dies kannst du tun, indem du auf den Link unten klickst.",
        link: "E-Mail bestätigen",
        hint: "Wenn sich der Link nicht anklicken lässt, kannst du auch diese Adresse kopieren und mit deinem Browser öffnen:",
        support: "Wenn Du Fragen hast schreib uns eine Mail an:",
        salutation: "Viele Grüße, dein openSenseMap Team",
      },
    },
  },
});

interface User {
  name: string;
}

interface ResendEmailConfirmationProps {
  user: User;
  token: string;
  email: string;
  language: "de" | "en";
}

const baseUrl = process.env.OSEM_URL
  ? `https://${process.env.OSEM_URL}`
  : "https://opensensemap.org";

export const ResendEmailConfirmationEmail = ({
  user = { name: "Max Mustermann" },
  token = "1234-5678-9010",
  email = "max.mustermann@example.com",
  language = "en",
}: ResendEmailConfirmationProps) => (
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
        <Link
          href={`${baseUrl}/account/confirm-email?token=${token}&email=${email}`}
          target="_blank"
          style={{
            ...link,
            display: "block",
            marginBottom: "16px",
          }}
        >
          {i18next.t("link", { lng: language })}
        </Link>
        <Text style={{ ...text, marginBottom: "14px" }}>
          {i18next.t("hint", { lng: language })}
        </Text>
        <code
          style={code}
        >{`${baseUrl}/account/confirm-email?token=${token}&email=${email}`}</code>
        <Text
          style={{
            ...text,
            color: "#ababab",
            marginTop: "12px",
            marginBottom: "38px",
          }}
        >
          {i18next.t("support", { lng: language })} {}
          <Link href="mailto:support@sensebox.de?Subject=Email%20Best%C3%A4tigen%20f%C3%BCr%20matthias.pfeil@gmail.com">
            support@sensebox.de
          </Link>
        </Text>
        <Text>{i18next.t("salutation", { lng: language })}</Text>
      </Container>
    </Body>
  </Html>
);

export default ResendEmailConfirmationEmail;

export const subject = {
  de: "Bestätigung deiner E-Mailadresse",
  en: "E-Mail address confirmation",
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
