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
        preview: "Your device on openSenseMap",
        heading: "Your device on openSenseMap",
        hello: "Hello",
        description:
          "Thank you for registering your hackAIR home v2 particulate matter sensor {{deviceName}} on openSenseMap!",
        hint: "🎉 Now, you have to configure your device in order to submit measurements to the openSenseMap. You'll find instructions to do so on",
        thanks: "Thank you very much for contributing!",
        deviceId: "Your senseBox ID is:",
        opensensemapHint: "You can view your device at this location:",
        support:
          "If you have any questions, feel free to write us an email to:",
        salutation: "The openSenseMap team wishes you a lot of fun",
      },
    },
    de: {
      translation: {
        preview: "Dein neues Gerät auf der openSenseMap",
        heading: "Dein neues Gerät auf der openSenseMap",
        hello: "Hallo",
        description:
          "vielen Dank für die Registrierung deines hackAIR home v2 Feinstaubsensors {{deviceName}} auf der openSenseMap!",
        hint: "🎉 Damit deine Daten auch die openSenseMap erreichen, musst du noch deinen Feinstaubsensor konfigurieren. Eine Anleitung findest du unter",
        thanks: "Vielen lieben Dank, dass du dich am Projekt beteiligst.",
        deviceId: "Deine senseBox-ID lautet:",
        opensensemapHint:
          "Du findest deine Station auf der openSenseMap unter dieser Adresse:",
        support: "Wenn Du Fragen hast schreib uns eine Mail an:",
        salutation: "Viel Spaß wünscht dein openSenseMap Team",
      },
    },
  },
});

interface User {
  name: string;
}

interface Device {
  _id: string;
  name: string;
}

interface NewDeviceHackairEmailProps {
  user: User;
  device: Device;
  language: "de" | "en";
}

const baseUrl = process.env.OSEM_URL
  ? `https://${process.env.OSEM_URL}`
  : "https://opensensemap.org";

export const NewDeviceHackairEmail = ({
  user = { name: "Max Mustermann" },
  device = { _id: "1234567890", name: "Hackair Test Gerät" },
  language = "en",
}: NewDeviceHackairEmailProps) => (
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
          {i18next.t("description", { deviceName: device.name, lng: language })}
        </Text>
        <Text>
          {i18next.t("hint", { lng: language })}{" "}
          <Link
            href="https://docs.sensebox.de/opensensemap/opensensemap-hackair/"
            target="_blank"
          >
            https://docs.sensebox.de/opensensemap/opensensemap-hackair/
          </Link>
          .
        </Text>
        <Text>{i18next.t("thanks", { lng: language })}</Text>
        <Text>
          {i18next.t("deviceId", { lng: language })} <b>{device._id}</b>
        </Text>
        <Text>{i18next.t("opensensemapHint", { lng: language })}</Text>
        <Link
          href={`${baseUrl}/explore/${device._id}`}
          target="_blank"
        >{`${baseUrl}/explore/${device._id}`}</Link>
        <Text>
          {i18next.t("support", { lng: language })} {}
          <Link
            href={`mailto:support@sensebox.de?Subject=Hilfe%20bei%20der%20Einrichtung&body=Bitte%20bei%20jeder%20Anfrage%20die%20senseBox-ID%20(${device._id})%20mit%20angeben.%20Danke!`}
          >
            support@sensebox.de
          </Link>
        </Text>
        <Text>{i18next.t("salutation", { lng: language })}</Text>
      </Container>
    </Body>
  </Html>
);

export default NewDeviceHackairEmail;

export const subject = {
  de: "Dein neues Gerät auf der openSenseMap",
  en: "Your device on openSenseMap",
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
