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
        attachment:
          "Please note your personal Arduino Sketch in the attachment of this mail. If you have registered a senseBox with WiFi-Bee make sure you set your WiFi credentials in the arduino sketch, so your senseBox can connect to the internet. You can find further instructions",
        attachmentLink: "here",
        attachmentSuffix: "in the First steps of our senseBox:home book.",
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
        attachment:
          "Im Anhang befindet sich dein persönlicher Arduino Sketch. Falls du eine senseBox mit WiFi-Bee registriert hast, denke unbedingt daran dein WiFi-Netzwerknamen und das Passwort in den Arduino Sktech einzufügen, damit sich deine senseBox mit dem Internet verbinden kann. Eine Anleitung wie es damit weitergeht, findest du",
        attachmentLink: "hier",
        attachmentSuffix: "in der Dokumentation.",
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

interface NewDeviceEmailProps {
  user: User;
  device: Device;
  language: "de" | "en";
}

const baseUrl = process.env.OSEM_URL
  ? `https://${process.env.OSEM_URL}`
  : "https://opensensemap.org";

export const NewDeviceEmail = ({
  user = { name: "Max Mustermann" },
  device = { _id: "1234567890", name: "senseBox Test Gerät" },
  language = "en",
}: NewDeviceEmailProps) => (
  <Html lang={language} dir="ltr">
    <Head />
    <Preview>{i18next.t("preview", { lng: language })}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>{i18next.t("heading", { lng: language })}</Heading>
        <Text>Hallo {user.name},</Text>
        <Text>
          {i18next.t("description", { deviceName: device.name, lng: language })}
        </Text>
        <Text>
          {i18next.t("deviceId", { lng: language })} <b>{device._id}</b>
        </Text>
        <Text>{i18next.t("opensensemapHint", { lng: language })}</Text>
        <Link
          href={`${baseUrl}/explore/${device._id}`}
          target="_blank"
        >{`${baseUrl}/explore/${device._id}`}</Link>
        <Text>
          {i18next.t("attachment", {
            lng: language,
          })}{" "}
          <Link href="https://docs.sensebox.de/sensebox-home/home-schritt-1/">
            {i18next.t("attachmentLink", { lng: language })}
          </Link>{" "}
          {i18next.t("attachmentSuffix", { lng: language })}
        </Text>
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

export default NewDeviceEmail;

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
